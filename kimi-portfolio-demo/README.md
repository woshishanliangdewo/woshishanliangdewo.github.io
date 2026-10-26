# 个人成果展示页 — GitHub Pages 示例

本项目是一个单文件静态网站，包含首页、成果分类筛选、关于我、联系方式和手机适配。当前 6 个项目均为**演示占位内容**，彩色封面使用 CSS 生成，没有外部图片依赖。

## 预览

双击 `index.html`，浏览器即可打开。注意作品内容为演示数据，并非真实履历。

## 发布

1. 在 GitHub 创建名为 `<你的GitHub用户名>.github.io` 的 **Public** 仓库。
2. 将 `index.html` 上传到仓库根目录并提交。
3. 到仓库 `Settings → Pages`，选择 `Deploy from a branch`、`main`、`/(root)`，保存。
4. 打开 `https://<你的GitHub用户名>.github.io/`。

## 用 Kimi 更新

安装并登录 Kimi Code CLI；进入本项目文件夹执行 `kimi`，要求它将 `index.html` 中的个人介绍、作品和联系方式替换为真实信息，并添加真实图片。当前数据位于 HTML 最下方的 `const works = [...]`。

## Git 自动推送（仓库首次准备好并完成 gh 登录后）

```bash
git init
git branch -M main
git add .
git commit -m "Create portfolio"
gh repo create YOUR_USERNAME.github.io --public --source=. --remote=origin --push
```

如果远程仓库已存在，改用 `git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git` 和 `git push -u origin main`。不要将密码、API Key 等放进仓库。`gh` 需要先安装并执行 `gh auth login`；Pages 仍需在 GitHub 设置一次。注意若创建仓库前就已经在网页上初始化 README，应先 `git clone` 该仓库再复制文件，避免历史冲突。
