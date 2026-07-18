/* ============================================================
   notfound.js — 404 页
   ============================================================ */
(function (global) {
  'use strict';
  global.FYViews = global.FYViews || {};
  global.FYViews.notfound = function (param, container) {
    container.innerHTML =
      '<div class="main-wrap fade-up" style="text-align:center;padding:60px 20px">' +
        '<i class="fa-solid fa-compass" style="font-size:48px;color:var(--fy-text-3)"></i>' +
        '<h1 style="margin:16px 0 8px">页面走丢了</h1>' +
        '<p class="text-2">这个地址不存在，回首页看看吧～</p>' +
        '<a class="fy-btn fy-btn-primary" href="#/" style="margin-top:18px"><i class="fa-solid fa-house"></i> 回首页</a>' +
      '</div>';
  };
})(window);
