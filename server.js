/**
 * CityWalk 后端代理服务器
 * 修改基线 / Base: server.js 初始版本
 * 修改内容 / Changes:
 *   1. 天气改用 wttr.in 免费 API (AMap key 仅支持 JS API 平台, Web Service REST 调用返回 USERKEY_PLAT_NOMATCH)
 *   2. 路线生成改为纯 LLM 方案 (Gemini 主力, Deepseek 备用), 不依赖 AMap REST API 预获取 POI
 *   3. 小红书搜索代理保持不变
 *
 * Weather changed to wttr.in free API (AMap key only supports JS API platform).
 * Route generation now pure LLM without AMap REST POI pre-fetch.
 *
 * API 端点:
 *   GET  /api/weather?city=城市名          → wttr.in 天气 API
 *   POST /api/routes/generate {city}       → Gemini/Deepseek LLM 生成路线
 *   GET  /api/xhs/search?keyword=          → 小红书搜索转发
 *   POST /api/xhs/detail                   → 小红书笔记详情转发
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3100;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const XHS_MCP_URL = process.env.XHS_MCP_URL || 'http://localhost:18060';

// ============================================================
// 工具函数 / Utility Functions
// ============================================================

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

// ============================================================
// 1. 天气 API / Weather API (wttr.in 免费服务)
// ============================================================

app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ error: '缺少 city 参数' });

    // 使用 wttr.in 免费天气 API (无需 API Key)
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=zh`;
    const rawData = await fetchJSON(url);

    // wttr.in wraps response in {data: {...}}
    const data = rawData.data || rawData;
    const current = data.current_condition?.[0] || {};
    const forecasts = (data.weather || []).slice(0, 3);

    // 将 wttr.in 天气描述映射到中文
    const weatherDesc = current.lang_zh?.[0]?.value || current.weatherDesc?.[0]?.value || '未知';

    res.json({
      success: true,
      data: {
        city: city,
        weather: weatherDesc,
        temperature: current.temp_C || '--',
        humidity: current.humidity || '--',
        winddirection: current.winddir16Point || '',
        windpower: current.windspeedKmph ? Math.round(parseInt(current.windspeedKmph)/6) : '', // 粗略转风力等级
        reporttime: new Date().toISOString(),
        feelslike: current.FeelsLikeC || '--',
        uv: current.uvIndex || '',
        visibility: current.visibility || '',
        forecasts: forecasts.map(f => ({
          date: f.date,
          week: '',
          dayweather: f.hourly?.[4]?.lang_zh?.[0]?.value || f.hourly?.[4]?.weatherDesc?.[0]?.value || '',
          nightweather: f.hourly?.[20]?.lang_zh?.[0]?.value || f.hourly?.[20]?.weatherDesc?.[0]?.value || '',
          daytemp: f.maxtempC,
          nighttemp: f.mintempC,
        }))
      }
    });
  } catch (err) {
    console.error('[Weather API Error]', err.message);
    res.status(500).json({ error: '天气查询失败', detail: err.message });
  }
});

// ============================================================
// 2. LLM 路线生成 / Route Generation (Gemini + Deepseek fallback)
//    纯 LLM 方案，不依赖 AMap REST API
// ============================================================

const ROUTE_SYSTEM_PROMPT = `你是一个专业的城市漫步路线规划师。根据我提供的城市名，请规划 2-3 条主题明确的 CityWalk 路线。

输出严格遵循以下 JSON 格式，不要输出其他文字：
{
  "slogan": "城市一句话描述",
  "routes": [
    {
      "id": "唯一ID如 sh1",
      "name": "路线名称",
      "desc": "50字以内的路线描述",
      "difficulty": "easy|medium|hard",
      "season": "适合季节",
      "duration": "预计耗时如 3-4h",
      "distance": "预计距离如 5.2km",
      "points": [
        {
          "name": "景点名",
          "type": "类型如 历史建筑",
          "desc": "30字以内描述",
          "lat": 纬度数字,
          "lng": 经度数字,
          "color": "十六进制颜色"
        }
      ]
    }
  ]
}

要求：
1. 每条路线包含 5-7 个真实存在的打卡点
2. 打卡点之间的步行距离合理（相邻点不超过2km）
3. 路线要有明确主题（如美食、文艺、历史、网红打卡等）
4. 必须使用真实的经纬度坐标（精确到小数点后4位）
5. 颜色使用色板：#ff6b35, #e84393, #a29bfe, #00b894, #fdcb6e, #74b9ff, #fd79a8
6. 优先选择该城市最有代表性、最受欢迎的地标和隐藏宝藏`;

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: ROUTE_SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json',
    }
  };

  const data = await fetchJSON(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini 未返回有效内容');
  return JSON.parse(text);
}

async function callDeepseek(prompt) {
  const url = 'https://api.deepseek.com/chat/completions';
  const body = {
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: ROUTE_SYSTEM_PROMPT },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  };

  const data = await fetchJSON(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Deepseek 未返回有效内容');
  return JSON.parse(text);
}

app.post('/api/routes/generate', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) return res.status(400).json({ error: '缺少 city 参数' });

    console.log(`[Route Generate] 正在为「${city}」生成路线...`);

    const userPrompt = `请为中国城市「${city}」规划 CityWalk 路线。

要求：
- 选择该城市最有代表性的真实景点/街区/美食/文化地标
- 路线中的每个打卡点都必须是真实存在的地点，使用准确的经纬度
- 生成 2-3 条主题各异的步行路线（如历史人文、美食探店、网红打卡等）
- 每条路线 5-7 个打卡点`;

    // 调用 LLM (Gemini primary, Deepseek fallback)
    let routeData;
    try {
      console.log('[Route Generate] 调用 Gemini API...');
      routeData = await callGemini(userPrompt);
    } catch (geminiErr) {
      console.warn('[Route Generate] Gemini 失败，切换 Deepseek:', geminiErr.message);
      try {
        routeData = await callDeepseek(userPrompt);
      } catch (dsErr) {
        throw new Error(`Gemini: ${geminiErr.message}; Deepseek: ${dsErr.message}`);
      }
    }

    // 给路线 ID 加前缀避免冲突
    if (routeData.routes) {
      routeData.routes.forEach((r, i) => {
        if (!r.id) r.id = `gen_${city}_${i}`;
      });
    }

    console.log(`[Route Generate] 成功生成 ${routeData.routes?.length || 0} 条路线`);
    res.json({ success: true, data: routeData });
  } catch (err) {
    console.error('[Route Generate Error]', err.message);
    res.status(500).json({ error: '路线生成失败', detail: err.message });
  }
});

// ============================================================
// 3. 小红书搜索代理 / Xiaohongshu Search Proxy
// ============================================================

app.get('/api/xhs/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ error: '缺少 keyword 参数' });

    const url = `${XHS_MCP_URL}/api/v1/feeds/search?keyword=${encodeURIComponent(keyword)}`;
    const data = await fetchJSON(url);
    res.json(data);
  } catch (err) {
    console.error('[XHS Search Error]', err.message);
    res.json({ success: false, data: [], message: '小红书服务未连接: ' + err.message });
  }
});

app.post('/api/xhs/detail', async (req, res) => {
  try {
    const { feed_id, xsec_token } = req.body;
    if (!feed_id) return res.status(400).json({ error: '缺少 feed_id' });

    const url = `${XHS_MCP_URL}/api/v1/feeds/detail`;
    const data = await fetchJSON(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feed_id, xsec_token, load_all_comments: false }),
    });
    res.json(data);
  } catch (err) {
    console.error('[XHS Detail Error]', err.message);
    res.json({ success: false, data: null, message: '小红书服务未连接: ' + err.message });
  }
});

// ============================================================
// 4. 启动服务 / Start Server
// ============================================================

app.listen(PORT, () => {
  console.log(`\n🚶 CityWalk 后端服务已启动`);
  console.log(`   地址: http://localhost:${PORT}`);
  console.log(`   天气: GET  /api/weather?city=上海`);
  console.log(`   路线: POST /api/routes/generate {city: "上海"}`);
  console.log(`   小红书: GET /api/xhs/search?keyword=上海citywalk`);
  console.log(`   Gemini:   ${GEMINI_API_KEY ? '✓' : '✗'}`);
  console.log(`   Deepseek: ${DEEPSEEK_API_KEY ? '✓' : '✗'}`);
  console.log(`   小红书 MCP: ${XHS_MCP_URL}\n`);
});
