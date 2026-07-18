/* ============================================================
   sidebar.js — 双层目录侧边栏
   暴露：FYSidebar.init() / highlight(route) / toggleMobile() / closeMobile() / refresh()
   ============================================================ */
(function (global) {
  'use strict';

  function render() {
    var sb = document.getElementById('sidebar');
    if (!sb) return;
    var data = global.COURSE_DATA;
    if (!data) return;
    var open = FYStorage.getSidebarOpen();

    var html = '';
    data.categories.forEach(function (cat) {
      var collapsed = open[cat.id] === false;
      html += '<div class="cat">';
      html += '<button class="cat-head' + (collapsed ? ' collapsed' : '') + '" data-cat="' + cat.id + '">' +
                '<i class="cat-icon fa-solid ' + cat.icon + '"></i>' +
                '<span class="cat-title">' + cat.title + '</span>' +
                '<i class="cat-arrow fa-solid fa-chevron-down"></i>' +
              '</button>';
      html += '<div class="cat-lessons">';
      cat.lessons.forEach(function (ls) {
        var done = FYStorage.isQuizDone(ls.id);
        html += '<a class="lesson-link" data-id="' + ls.id + '" href="#/lesson/' + ls.id + '">' +
                  '<span class="dot"></span><span class="lt">' + ls.title + '</span>' +
                  (done ? '<span class="done-badge" title="已通关"><i class="fa-solid fa-circle-check"></i></span>' : '') +
                '</a>';
      });
      html += '</div></div>';
    });
    sb.innerHTML = html;

    sb.querySelectorAll('.cat-head').forEach(function (head) {
      head.addEventListener('click', function () {
        var id = head.getAttribute('data-cat');
        var nowCollapsed = head.classList.toggle('collapsed');
        var map = FYStorage.getSidebarOpen();
        map[id] = !nowCollapsed;
        FYStorage.setSidebarOpen(map);
      });
    });
  }

  function highlight(route) {
    var sb = document.getElementById('sidebar');
    if (!sb) return;
    sb.querySelectorAll('.lesson-link.active').forEach(function (el) { el.classList.remove('active'); });
    if (route && route.name === 'lesson' && route.param) {
      var link = sb.querySelector('.lesson-link[data-id="' + route.param + '"]');
      if (link) {
        link.classList.add('active');
        var cat = link.closest('.cat');
        var head = cat.querySelector('.cat-head');
        if (head.classList.contains('collapsed')) {
          head.classList.remove('collapsed');
          var map = FYStorage.getSidebarOpen();
          map[head.getAttribute('data-cat')] = true;
          FYStorage.setSidebarOpen(map);
        }
        try { link.scrollIntoView({ block: 'nearest' }); } catch (e) {}
      }
    }
  }

  function toggleMobile() {
    var sb = document.getElementById('sidebar');
    var ov = document.getElementById('sidebar-overlay');
    if (!sb) return;
    var open = sb.classList.toggle('open');
    if (ov) ov.classList.toggle('show', open);
  }
  function closeMobile() {
    var sb = document.getElementById('sidebar');
    var ov = document.getElementById('sidebar-overlay');
    if (sb) sb.classList.remove('open');
    if (ov) ov.classList.remove('show');
  }

  function refresh() {
    render();
    if (global.FYRouter && FYRouter.current) highlight(FYRouter.current);
  }

  function init() {
    render();
    var ov = document.getElementById('sidebar-overlay');
    if (ov) ov.addEventListener('click', closeMobile);
    if (global.FYRouter && FYRouter.current) highlight(FYRouter.current);
  }

  global.FYSidebar = { init: init, refresh: refresh, highlight: highlight, toggleMobile: toggleMobile, closeMobile: closeMobile };
})(window);
