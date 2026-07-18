/* ============================================================
   theme.js — 深浅双主题切换
   ============================================================ */
(function (global) {
  'use strict';

  var FYTheme = {
    init: function () {
      this.apply(FYStorage.getTheme());
    },
    apply: function (t) {
      document.documentElement.setAttribute('data-theme', t);
      var btn = document.getElementById('theme-toggle');
      if (btn) {
        var icon = btn.querySelector('i');
        if (icon) icon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    },
    toggle: function () {
      var now = FYStorage.getTheme();
      var next = now === 'dark' ? 'light' : 'dark';
      FYStorage.setTheme(next);
      this.apply(next);
    }
  };

  global.FYTheme = FYTheme;
})(window);
