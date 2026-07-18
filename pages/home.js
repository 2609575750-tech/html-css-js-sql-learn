/* ============================================================
   home.js — 首页 + FYCourse 课程辅助
   ============================================================ */
(function (global) {
  'use strict';

  var FYCourse = {
    flat: function () {
      var arr = [];
      global.COURSE_DATA.categories.forEach(function (cat) {
        cat.lessons.forEach(function (ls) { arr.push({ category: cat, lesson: ls, categoryTitle: cat.title }); });
      });
      return arr;
    },
    total: function () { return this.flat().length; },
    doneCount: function () {
      var rec = FYStorage.getQuizRecords(); var n = 0;
      this.flat().forEach(function (it) { if (rec[it.lesson.id] && rec[it.lesson.id].doneAt) n++; });
      return n;
    },
    byId: function (id) {
      var found = null;
      global.COURSE_DATA.categories.forEach(function (cat) {
        cat.lessons.forEach(function (ls) { if (ls.id === id) found = { category: cat, lesson: ls, categoryTitle: cat.title }; });
      });
      return found;
    },
    neighbors: function (id) {
      var flat = this.flat(); var prev = null, next = null;
      for (var i = 0; i < flat.length; i++) {
        if (flat[i].lesson.id === id) {
          if (i > 0) prev = flat[i - 1].lesson;
          if (i < flat.length - 1) next = flat[i + 1].lesson;
          break;
        }
      }
      return { prev: prev, next: next };
    }
  };

  global.FYCourse = FYCourse;
  global.FYViews = global.FYViews || {};

  global.FYViews.home = function (param, container) {
    var data = global.COURSE_DATA;
    var t = FYCourse.total(), done = FYCourse.doneCount();
    var pct = t ? Math.round(done / t * 100) : 0;
    var last = FYStorage.getLastPage();
    var lastIsLesson = /^#\/lesson\//.test(last);

    var html = '<div class="main-wrap fade-up">';
    html += '<section class="hero">' +
      '<h1>HTML / CSS / JS / SQL 一站自学 🚀</h1>' +
      '<p>不用装软件，打开网页就能学、能写、能运行。前端四件套 + 数据库 SQL，零基础到能动手做页面、查数据。</p>' +
      '<div class="hero-actions">' +
        '<a class="fy-btn fy-btn-primary" href="#/lesson/' + data.categories[0].lessons[0].id + '"><i class="fa-solid fa-play"></i> 开始第一节</a>' +
        (lastIsLesson ? '<a class="fy-btn fy-btn-ghost" href="' + last + '"><i class="fa-solid fa-clock-rotate-left"></i> 继续上次学习</a>' : '') +
        '<button class="fy-btn fy-btn-ghost" id="home-search"><i class="fa-solid fa-magnifying-glass"></i> 搜知识点</button>' +
      '</div></section>';

    html += '<section class="section-block">' +
      '<h2><span class="sec-icon"><i class="fa-solid fa-chart-simple"></i></span> 学习进度</h2>' +
      '<div class="flex items-center gap-3 flex-wrap">' +
        '<div class="fy-progress" style="flex:1;min-width:200px"><span style="width:' + pct + '%"></span></div>' +
        '<div class="font-bold text-fy-primary">' + done + ' / ' + t + ' 章测验完成</div>' +
      '</div>' +
      '<p class="text-2" style="margin-top:10px">完成全部 ' + t + ' 章测验，即可生成专属电子证书 🎓</p>' +
    '</section>';

    data.categories.forEach(function (cat) {
      html += '<section class="section-block">' +
        '<h2><span class="sec-icon"><i class="fa-solid ' + cat.icon + '"></i></span> ' + cat.title + '</h2>';
      cat.lessons.forEach(function (ls) {
        var isDone = FYStorage.isQuizDone(ls.id);
        html += '<a class="quiz-hub-item" href="#/lesson/' + ls.id + '" style="text-decoration:none;color:inherit">' +
          '<div class="qhi-main"><div class="qhi-title">' + ls.title + '</div>' +
          '<div class="qhi-sub">' + ls.lang.toUpperCase() + (isDone ? ' · 已通关' : '') + '</div></div>' +
          (isDone ? '<span class="q-status done"><i class="fa-solid fa-circle-check"></i></span>' : '<span class="q-status todo">' + ls.lang.toUpperCase() + '</span>') +
          '<i class="fa-solid fa-chevron-right" style="color:var(--fy-text-3)"></i></a>';
      });
      html += '</section>';
    });

    html += '</div>';
    container.innerHTML = html;

    var sb = document.getElementById('home-search');
    if (sb) sb.addEventListener('click', function () {
      var btn = document.getElementById('search-btn');
      if (btn) btn.click();
    });
  };
})(window);
