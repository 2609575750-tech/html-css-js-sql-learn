/* ============================================================
   nav.js — 顶栏 + 通用弹窗 + 工具
   暴露：FYNav.init() / FYModal.open(html) / FYUtil.escapeHtml
   ============================================================ */
(function (global) {
  'use strict';

  var FYUtil = {
    escapeHtml: function (s) {
      if (s == null) return '';
      return String(s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
  };

  var FYModal = {
    open: function (innerHtml) {
      this.close();
      var mask = document.createElement('div');
      mask.className = 'fy-modal-mask';
      mask.id = 'fy-modal';
      mask.innerHTML = '<div class="fy-modal">' + innerHtml + '</div>';
      mask.addEventListener('click', function (e) {
        if (e.target === mask) FYModal.close();
      });
      document.body.appendChild(mask);
      return mask.querySelector('.fy-modal');
    },
    close: function () {
      var m = document.getElementById('fy-modal');
      if (m) m.remove();
    }
  };

  function render() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    nav.innerHTML =
      '<button class="nav-btn menu-toggle" id="menu-toggle" aria-label="目录"><i class="fa-solid fa-bars"></i></button>' +
      '<div class="nav-brand" id="nav-brand">' +
        '<span class="logo-dot"><i class="fa-solid fa-code"></i></span>' +
        '<span>前端自学站</span>' +
      '</div>' +
      '<div class="nav-spacer"></div>' +
      '<button class="nav-btn" id="search-btn" aria-label="搜索"><i class="fa-solid fa-magnifying-glass"></i></button>' +
      '<button class="nav-btn" id="theme-toggle" aria-label="切换主题"><i class="fa-solid fa-moon"></i></button>';
  }

  function bind() {
    var brand = document.getElementById('nav-brand');
    if (brand) brand.addEventListener('click', function () { FYRouter.go('#/'); });

    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', function () { FYTheme.toggle(); });

    var searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.addEventListener('click', openSearch);

    var menuBtn = document.getElementById('menu-toggle');
    if (menuBtn) menuBtn.addEventListener('click', function () {
      if (global.FYSidebar) FYSidebar.toggleMobile();
    });

    // 主题图标同步
    FYTheme.apply(FYStorage.getTheme());
  }

  function openSearch() {
    var inner =
      '<div style="padding:14px 16px;border-bottom:1px solid var(--fy-border)">' +
        '<div style="display:flex;gap:8px;align-items:center">' +
          '<i class="fa-solid fa-magnifying-glass" style="color:var(--fy-text-3)"></i>' +
          '<input id="search-input" placeholder="搜知识点，比如「居中」「查询」「按钮」" ' +
            'style="flex:1;border:none;outline:none;background:transparent;font-size:15px;color:var(--fy-text)" />' +
          '<button class="fy-btn fy-btn-sm fy-btn-ghost" id="search-close"><i class="fa-solid fa-xmark"></i></button>' +
        '</div>' +
      '</div>' +
      '<div id="search-results" style="overflow-y:auto;padding:8px 10px"></div>';
    FYModal.open(inner);
    var input = document.getElementById('search-input');
    var results = document.getElementById('search-results');
    var closeBtn = document.getElementById('search-close');
    if (closeBtn) closeBtn.addEventListener('click', FYModal.close);
    if (input) {
      input.focus();
      input.addEventListener('input', function () {
        var q = input.value.trim();
        if (!q) { results.innerHTML = '<p class="text-3" style="padding:14px;text-align:center">输入关键词搜索</p>'; return; }
        var hits = global.FYSearch ? FYSearch.search(q) : [];
        if (!hits.length) {
          results.innerHTML = '<p class="text-3" style="padding:14px;text-align:center">没找到，换个词试试～</p>';
          return;
        }
        results.innerHTML = hits.map(function (h) {
          return '<a class="lesson-link" style="display:block;padding:10px 12px;border-radius:8px" href="#/lesson/' + h.id + '">' +
                   '<div style="font-weight:600;font-size:14px">' + FYUtil.escapeHtml(h.title) + '</div>' +
                   '<div class="text-3" style="font-size:12px">' + FYUtil.escapeHtml(h.categoryTitle) + '</div>' +
                 '</a>';
        }).join('');
      });
    }
  }

  var FYNav = { init: function () { render(); bind(); } };

  global.FYUtil = FYUtil;
  global.FYModal = FYModal;
  global.FYNav = FYNav;
})(window);
