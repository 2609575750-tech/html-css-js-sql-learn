/* ============================================================
   search.js — 全局模糊搜索（含中文通俗词同义词匹配）
   FYSearch.search(q) 返回 [{id, title, categoryTitle}, ...]
   ============================================================ */
(function (global) {
  'use strict';

  var SYNONYMS = {
    '居中': ['center', 'align', 'flex', 'justify', '居中'],
    '颜色': ['color', 'background', '颜色', '背景'],
    '背景': ['background', '背景'],
    '布局': ['flex', 'grid', 'layout', '布局', '排列'],
    '链接': ['a href', 'link', '链接', '跳转'],
    '图片': ['img', 'src', 'image', '图片', '图像'],
    '视频': ['video', '视频'],
    '按钮': ['button', 'submit', '按钮'],
    '表单': ['form', 'input', 'radio', 'checkbox', '表单', '输入'],
    '输入框': ['input', '输入框'],
    '列表': ['ul', 'ol', 'li', '列表'],
    '标题': ['h1', 'h2', 'h3', 'title', '标题'],
    '动画': ['animation', 'transition', 'hover', '动画', '过渡', '动效'],
    '悬停': ['hover', '悬停', '鼠标'],
    '响应式': ['media', 'viewport', 'responsive', '响应式', '自适应', '手机'],
    '手机': ['media', 'viewport', 'mobile', '手机', '移动端'],
    '变量': ['let', 'const', 'var', '变量', '声明'],
    '字符串': ['string', 'text', '字符串'],
    '数组': ['array', '数组', 'arr'],
    '对象': ['object', '对象', 'obj'],
    '循环': ['for', 'while', 'loop', '循环', '遍历'],
    '遍历': ['for', 'foreach', '遍历', '循环'],
    '判断': ['if', 'else', 'condition', '判断', '条件'],
    '函数': ['function', 'return', 'arrow', '函数', '方法'],
    '箭头函数': ['arrow', '=>', '箭头函数'],
    '点击': ['click', 'addEventListener', '点击', '事件'],
    '事件': ['event', 'addEventListener', 'click', '事件', '监听'],
    'dom': ['dom', 'getElementById', 'querySelector', '元素'],
    '元素': ['element', 'dom', '元素'],
    '查询': ['select', 'where', 'query', '查询', '查找'],
    '排序': ['order by', 'sort', '排序', '降序', '升序'],
    '过滤': ['where', 'filter', '过滤', '筛选'],
    '建表': ['create table', 'insert', '建表', '创建表'],
    '插入': ['insert', '插入', '添加'],
    '更新': ['update', 'set', '更新', '修改'],
    '删除': ['delete', '删除', 'remove'],
    '增删改查': ['insert', 'update', 'delete', 'select', 'crud', '增删改查'],
    '主键': ['primary key', '主键', 'id'],
    '分组': ['group by', 'count', 'avg', '分组', '统计'],
    '统计': ['count', 'sum', 'avg', 'max', 'min', '统计', '聚合'],
    '平均': ['avg', '平均', '均值'],
    '连接': ['join', 'on', '连接', '关联'],
    '多表': ['join', '多表', '关联'],
    '语义': ['header', 'nav', 'main', 'footer', '语义', 'semantic'],
    '盒模型': ['padding', 'margin', 'border', 'box', '盒模型'],
    '边框': ['border', '边框'],
    '圆角': ['radius', '圆角']
  };

  var index = null;

  function buildIndex() {
    var data = global.COURSE_DATA;
    if (!data) return;
    index = [];
    data.categories.forEach(function (cat) {
      cat.lessons.forEach(function (ls) {
        var text = (ls.title + ' ' + (ls.intro || '') + ' ' +
          (ls.breakdown || []).map(function (b) { return b.code + ' ' + b.explain; }).join(' ') + ' ' +
          (ls.cases || []).map(function (c) { return c.title + ' ' + c.explain + ' ' + c.code; }).join(' ') + ' ' +
          (ls.editorCode || '') + ' ' +
          (ls.pitfalls || []).map(function (p) { return p.wrong + ' ' + p.right + ' ' + p.note; }).join(' ') + ' ' +
          (ls.exercises || []).map(function (e) { return e.q + ' ' + e.hint; }).join(' ')
        ).toLowerCase();
        index.push({ id: ls.id, title: ls.title, categoryTitle: cat.title, text: text, lang: ls.lang });
      });
    });
  }

  function expand(q) {
    var words = [q.toLowerCase()];
    Object.keys(SYNONYMS).forEach(function (key) {
      if (q.indexOf(key) >= 0) {
        SYNONYMS[key].forEach(function (w) { words.push(w.toLowerCase()); });
      }
    });
    return words;
  }

  function search(q) {
    if (!index) buildIndex();
    if (!index || !q) return [];
    var words = expand(q.trim());
    var hits = [];
    index.forEach(function (item) {
      var score = 0;
      words.forEach(function (w) {
        if (item.text.indexOf(w) >= 0) score++;
        if (item.title.toLowerCase().indexOf(w) >= 0) score += 3;
      });
      if (score > 0) hits.push({ id: item.id, title: item.title, categoryTitle: item.categoryTitle, score: score });
    });
    hits.sort(function (a, b) { return b.score - a.score; });
    return hits.slice(0, 10);
  }

  global.FYSearch = { SYNONYMS: SYNONYMS, buildIndex: buildIndex, search: search };
})(window);
