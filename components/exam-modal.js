/* ============================================================
   exam-modal.js — 章节测验弹窗
   FYExam.open(lessonId)：从 QUIZ_DATA 取题，作答→提交→计分→记录
   ============================================================ */
(function (global) {
  'use strict';

  function open(lessonId) {
    var data = global.QUIZ_DATA || {};
    var lesson = (global.COURSE_DATA ? findLesson(lessonId) : null);
    var questions = data[lessonId] || [];
    if (!questions.length) {
      FYModal.open('<div style="padding:24px;text-align:center" class="text-2">这章还没有题目～</div>');
      return;
    }
    var title = lesson ? lesson.title : '章节测验';

    var inner =
      '<div style="padding:14px 18px;border-bottom:1px solid var(--fy-border);display:flex;align-items:center">' +
        '<i class="fa-solid fa-clipboard-check" style="color:var(--fy-primary);margin-right:8px"></i>' +
        '<strong style="flex:1">' + FYUtil.escapeHtml(title) + ' · 章节测验</strong>' +
        '<button class="fy-btn fy-btn-sm fy-btn-ghost" id="exam-close"><i class="fa-solid fa-xmark"></i></button>' +
      '</div>' +
      '<div id="exam-body" style="overflow-y:auto;padding:8px 0"></div>' +
      '<div style="padding:12px 18px;border-top:1px solid var(--fy-border);text-align:right" id="exam-foot">' +
        '<button class="fy-btn fy-btn-primary" id="exam-submit"><i class="fa-solid fa-check"></i> 提交答案</button>' +
      '</div>';

    FYModal.open(inner);
    document.getElementById('exam-close').addEventListener('click', FYModal.close);

    var body = document.getElementById('exam-body');
    var answers = new Array(questions.length).fill(null);

    questions.forEach(function (q, qi) {
      var div = document.createElement('div');
      div.className = 'exam-q';
      div.innerHTML = '<div class="exam-q-title">' + (qi + 1) + '. ' + FYUtil.escapeHtml(q.q) + '</div>' +
        q.options.map(function (opt, oi) {
          return '<div class="exam-option" data-q="' + qi + '" data-o="' + oi + '">' +
                   '<span class="opt-key">' + String.fromCharCode(65 + oi) + '.</span>' +
                   '<span>' + FYUtil.escapeHtml(opt) + '</span>' +
                 '</div>';
        }).join('');
      body.appendChild(div);
    });

    body.querySelectorAll('.exam-option').forEach(function (el) {
      el.addEventListener('click', function () {
        var qi = +el.getAttribute('data-q');
        body.querySelectorAll('.exam-option[data-q="' + qi + '"]').forEach(function (e) { e.classList.remove('selected'); });
        el.classList.add('selected');
        answers[qi] = +el.getAttribute('data-o');
      });
    });

    document.getElementById('exam-submit').addEventListener('click', function () {
      if (answers.some(function (a) { return a === null; })) {
        var btn = document.getElementById('exam-submit');
        btn.classList.add('shake');
        setTimeout(function () { btn.classList.remove('shake'); }, 300);
        return;
      }
      var score = 0;
      questions.forEach(function (q, qi) {
        var opts = body.querySelectorAll('.exam-option[data-q="' + qi + '"]');
        opts.forEach(function (el) {
          var oi = +el.getAttribute('data-o');
          el.classList.remove('selected');
          if (oi === q.answer) el.classList.add('correct');
          else if (oi === answers[qi]) el.classList.add('wrong');
        });
        if (answers[qi] === q.answer) score++;
        // 解析
        var qDiv = body.querySelectorAll('.exam-q')[qi];
        var exp = document.createElement('div');
        exp.style.cssText = 'margin-top:8px;padding:8px 12px;border-radius:8px;font-size:13px;background:var(--fy-surface-3);color:var(--fy-text-2)';
        exp.innerHTML = (answers[qi] === q.answer ? '<span class="text-fy-success">✓ 答对了</span>' : '<span class="text-fy-danger">✗ 答错了</span>') +
          '　解析：' + FYUtil.escapeHtml(q.explain || '');
        qDiv.appendChild(exp);
      });

      FYStorage.setQuizRecord(lessonId, { answers: answers, score: score, total: questions.length, doneAt: Date.now() });
      if (global.FYSidebar) FYSidebar.refresh();

      var foot = document.getElementById('exam-foot');
      foot.innerHTML =
        '<span style="float:left;line-height:36px;font-weight:600;color:' + (score === questions.length ? 'var(--fy-success)' : 'var(--fy-text)') + '">' +
          '得分 ' + score + ' / ' + questions.length + '</span>' +
        '<button class="fy-btn fy-btn-ghost" id="exam-retry"><i class="fa-solid fa-rotate-left"></i> 重做</button> ' +
        '<button class="fy-btn fy-btn-primary" id="exam-done"><i class="fa-solid fa-check"></i> 完成</button>';
      document.getElementById('exam-retry').addEventListener('click', function () { FYModal.close(); open(lessonId); });
      document.getElementById('exam-done').addEventListener('click', function () { FYModal.close(); FYRouter.go('#/quiz'); });
    });
  }

  function findLesson(id) {
    var found = null;
    global.COURSE_DATA.categories.forEach(function (cat) {
      cat.lessons.forEach(function (ls) { if (ls.id === id) found = ls; });
    });
    return found;
  }

  global.FYExam = { open: open };
})(window);
