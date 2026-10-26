/* ============================================================
 * 个人成果数据 — 内容与视图分离
 * ------------------------------------------------------------
 * 新增 / 修改 / 删除成果，只需改这个文件，不需要动 HTML/CSS。
 *
 * 字段说明：
 *   id           唯一标识（用于详情页链接 work.html?id=<id>）
 *   title        成果标题
 *   category     分类：research | project | design | photo
 *   year         年份，如 "2026"
 *   summary      列表页一句话描述
 *   description  详情页长描述（用 \n 分段）
 *   process      创作 / 研究过程（字符串数组，按时间顺序）
 *   links        外部链接数组：[{ label, url, type }]
 *                type 取值：paper | github | demo | site
 *   coverColor   CSS 渐变，作为无真实图片时的占位封面
 *   coverText    占位封面上显示的文字（一般是编号）
 *   coverImage   真实图片路径（如 "assets/img/form-01.jpg"），
 *                填写后优先于 coverColor
 *   featured     是否显示在首页精选（true / false）
 * ============================================================ */

const PROFILE = {
  name: "YOUR NAME",
  role: "创作者 / 研究者 / 工程师",
  taglineTop: "让每一份",
  taglineEm: "成果被看见。",
  intro: "你好，我是 YOUR NAME。这里记录我的科研论文、项目实践、设计创作与摄影观察。欢迎浏览，也欢迎交流。",
  aboutParagraphs: [
    "这是一份个人成果展示网站的示范内容。请把这里替换成你的专业背景、兴趣领域、创作理念与真实经历。",
    "这个网站把作品内容与页面展示分离——所有成果数据都集中在此文件中，新增或修改成果时无需调整页面结构。",
    "好的成果展示不只是最终结果，更包括提出问题、探索过程和背后的思考。这里将持续归档有价值的项目与创作。"
  ],
  email: "hello@example.com",
  location: "城市 · 国家",
  github: "",
  footerNote: "Built for GitHub Pages"
};

const CATEGORIES = [
  { id: "all",      label: "全部" },
  { id: "research", label: "科研论文" },
  { id: "project",  label: "项目成果" },
  { id: "design",   label: "设计作品" },
  { id: "photo",    label: "摄影与其他创作" }
];

const WORKS = [
  {
    id: "form-and-nature",
    title: "形态与自然",
    category: "design",
    year: "2026",
    summary: "从自然生长形态获得灵感，探索秩序与自由之间的视觉平衡。",
    description: "这是一段示范描述。请替换为项目的真实背景、动机与目标。\n\n第二段可以展开介绍方法、工具与关键技术路径。",
    process: [
      "收集自然形态的图像与素描，建立视觉参考板",
      "提炼基本几何特征与生长规律",
      "在网格系统中尝试变形与组合",
      "完成视觉呈现并归档输出"
    ],
    links: [
      { label: "项目主页", url: "https://example.com", type: "site" }
    ],
    coverColor: "linear-gradient(145deg,#aab5a3,#4b7260)",
    coverText: "01",
    coverImage: "",
    featured: true
  },
  {
    id: "literature-visualization",
    title: "文献可视化方法研究",
    category: "research",
    year: "2025",
    summary: "面向学术文献结构的可视化方法研究与原型实现。",
    description: "这是一段示范描述。请替换为论文的研究问题、方法、实验与结论。\n\n可以分多段展开。",
    process: [
      "梳理相关领域的已有方法",
      "提出新的可视化模型",
      "实现原型系统",
      "通过用户实验验证效果",
      "撰写论文并投稿"
    ],
    links: [
      { label: "论文链接", url: "https://example.com/paper", type: "paper" },
      { label: "代码仓库", url: "https://github.com/", type: "github" }
    ],
    coverColor: "linear-gradient(155deg,#556879,#c4c9ca)",
    coverText: "02",
    coverImage: "",
    featured: true
  },
  {
    id: "light-diary",
    title: "光的日记",
    category: "photo",
    year: "2026",
    summary: "以柔和光线与安静构图，捕捉日常里的细微瞬间。",
    description: "这是一段示范描述。请替换为这组照片的创作背景、拍摄思路与想说的话。",
    process: [
      "确定主题与拍摄范围",
      "日常持续拍摄并筛选",
      "后期统一色调",
      "整理输出并归档"
    ],
    links: [],
    coverColor: "linear-gradient(125deg,#b9c6bd,#ead5ac)",
    coverText: "03",
    coverImage: "",
    featured: true
  },
  {
    id: "archive-system",
    title: "个人成果档案系统",
    category: "project",
    year: "2026",
    summary: "一个把内容与展示分离的静态个人成果网站方案。",
    description: "这是一段示范描述。请替换为该项目的动机、技术选型、实现要点与最终效果。",
    process: [
      "梳理需求：内容管理与视觉展示分离",
      "设计数据结构（本文件的格式）",
      "实现静态渲染与详情页",
      "部署到 GitHub Pages"
    ],
    links: [
      { label: "在线演示", url: "https://example.com", type: "demo" },
      { label: "代码仓库", url: "https://github.com/", type: "github" }
    ],
    coverColor: "linear-gradient(135deg,#4b7260,#2b3d33)",
    coverText: "04",
    coverImage: "",
    featured: true
  },
  {
    id: "city-texture",
    title: "城市的肌理",
    category: "photo",
    year: "2025",
    summary: "记录城市表面、空间秩序与时间留下的视觉痕迹。",
    description: "这是一段示范描述。请替换为这组照片的创作背景、拍摄思路与想说的话。",
    process: [
      "确定拍摄路线与区域",
      "分时段拍摄：清晨、正午、夜晚",
      "筛选并后期",
      "整理输出"
    ],
    links: [],
    coverColor: "linear-gradient(155deg,#c9a9a0,#74463f)",
    coverText: "05",
    coverImage: "",
    featured: false
  },
  {
    id: "paper-experiments",
    title: "纸上实验",
    category: "design",
    year: "2025",
    summary: "通过图形、色彩和层次进行轻量化的视觉语言探索。",
    description: "这是一段示范描述。请替换为该系列的设计动机、实验方法与总结。",
    process: [
      "收集视觉参考",
      "尝试不同图形与色彩组合",
      "筛选并系统化",
      "输出系列作品"
    ],
    links: [],
    coverColor: "linear-gradient(155deg,#dbb981,#9c693d)",
    coverText: "06",
    coverImage: "",
    featured: false
  },
  {
    id: "pkm-tool",
    title: "轻量级个人知识管理工具",
    category: "research",
    year: "2024",
    summary: "面向个人使用场景的本地优先知识管理工具原型。",
    description: "这是一段示范描述。请替换为该研究的动机、方法、实验与结论。",
    process: [
      "调研现有工具的痛点",
      "设计本地优先的数据模型",
      "实现核心功能原型",
      "通过使用日志评估效果"
    ],
    links: [
      { label: "论文链接", url: "https://example.com/paper", type: "paper" }
    ],
    coverColor: "linear-gradient(145deg,#7a8ba0,#3b4657)",
    coverText: "07",
    coverImage: "",
    featured: false
  },
  {
    id: "city-cycling",
    title: "城市骑行路径分析",
    category: "project",
    year: "2024",
    summary: "基于公开数据的城市骑行路径可视化与可达性分析。",
    description: "这是一段示范描述。请替换为该项目的动机、数据来源、分析方法与结论。",
    process: [
      "收集公开骑行数据",
      "清洗并预处理",
      "实现可视化分析",
      "输出报告与交互页面"
    ],
    links: [
      { label: "在线演示", url: "https://example.com", type: "demo" },
      { label: "代码仓库", url: "https://github.com/", type: "github" }
    ],
    coverColor: "linear-gradient(145deg,#c2c1b7,#656c60)",
    coverText: "08",
    coverImage: "",
    featured: false
  }
];
