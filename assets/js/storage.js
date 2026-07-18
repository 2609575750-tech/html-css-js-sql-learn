/* ============================================================
   storage.js — localStorage 缓存封装
   统一前缀 fylearn:、JSON 序列化、隐私模式降级到内存。
   ============================================================ */
(function (global) {
  'use strict';
  var PREFIX = 'fylearn:';

  var memFallback = {};
  var useLS = (function () {
    try {
      var k = PREFIX + '__test__';
      global.localStorage.setItem(k, '1');
      global.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  })();

  function rawGet(key) {
    if (useLS) return global.localStorage.getItem(PREFIX + key);
    return memFallback[key] != null ? memFallback[key] : null;
  }
  function rawSet(key, val) {
    if (useLS) global.localStorage.setItem(PREFIX + key, val);
    else memFallback[key] = val;
  }

  var FYStorage = {
    get: function (key, def) {
      var s = rawGet(key);
      if (s == null) return def;
      try { return JSON.parse(s); } catch (e) { return def; }
    },
    set: function (key, val) { rawSet(key, JSON.stringify(val)); },

    getTheme: function () { return rawGet('theme') || 'light'; },
    setTheme: function (t) { rawSet('theme', t); },

    getSidebarOpen: function () { return this.get('sidebarOpen', {}); },
    setSidebarOpen: function (map) { this.set('sidebarOpen', map); },

    getLastPage: function () { return rawGet('lastPage') || '#/'; },
    setLastPage: function (hash) { rawSet('lastPage', hash); },

    getEditorCode: function (lessonId, fallback) {
      var v = rawGet('editor:' + lessonId);
      return v == null ? fallback : v;
    },
    setEditorCode: function (lessonId, code) { rawSet('editor:' + lessonId, code); },

    getQuizRecords: function () { return this.get('quizRecords', {}); },
    setQuizRecord: function (lessonId, record) {
      var all = this.getQuizRecords();
      all[lessonId] = record;
      this.set('quizRecords', all);
    },
    isQuizDone: function (lessonId) {
      var all = this.getQuizRecords();
      return !!(all[lessonId] && all[lessonId].doneAt);
    },

    getProgress: function () { return this.get('progress', {}); },
    markVisited: function (lessonId) {
      var p = this.getProgress();
      p[lessonId] = true;
      this.set('progress', p);
    },

    getCertName: function () { return rawGet('certName') || ''; },
    setCertName: function (name) { rawSet('certName', name); }
  };

  global.FYStorage = FYStorage;
})(window);
