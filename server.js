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
function normalizeImageCandidate(url) {
  if (!url) return '';
  return url
    .replace(/\\u002f/g, '/')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/^"+|"+$/g, '');
}
function isAllowedImageUrl(url) {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    const blockedHosts = ['vjshi.com', '699pic.com', '58pic.com', 'nipic.com', 'duitang.com'];
    if (blockedHosts.some(host => parsed.hostname.includes(host))) return false;
    if (/watermark|logo|avatar|icon|sprite/i.test(parsed.pathname + parsed.search)) return false;
    return true;
  } catch {
    return false;
  }
}
function scoreImageUrl(url, query) {
  let score = 0;
  const value = `${url} ${query}`.toLowerCase();
  if (/unsplash|pexels|pixabay|tripadvisor|booking|qyer|mafengwo|ctrip|amap|meituan|bcebos|alicdn|douyinpic/.test(value)) score += 4;
  if (/city|travel|landmark|scenic|aerial|skyline|风景|地标|城市/.test(value)) score += 3;
  if (/food|dish|restaurant|cafe|美食|咖啡/.test(value)) score += 2;
  return score;
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
// 2. 图片搜索 API / Image Search API (Crawler for CityWalk)
// ============================================================

app.get('/api/image-search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: '缺少查询参数 q' });

    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(q)}&form=HDRSC2&first=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      }
    });
    const html = await response.text();
    let urls = [];
    
    // Bing images uses murl attribute to store high-res link
    const regex1 = /"murl"\s*:\s*"([^"]+)"/g;
    let match;
    while ((match = regex1.exec(html)) !== null) urls.push(match[1]);
    
    if (urls.length === 0) {
      const regex2 = /murl&quot;:&quot;([^&]+)&quot;/g;
      while ((match = regex2.exec(html)) !== null) urls.push(match[1]);
    }

    urls = [...new Set(urls.map(normalizeImageCandidate).filter(isAllowedImageUrl))]
      .sort((a, b) => scoreImageUrl(b, q) - scoreImageUrl(a, q));

    res.json({ success: true, urls: urls.slice(0, 5) });
  } catch (err) {
    console.error('[Image Search Error]', err.message);
    res.status(500).json({ error: '图片搜索失败', detail: err.message });
  }
});

app.get('/api/image-proxy', async (req, res) => {
  try {
    const { url } = req.query;
    const target = normalizeImageCandidate(url);
    if (!target) return res.status(400).json({ error: '缺少 url 参数' });
    if (!isAllowedImageUrl(target)) return res.status(400).json({ error: '图片地址不受支持' });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const response = await fetch(target, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': 'https://www.bing.com/'
      }
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({ error: '远程图片获取失败', detail: `HTTP ${response.status}` });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return res.status(415).json({ error: '远程资源不是图片', detail: contentType });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.send(buffer);
  } catch (err) {
    console.error('[Image Proxy Error]', err.message);
    res.status(500).json({ error: '图片代理失败', detail: err.message });
  }
});

// ============================================================
// 3. LLM 路线生成 / Route Generation (Gemini + Deepseek fallback)
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
// 4. 3D漫游概念页路由 / 3D Roam Concept Route
// 修改基线 / Base: server.js 路由部分
// 修改内容 / Changes: 添加 /roam3d 路由指向 roam3d.html
// Added /roam3d route alias for 3D roaming concept page
// ============================================================

app.get('/roam3d', (req, res) => {
  res.sendFile(path.join(__dirname, 'roam3d.html'));
});

// 修改基线 / Base: server.js 启动部分
// 修改内容 / Changes: 条件启动 + 导出 app 用于 Vercel Serverless
// Conditional listen + export app for Vercel Serverless deployment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚶 CityWalk 后端服务已启动`);
    console.log(`   地址: http://localhost:${PORT}`);
    console.log(`   3D漫游: http://localhost:${PORT}/roam3d`);
    console.log(`   天气: GET  /api/weather?city=上海`);
    console.log(`   路线: POST /api/routes/generate {city: "上海"}`);
    console.log(`   小红书: GET /api/xhs/search?keyword=上海citywalk`);
    console.log(`   Gemini:   ${GEMINI_API_KEY ? '✓' : '✗'}`);
    console.log(`   Deepseek: ${DEEPSEEK_API_KEY ? '✓' : '✗'}`);
    console.log(`   小红书 MCP: ${XHS_MCP_URL}\n`);
  });
}

// Vercel Serverless: 导出 Express app
module.exports = app;
