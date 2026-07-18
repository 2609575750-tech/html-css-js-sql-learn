/* ============================================================
   quiz.js — 章节测验总览
   ============================================================ */
(function (global) {
  'use strict';
  global.FYViews = global.FYViews || {};
  global.FYViews.quiz = function (param, container) {
    if (param && global.FYExam) FYExam.open(param);

    var all = FYCourse.flat();
    var records = FYStorage.getQuizRecords();
    var done = 0;
    all.forEach(function (it) { if (records[it.lesson.id] && records[it.lesson.id].doneAt) done++; });
    var total = all.length;

    var html = '<div class="main-wrap fade-up">';
    html += '<h1 style="font-size:24px;margin-bottom:4px">章节测验总览</h1>';
    html += '<p class="text-2" style="margin-bottom:18px">每章 3 道选择题，提交即记为「已通关」。全部通关可解锁电子证书。</p>';

    html += '<div class="section-block" style="padding:16px 18px">' +
      '<div class="flex items-center gap-3 flex-wrap">' +
        '<div class="fy-progress" style="flex:1;min-width:200px"><span style="width:' + (total ? Math.round(done / total * 100) : 0) + '%"></span></div>' +
        '<div class="font-bold text-fy-primary">' + done + ' / ' + total + ' 章已通关</div>' +
      '</div>' +
      (done === total ? '<p style="margin-top:10px" class="text-fy-success font-semibold"><i class="fa-solid fa-circle-check"></i> 全部通关！去 <a href="#/certificate">领取证书 →</a></p>' : '') +
    '</div>';

    html += '<div style="margin-top:18px">';
    all.forEach(function (it) {
      var rec = records[it.lesson.id];
      var isDone = !!(rec && rec.doneAt);
      html += '<div class="quiz-hub-item">' +
        '<div class="qhi-main"><div class="qhi-title">' + it.lesson.title + '</div>' +
        '<div class="qhi-sub">' + it.categoryTitle +
          (isDone ? ' · 最佳 ' + rec.score + '/' + rec.total + ' 分' : ' · 未测验') + '</div></div>' +
        (isDone ? '<span class="q-status done"><i class="fa-solid fa-circle-check"></i> 已通关</span>' : '<span class="q-status todo">未通关</span>') +
        '<button class="fy-btn ' + (isDone ? 'fy-btn-ghost' : 'fy-btn-primary') + '" data-quiz="' + it.lesson.id + '">' +
          (isDone ? '<i class="fa-solid fa-rotate-left"></i> 重做' : '<i class="fa-solid fa-play"></i> 开始') +
        '</button>' +
      '</div>';
    });
    html += '</div>';

    html += '<div style="margin-top:20px"><a class="fy-btn fy-btn-ghost" href="#/certificate"><i class="fa-solid fa-award"></i> 查看我的证书</a></div>';
    html += '</div>';

    container.innerHTML = html;
    container.querySelectorAll('[data-quiz]').forEach(function (btn) {
      btn.addEventListener('click', function () { if (global.FYExam) FYExam.open(btn.getAttribute('data-quiz')); });
    });
  };
})(window);
