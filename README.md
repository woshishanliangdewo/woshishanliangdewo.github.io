# 个人成果展示网站 — GitHub Pages 模板

一个纯静态、零依赖的中文个人成果展示网站。所有作品数据集中在 `assets/data.js`，新增成果**不需要修改任何 HTML/CSS**。

> 当前 8 个作品均为演示占位内容（封面用 CSS 渐变生成），不代表真实履历。请把它们替换成你的真实成果。

## 页面结构

| 文件 | 用途 |
| ---- | ---- |
| `index.html` | 首页：Hero、精选成果、分类入口、CTA |
| `works.html` | 全部成果：按分类筛选（科研/项目/设计/摄影） |
| `work.html?id=<id>` | 成果详情：大图、介绍、过程、外部链接 |
| `about.html` | 关于我：简介、联系方式 |
| `assets/data.js` | **所有内容数据**，Kimi 主要改这个文件 |
| `assets/style.css` | 全局样式 |
| `assets/app.js` | 渲染与交互逻辑 |

## 本地预览

直接双击 `index.html` 即可。无构建步骤、无外部依赖，本地 file:// 也能跑。

## 新增 / 修改成果

打开 `assets/data.js`，在 `WORKS` 数组里加一项：

```js
{
  id: "my-new-work",               // 唯一英文标识
  title: "新成果标题",
  category: "research",            // research | project | design | photo
  year: "2026",
  summary: "一句话介绍（列表页显示）",
  description: "详情页长描述。\n\n用 \n 分段。",
  process: ["步骤一", "步骤二", "步骤三"],
  links: [
    { label: "论文链接", url: "https://...", type: "paper" },
    { label: "GitHub",  url: "https://...", type: "github" }
  ],
  coverColor: "linear-gradient(145deg,#aab5a3,#4b7260)",  // 占位封面
  coverText: "09",
  coverImage: "",                  // 有真实图片时填 "assets/img/xx.jpg"
  featured: false                  // 是否显示在首页精选
}
```

个人姓名、邮箱、介绍在 `PROFILE` 对象里改。

## 发布到 GitHub Pages

第一次发布需要本人操作：

```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio website"
gh repo create YOUR_USERNAME.github.io --public --source=. --remote=origin --push
```

然后到 GitHub 仓库 `Settings → Pages`，选择 `Deploy from a branch` → `main` → `/(root)`，保存。几分钟后访问 `https://YOUR_USERNAME.github.io/`。

之后每次 `git push` 都会自动重新部署。

## 用 Kimi 维护

仓库根目录的 `KIMI_PROMPT.txt` 是给 Kimi Code 的指令模板。安装并登录 Kimi Code CLI 后，进入本文件夹执行 `kimi`，把 `KIMI_PROMPT.txt` 的内容贴进去即可。Kimi 会读取 `assets/data.js`，按你的真实资料替换占位内容，并在你确认后提交并推送。

## 注意

- 不要把密码、API Key 等放进仓库。
- 若远程仓库已存在（且网页上初始化过 README），先 `git clone` 再把文件复制进去，避免历史冲突。
- `gh` 需要先 `gh auth login`。
