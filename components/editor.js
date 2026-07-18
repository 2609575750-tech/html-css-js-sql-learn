/* ============================================================
   editor.js — 多引擎在线编辑器
   引擎：
     html/css  → iframe srcdoc 实时预览
     js        → sandbox iframe + console.log 捕获
     sql       → sql.js (SQLite wasm) 执行 + 结果表
   暴露：FYEditor.create(lesson, container)
   ============================================================ */
(function (global) {
  'use strict';

  var SQL_BASE = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';
  var SQL_PROMISE = null;

  function getSQL() {
    if (SQL_PROMISE) return SQL_PROMISE;
    SQL_PROMISE = new Promise(function (resolve, reject) {
      function init() {
        global.initSqlJs({ locateFile: function (f) { return SQL_BASE + f; } })
          .then(resolve).catch(reject);
      }
      if (global.initSqlJs) { init(); }
      else {
        var s = document.createElement('script');
        s.src = SQL_BASE + 'sql-wasm.js';
        s.onload = init;
        s.onerror = function () { reject(new Error('SQL 引擎加载失败，检查网络后重试')); };
        document.head.appendChild(s);
      }
    });
    return SQL_PROMISE;
  }

  // 报错大白话翻译
  function translateError(lang, msg) {
    if (!msg) return '运行出错了';
    msg = String(msg);
    if (lang === 'sql') {
      if (/no such table/i.test(msg)) return msg + '\n💡 大白话：这个表不存在，是不是还没建表、或者表名拼错了？';
      if (/no such column/i.test(msg)) return msg + '\n💡 大白话：没有这一列，检查列名拼写对不对。';
      if (/syntax error/i.test(msg)) return msg + '\n💡 大白话：语法错了，看看报错位置附近的关键字、逗号、括号有没有写错。';
      if (/unique constraint/i.test(msg)) return msg + '\n💡 大白话：插入了重复的主键，主键必须唯一。';
      return msg;
    }
    // js
    if (/ReferenceError/i.test(msg)) return msg + '\n💡 大白话：用了没定义的变量名，检查是不是拼错了或忘了声明。';
    if (/SyntaxError/i.test(msg)) return msg + '\n💡 大白话：语法写错了，检查括号、引号、分号有没有配对。';
    if (/TypeError/i.test(msg)) return msg + '\n💡 大白话：类型不对，比如对 null/undefined 取了属性，或调用了不存在的方法。';
    return msg;
  }

  function toast(msg) {
    var t = document.createElement('div');
    t.className = 'fy-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 1600);
  }

  var FYEditor = {
    create: function (lesson, container) {
      var lang = lesson.lang || 'html';
      var saved = FYStorage.getEditorCode(lesson.id, lesson.editorCode || '');
      var showPreview = (lang === 'html' || lang === 'css' || lang === 'js');
      var showOutput = (lang === 'js' || lang === 'sql');

      var wrap = document.createElement('div');
      wrap.className = 'editor-wrap';
      wrap.innerHTML =
        '<div class="editor-bar">' +
          '<span class="lang-tag">' + lang.toUpperCase() + '</span>' +
          '<span class="spacer"></span>' +
          '<button class="fy-btn fy-btn-sm fy-btn-primary" data-act="run"><i class="fa-solid fa-play"></i> 运行</button>' +
          '<button class="fy-btn fy-btn-sm fy-btn-ghost" data-act="reset"><i class="fa-solid fa-rotate-left"></i> 重置</button>' +
          '<button class="fy-btn fy-btn-sm fy-btn-ghost" data-act="clear"><i class="fa-solid fa-eraser"></i> 清空</button>' +
          '<button class="fy-btn fy-btn-sm fy-btn-ghost" data-act="copy"><i class="fa-solid fa-copy"></i> 复制</button>' +
        '</div>' +
        '<textarea class="editor-textarea" spellcheck="false"></textarea>' +
        (showOutput ? '<div class="editor-output" data-out><span class="text-3">点「运行」看结果</span></div>' : '') +
        (showPreview ? '<div class="editor-preview" data-prev><div class="editor-preview-label">预览效果</div><iframe sandbox="allow-scripts"></iframe></div>' : '');

      container.appendChild(wrap);
      var ta = wrap.querySelector('textarea');
      ta.value = saved;

      var outEl = wrap.querySelector('[data-out]');
      var prevEl = wrap.querySelector('[data-prev]');
      var iframe = prevEl ? prevEl.querySelector('iframe') : null;

      function save() { FYStorage.setEditorCode(lesson.id, ta.value); }
      ta.addEventListener('input', save);

      // JS console 捕获
      var logHandler = null;
      function bindLog() {
        if (logHandler) global.removeEventListener('message', logHandler);
        logHandler = function (e) {
          if (e.data && e.data.__fyLog) {
            var cur = outEl.getAttribute('data-raw') || '';
            outEl.setAttribute('data-raw', cur + e.data.text + '\n');
            outEl.textContent = outEl.getAttribute('data-raw');
            outEl.classList.remove('err');
          }
        };
        global.addEventListener('message', logHandler);
      }

      function run() {
        var code = ta.value;
        save();
        if (lang === 'sql') { runSQL(code); return; }
        if (lang === 'js') { runJS(code); return; }
        // html / css → 直接预览
        if (iframe) {
          iframe.srcdoc = code;
          if (outEl) { outEl.innerHTML = '<span class="text-3">已渲染到预览区 ↓</span>'; outEl.classList.remove('err'); }
        }
      }

      function runJS(code) {
        if (outEl) { outEl.textContent = ''; outEl.setAttribute('data-raw', ''); outEl.classList.remove('err'); }
        bindLog();
        var html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
          '<script>' +
            'var __send=function(t){try{parent.postMessage({__fyLog:1,text:String(t)},"*")}catch(e){}};' +
            'console.log=function(){__send([].slice.call(arguments).map(function(x){return typeof x==="object"?JSON.stringify(x):x}).join(" "))};' +
            'console.error=function(){__send("[错误] "+[].slice.call(arguments).join(" "))};' +
            'console.warn=function(){__send("[警告] "+[].slice.call(arguments).join(" "))};' +
            'window.onerror=function(m,s,l,c){__send("[运行出错] "+m+" (第"+l+"行)")};' +
          '<\/script>' +
          '<script>\n' + code + '\n<\/script>' +
          '</body></html>';
        if (iframe) iframe.srcdoc = html;
        if (outEl && !outEl.textContent) {
          setTimeout(function () {
            if (!outEl.textContent.trim()) outEl.innerHTML = '<span class="text-3">运行完毕（没有 console.log 输出）。如果代码操作了 DOM，看预览区 ↓</span>';
          }, 600);
        }
      }

      function runSQL(code) {
        if (outEl) { outEl.innerHTML = '<span class="text-3"><i class="fa-solid fa-spinner fa-spin"></i> 正在加载 SQL 引擎并执行…</span>'; outEl.classList.remove('err'); }
        getSQL().then(function (SQL) {
          var db = new SQL.Database();
          try {
            var results = db.exec(code);
            db.close();
            if (!results.length) {
              outEl.innerHTML = '<span class="text-3">✓ 执行成功（没有返回结果集，比如建表/插入/更新/删除语句）</span>';
              return;
            }
            var html = '';
            results.forEach(function (r) {
              html += '<div style="overflow-x:auto;margin-bottom:10px"><table class="pit-table"><thead><tr>';
              r.columns.forEach(function (c) { html += '<th>' + FYUtil.escapeHtml(c) + '</th>'; });
              html += '</tr></thead><tbody>';
              r.values.forEach(function (row) {
                html += '<tr>';
                row.forEach(function (cell) { html += '<td>' + FYUtil.escapeHtml(cell == null ? 'NULL' : cell) + '</td>'; });
                html += '</tr>';
              });
              html += '</tbody></table></div>';
            });
            outEl.innerHTML = html;
          } catch (e) {
            outEl.classList.add('err');
            outEl.textContent = translateError('sql', e.message || e);
          }
        }).catch(function (e) {
          outEl.classList.add('err');
          outEl.textContent = translateError('sql', e.message || e);
        });
      }

      wrap.querySelector('[data-act="run"]').addEventListener('click', run);
      wrap.querySelector('[data-act="reset"]').addEventListener('click', function () {
        ta.value = lesson.editorCode || '';
        save();
        toast('已重置为示例代码');
      });
      wrap.querySelector('[data-act="clear"]').addEventListener('click', function () {
        ta.value = '';
        save();
        if (outEl) outEl.innerHTML = '<span class="text-3">已清空</span>';
        if (iframe) iframe.srcdoc = '';
        toast('已清空');
      });
      wrap.querySelector('[data-act="copy"]').addEventListener('click', function () {
        var text = ta.value;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { toast('代码已复制'); }).catch(function () { fallbackCopy(text); });
        } else { fallbackCopy(text); }
      });
      function fallbackCopy(text) {
        var ta2 = document.createElement('textarea');
        ta2.value = text; ta2.style.position = 'fixed'; ta2.style.opacity = '0';
        document.body.appendChild(ta2); ta2.select();
        try { document.execCommand('copy'); toast('代码已复制'); } catch (e) { toast('复制失败，手动选'); }
        document.body.removeChild(ta2);
      }

      return { run: run };
    }
  };

  global.FYEditor = FYEditor;
})(window);
