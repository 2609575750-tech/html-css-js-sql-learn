/* ============================================================
   app.js — 启动入口
   顺序：主题 → 导航 → 侧边栏 → 路由
   ============================================================ */
(function (global) {
  'use strict';

  function boot() {
    if (global.FYTheme) FYTheme.init();
    if (global.FYNav) FYNav.init();
    if (global.FYSidebar) FYSidebar.init();
    if (global.FYRouter) FYRouter.start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
