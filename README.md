# CityWalk Game 🏙️

一款基于高德地图 API 的城市漫游攻略游戏，融合了游戏化打卡、3D 城市探索和智能路线推荐。

**[在线体验 Demo →](https://2667741708.github.io/citywalk/)**

---

## 功能特色

### 🗺️ 城市攻略系统
- 覆盖上海、北京、成都、杭州、长沙、广州等城市
- 每座城市包含多条精选 CityWalk 路线
- 每条路线包含 5-8 个打卡点，涵盖景点、美食、文艺小店
- 攻略卡片展示预计时间、距离、难度等级、推荐季节

### 🎮 像素漫游模式
- 等轴测 2.5D 像素城市，基于高德 POI 数据实时生成
- 像素小人在城市中自由行走
- 虚拟摇杆 + 键盘双操控
- 碰撞检测、小地图、POI 互动

### ✨ 全景漫游模式
- 透视 3D 渲染引擎
- 丝绸/陶瓷质感建筑材质
- 攻略路线金色引导路径
- 沿路线分布的可收集奖励（星辰碎片、蓝宝石、水晶球等）
- 积分系统 + HUD 实时显示

### 🏆 游戏化元素
- 打卡收集系统，每个景点可打卡获取徽章
- 路线完成进度条
- 随机挑战任务（拍照、品尝美食等）
- 成就系统
- 6 种可收集奖励道具

### 🌍 版图点亮
- 探索过的城市在中国地图上点亮
- 可视化你的旅行足迹

### 🗂️ 动态城市发现
- 支持搜索任意城市
- 基于高德 API 动态生成城市数据
- 自动发现附近城市推荐

## 技术栈

- **前端**: 纯 HTML/CSS/JavaScript，单文件架构
- **地图**: 高德地图 JS API v2.0
- **渲染**: Canvas 2D（等轴测 + 透视 3D）
- **部署**: GitHub Pages（静态托管）

## 快速开始

### 在线访问

Fork 本仓库后开启 GitHub Pages，即可通过 `https://你的用户名.github.io/citywalk/` 访问。

### 本地运行

```bash
git clone https://github.com/2667741708/citywalk.git
cd citywalk
# 任意 HTTP 服务器均可，例如：
python3 -m http.server 8080
# 访问 http://localhost:8080
```

### 配置高德 API Key

项目内置了一个 Demo Key，如需替换为自己的 Key：

1. 前往 [高德开放平台](https://lbs.amap.com/) 注册并申请 Web 端 JS API Key
2. 在 `index.html` 中搜索 `key=` 并替换为你的 Key

## 项目结构

```
citywalk/
├── index.html                 # 主应用（单文件，包含全部 HTML/CSS/JS）
├── README.md                  # 项目说明
├── LICENSE                    # MIT 开源协议
├── .gitignore                 # Git 忽略规则
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Pages 自动部署
```

## 游戏模式说明

| 模式 | 描述 | 操作方式 |
|------|------|----------|
| 📋 攻略路线 | 浏览城市 CityWalk 攻略卡片 | 点击卡片查看详情 |
| 🗺️ 高德地图 | 在真实地图上查看路线和 POI | 拖拽/缩放地图 |
| 🎮 像素漫游 | 在像素城市中操控角色探索 | 摇杆/WASD/方向键 |
| ✨ 全景漫游 | 在 3D 陶瓷质感城市中漫游收集奖励 | 摇杆/WASD/方向键 |
| 🌍 版图点亮 | 在中国地图上点亮探索过的城市 | 点击城市标记 |

## 截图

> 截图位置预留，运行后可自行截取添加到 `screenshots/` 目录

## 贡献

欢迎提交 Issue 和 Pull Request。

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 开源协议

本项目采用 [MIT License](LICENSE) 开源。

## 致谢

- [高德开放平台](https://lbs.amap.com/) — 地图与 POI 数据支持
- [Google Fonts](https://fonts.google.com/) — 字体资源
