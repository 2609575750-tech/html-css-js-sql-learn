/* ============================================================
   lesson.js — 知识点详情（6 板块 + 编辑器 + 上下章 + 测验入口）
   ============================================================ */
(function (global) {
  'use strict';
  global.FYViews = global.FYViews || {};

  function codeBlock(code) {
    return '<pre style="background:var(--fy-code-bg);color:var(--fy-code-text);padding:12px 14px;border-radius:8px;overflow-x:auto;font-size:13px;line-height:1.6;margin:8px 0">' +
      FYUtil.escapeHtml(code) + '</pre>';
  }

  global.FYViews.lesson = function (id, container) {
    var info = FYCourse.byId(id);
    if (!info) { global.FYViews.notfound(null, container); return; }
    var ls = info.lesson;

    var html = '<div class="main-wrap fade-up">';
    // 面包屑
    html += '<p class="text-3" style="margin-bottom:6px;font-size:13px">' +
      '<a href="#/" style="color:inherit">首页</a> › ' +
      '<a href="#/" style="color:inherit">' + info.categoryTitle + '</a> › ' +
      '<span class="text-2">' + ls.title + '</span></p>';

    html += '<h1 style="font-size:24px;margin-bottom:6px">' + ls.title + '</h1>';
    html += '<p style="margin-bottom:18px"><span class="lang-tag" style="font-size:12px;padding:2px 9px;border-radius:999px;background:var(--fy-primary-bg);color:var(--fy-primary);font-weight:600">' + ls.lang.toUpperCase() + '</span></p>';

    // 1. 大白话介绍
    html += '<section class="section-block">' +
      '<h2><span class="sec-icon"><i class="fa-solid fa-lightbulb"></i></span> 大白话介绍</h2>' +
      '<p style="margin:0;line-height:1.8">' + FYUtil.escapeHtml(ls.intro) + '</p>' +
    '</section>';

    // 2. 基础写法拆解
    if (ls.breakdown && ls.breakdown.length) {
      html += '<section class="section-block">' +
        '<h2><span class="sec-icon"><i class="fa-solid fa-code"></i></span> 基础写法拆解</h2>';
      ls.breakdown.forEach(function (b) {
        html += '<div style="margin-bottom:14px">' +
          codeBlock(b.code) +
          '<p class="text-2" style="margin:4px 0 0">' + FYUtil.escapeHtml(b.explain) + '</p>' +
        '</div>';
      });
      html += '</section>';
    }

    // 3. 循序渐进案例
    if (ls.cases && ls.cases.length) {
      html += '<section class="section-block">' +
        '<h2><span class="sec-icon"><i class="fa-solid fa-layer-group"></i></span> 循序渐进案例</h2>';
      ls.cases.forEach(function (c, i) {
        html += '<div style="margin-bottom:18px">' +
          '<h3 style="font-size:15px;margin:0 0 4px">案例 ' + (i + 1) + '：' + FYUtil.escapeHtml(c.title) + '</h3>' +
          '<p class="text-2" style="margin:0 0 6px">' + FYUtil.escapeHtml(c.explain) + '</p>' +
          codeBlock(c.code) +
        '</div>';
      });
      html += '</section>';
    }

    // 4. 在线编辑器（占位，后面注入）
    html += '<section class="section-block">' +
      '<h2><span class="sec-icon"><i class="fa-solid fa-play"></i></span> 在线编辑器（动手试）</h2>' +
      '<p class="text-2" style="margin:0 0 12px">改改代码点「运行」看效果。HTML/CSS 看预览，JS 看 console 输出，SQL 看查询结果表。</p>' +
      '<div id="editor-slot"></div>' +
    '</section>';

    // 5. 踩坑提醒
    if (ls.pitfalls && ls.pitfalls.length) {
      html += '<section class="section-block">' +
        '<h2><span class="sec-icon"><i class="fa-solid fa-triangle-exclamation"></i></span> 踩坑提醒</h2>' +
        '<div style="overflow-x:auto"><table class="pit-table"><thead><tr><th>❌ 容易写错</th><th>✅ 正确写法</th><th>说明</th></tr></thead><tbody>';
      ls.pitfalls.forEach(function (p) {
        html += '<tr><td><code>' + FYUtil.escapeHtml(p.wrong) + '</code></td>' +
          '<td><code>' + FYUtil.escapeHtml(p.right) + '</code></td>' +
          '<td class="text-2">' + FYUtil.escapeHtml(p.note) + '</td></tr>';
      });
      html += '</tbody></table></div></section>';
    }

    // 6. 课后小练习
    if (ls.exercises && ls.exercises.length) {
      html += '<section class="section-block">' +
        '<h2><span class="sec-icon"><i class="fa-solid fa-pen"></i></span> 课后小练习</h2>';
      ls.exercises.forEach(function (e, i) {
        html += '<div class="exercise-item">' +
          '<div class="exercise-q">' + (i + 1) + '. ' + FYUtil.escapeHtml(e.q) + '</div>' +
          '<div class="exercise-hint">💡 提示：' + FYUtil.escapeHtml(e.hint) + '</div>' +
        '</div>';
      });
      html += '</section>';
    }

    // 测验入口
    var isDone = FYStorage.isQuizDone(ls.id);
    html += '<div style="text-align:center;margin:8px 0 20px">' +
      '<button class="fy-btn ' + (isDone ? 'fy-btn-ghost' : 'fy-btn-primary') + '" id="go-quiz" style="padding:12px 28px;font-size:15px">' +
        '<i class="fa-solid fa-clipboard-check"></i> ' + (isDone ? '重做本章测验' : '做本章测验') +
      '</button></div>';

    // 上下章
    var nb = FYCourse.neighbors(id);
    html += '<div style="display:flex;justify-content:space-between;gap:10px;margin-top:18px;padding-top:18px;border-top:1px solid var(--fy-border)">';
    html += nb.prev ? '<a class="fy-btn fy-btn-ghost" href="#/lesson/' + nb.prev.id + '"><i class="fa-solid fa-arrow-left"></i> ' + FYUtil.escapeHtml(nb.prev.title) + '</a>' : '<span></span>';
    html += nb.next ? '<a class="fy-btn fy-btn-ghost" href="#/lesson/' + nb.next.id + '">' + FYUtil.escapeHtml(nb.next.title) + ' <i class="fa-solid fa-arrow-right"></i></a>' : '<span></span>';
    html += '</div>';

    html += '</div>';
    container.innerHTML = html;

    // 注入编辑器
    var slot = container.querySelector('#editor-slot');
    if (slot && global.FYEditor) {
      FYEditor.create(ls, slot);
    }

    // 测验按钮
    var qBtn = container.querySelector('#go-quiz');
    if (qBtn) qBtn.addEventListener('click', function () {
      if (global.FYExam) FYExam.open(ls.id);
    });
  };
})(window);
