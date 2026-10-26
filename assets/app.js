/* ============================================================
 * 个人成果展示网站 — 渲染与交互逻辑
 * 依赖：assets/data.js 必须先于本文件加载
 * ============================================================ */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const page = document.body.dataset.page || "";

  /* ---------- 工具 ---------- */
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const catLabel = (id) => {
    const c = CATEGORIES.find((x) => x.id === id);
    return c ? c.label : id;
  };

  const catCount = (id) => id === "all" ? WORKS.length : WORKS.filter((w) => w.category === id).length;

  const coverHTML = (w, cls) => {
    const clsName = cls || "cover";
    if (w.coverImage) {
      return `<div class="${clsName} has-image"><img src="${esc(w.coverImage)}" alt="${esc(w.title)}"></div>`;
    }
    const style = w.coverColor ? ` style="background:${esc(w.coverColor)}"` : "";
    const num = w.coverText ? `<span class="num">${esc(w.coverText)}</span>` : "";
    return `<div class="${clsName}"${style}>${num}</div>`;
  };

  const workCardHTML = (w) => `
    <a class="work-card" href="work.html?id=${encodeURIComponent(w.id)}">
      ${coverHTML(w, "cover")}
      <h3>${esc(w.title)}<span class="arrow">→</span></h3>
      <p class="meta"><span class="tag">${esc(catLabel(w.category))}</span><span>${esc(w.year)}</span></p>
      <p class="summary">${esc(w.summary)}</p>
    </a>`;

  /* ---------- 公共渲染：页脚年份 / 高亮当前导航 ---------- */
  const setYear = () => {
    const el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  };

  const setActiveNav = () => {
    const map = { home: "home", works: "works", work: "works", about: "about" };
    const key = map[page];
    if (!key) return;
    $$(".nav-links a").forEach((a) => {
      if (a.dataset.nav === key) a.classList.add("active");
    });
  };

  /* ---------- 绑定 PROFILE 占位 ---------- */
  const bindProfile = () => {
    $$("[data-bind='name']").forEach((el) => (el.textContent = PROFILE.name));
    $$("[data-bind='role']").forEach((el) => (el.textContent = PROFILE.role));
    $$("[data-bind='email']").forEach((el) => {
      el.textContent = PROFILE.email;
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + PROFILE.email);
    });
    $$("[data-bind='location']").forEach((el) => (el.textContent = PROFILE.location));
    $$("[data-bind='tagline-top']").forEach((el) => (el.textContent = PROFILE.taglineTop));
    $$("[data-bind='tagline-em']").forEach((el) => (el.textContent = PROFILE.taglineEm));
    $$("[data-bind='intro']").forEach((el) => (el.textContent = PROFILE.intro));
    $$("[data-bind='footer-note']").forEach((el) => (el.textContent = PROFILE.footerNote));
  };

  /* ---------- 首页 ---------- */
  const initHome = () => {
    const featured = WORKS.filter((w) => w.featured);
    const box = $("#featured-works");
    if (box) {
      box.innerHTML = featured.length
        ? featured.map(workCardHTML).join("")
        : `<div class="empty">暂无精选成果</div>`;
    }

    const catGrid = $("#cat-grid");
    if (catGrid) {
      catGrid.innerHTML = CATEGORIES.filter((c) => c.id !== "all").map((c) => `
        <a class="cat-card" href="works.html#${esc(c.id)}">
          <span class="cat-num">${String(catCount(c.id)).padStart(2, "0")}</span>
          <span class="cat-name">${esc(c.label)}</span>
          <span class="cat-count">查看全部 →</span>
        </a>`).join("");
    }
  };

  /* ---------- 成果列表页 ---------- */
  const initWorks = () => {
    const bar = $("#filter-bar");
    const grid = $("#works-grid");
    if (!bar || !grid) return;

    const renderBar = (active) => {
      bar.innerHTML = CATEGORIES.map((c) => `
        <button data-f="${esc(c.id)}" class="${c.id === active ? "active" : ""}">
          ${esc(c.label)}<span class="count">${catCount(c.id)}</span>
        </button>`).join("");
    };

    const renderGrid = (fid) => {
      const list = fid === "all" ? WORKS : WORKS.filter((w) => w.category === fid);
      grid.innerHTML = list.length
        ? list.map(workCardHTML).join("")
        : `<div class="empty">该分类下暂无成果</div>`;
    };

    const current = () => {
      const h = (location.hash || "").replace("#", "");
      return CATEGORIES.some((c) => c.id === h) ? h : "all";
    };

    const apply = () => {
      const fid = current();
      renderBar(fid);
      renderGrid(fid);
    };

    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-f]");
      if (!btn) return;
      const fid = btn.dataset.f;
      if (fid === "all") {
        history.replaceState(null, "", location.pathname);
      } else {
        location.hash = fid;
      }
      apply();
    });

    window.addEventListener("hashchange", apply);
    apply();
  };

  /* ---------- 成果详情页 ---------- */
  const initWork = () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const idx = WORKS.findIndex((w) => w.id === id);
    const w = idx >= 0 ? WORKS[idx] : WORKS[0];
    const realIdx = idx >= 0 ? idx : 0;
    if (!w) return;

    document.title = `${w.title} · ${PROFILE.name}`;

    const set = (sel, val) => { const el = $(sel); if (el) el.innerHTML = val; };
    const setText = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };

    setText("#d-num", w.coverText || String(realIdx + 1).padStart(2, "0"));
    setText("#d-title", w.title);
    setText("#d-cat", catLabel(w.category));
    setText("#d-cat-badge", catLabel(w.category));
    setText("#d-year", w.year);
    setText("#d-summary", w.summary);

    const coverBox = $("#d-cover");
    if (coverBox) coverBox.innerHTML = coverHTML(w, "detail-cover");

    const paras = (w.description || "").split(/\n+/).filter((s) => s.trim());
    set("#d-desc", paras.length ? paras.map((p) => `<p>${esc(p)}</p>`).join("") : "");

    const proc = w.process || [];
    set("#d-process", proc.length
      ? `<ol class="process-list">${proc.map((s, i) => `
          <li><span class="step-num">${String(i + 1).padStart(2, "0")}</span><span>${esc(s)}</span></li>`).join("")}</ol>`
      : "");

    const links = w.links || [];
    set("#d-links", links.length
      ? `<div class="link-list">${links.map((l) => `
          <a class="link-pill" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">
            ${esc(l.label)}<span class="ext">↗</span>
          </a>`).join("")}</div>`
      : "");
    const linksSec = $("#d-links-section");
    if (linksSec) linksSec.style.display = links.length ? "" : "none";

    const prev = WORKS[(realIdx - 1 + WORKS.length) % WORKS.length];
    const next = WORKS[(realIdx + 1) % WORKS.length];
    const pn = $("#prev-next");
    if (pn) {
      pn.innerHTML = `
        <a class="prev" href="work.html?id=${encodeURIComponent(prev.id)}">
          <span class="pn-label">← 上一个</span>
          <span class="pn-title">${esc(prev.title)}</span>
        </a>
        <a class="next" href="work.html?id=${encodeURIComponent(next.id)}">
          <span class="pn-label">下一个 →</span>
          <span class="pn-title">${esc(next.title)}</span>
        </a>`;
    }
  };

  /* ---------- 关于页 ---------- */
  const initAbout = () => {
    const box = $("#about-paragraphs");
    if (box) {
      box.innerHTML = (PROFILE.aboutParagraphs || []).map((p) => `<p>${esc(p)}</p>`).join("");
    }
    const gh = $("#about-github");
    if (gh) {
      if (PROFILE.github) {
        gh.innerHTML = `<a href="${esc(PROFILE.github)}" target="_blank" rel="noopener noreferrer">${esc(PROFILE.github)}</a>`;
      } else {
        gh.textContent = "—";
      }
    }
  };

  /* ---------- 启动 ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    setActiveNav();
    bindProfile();
    if (page === "home") initHome();
    if (page === "works") initWorks();
    if (page === "work") initWork();
    if (page === "about") initAbout();
  });
})();
