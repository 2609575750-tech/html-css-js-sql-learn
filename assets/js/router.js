/* ============================================================
   router.js — Hash 路由
   #/              首页
   #/lesson/:id    知识点详情（6 板块）
   #/quiz          章节测验总览
   #/quiz/:id      单章测验（弹窗）
   #/certificate   学习证书
   ============================================================ */
(function (global) {
  'use strict';

  function parse() {
    var h = (location.hash || '').replace(/^#/, '') || '/';
    var parts = h.split('/').filter(Boolean);
    if (parts.length === 0) return { name: 'home', param: null };
    if (parts[0] === 'lesson') return { name: 'lesson', param: parts[1] || null };
    if (parts[0] === 'quiz') return { name: 'quiz', param: parts[1] || null };
    if (parts[0] === 'certificate') return { name: 'certificate', param: null };
    return { name: 'notfound', param: null };
  }

  var Router = {
    current: null,
    parse: parse,
    render: function () {
      var route = parse();
      this.current = route;
      var container = document.getElementById('app-main');
      if (!container) return;

      FYStorage.setLastPage(location.hash || '#/');
      if (route.name === 'lesson' && route.param) {
        FYStorage.markVisited(route.param);
      }

      var views = global.FYViews || {};
      var view = views[route.name] || views['notfound'];
      container.innerHTML = '';
      container.scrollTop = 0;

      try {
        view(route.param, container);
      } catch (e) {
        container.innerHTML =
          '<div class="section-block" style="padding:24px;color:var(--fy-danger)">' +
          '页面渲染出错：' + (e && e.message ? e.message : e) + '</div>';
        if (global.console) console.error(e);
      }

      if (global.FYSidebar && FYSidebar.highlight) FYSidebar.highlight(route);
      if (global.FYSidebar && FYSidebar.closeMobile) FYSidebar.closeMobile();

      try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch (e) { window.scrollTo(0, 0); }
    },
    start: function () {
      var self = this;
      window.addEventListener('hashchange', function () { self.render(); });
      this.render();
    },
    go: function (hash) {
      if (location.hash === hash) this.render();
      else location.hash = hash;
    }
  };

  global.FYRouter = Router;
})(window);
