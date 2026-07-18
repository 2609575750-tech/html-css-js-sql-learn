/* ============================================================
   quiz.js — 章节选择题题库（18 课 × 3 题）
   answer 是正确选项的下标（0 起）
   ============================================================ */
var QUIZ_DATA = {
  'html-structure': [
    { q: '下面哪个标签写法是正确的？', options: ['<h1>标题', '<h1>标题</h1>', '<H1>标题</H1>', 'h1 标题 h1'], answer: 1, explain: '标签必须成对闭合，且推荐用小写。' },
    { q: 'div 标签的作用是？', options: ['插入图片', '做容器分组', '换行', '加粗文字'], answer: 1, explain: 'div 是个无样式盒子，用来分组和布局。' },
    { q: '一个网页必须有哪个声明？', options: ['<html>', '<!DOCTYPE html>', '<head>', '<body>'], answer: 1, explain: '文档声明 <!DOCTYPE html> 告诉浏览器用 HTML5。' }
  ],
  'html-text-link': [
    { q: '链接标签 a 必须有哪个属性才能跳转？', options: ['src', 'href', 'link', 'url'], answer: 1, explain: 'href 指定跳转目标，没有就是个普通文字。' },
    { q: '无序列表用哪个标签？', options: ['<ol>', '<ul>', '<li>', '<list>'], answer: 1, explain: 'ul 是无序列表，ol 是有序列表，li 是列表项。' },
    { q: '哪个标签表示重要（语义上加粗）？', options: ['<b>', '<strong>', '<bold>', '<i>'], answer: 1, explain: 'strong 有语义表示重要，b 只是视觉加粗。' }
  ],
  'html-media': [
    { q: 'img 标签的 alt 属性有什么用？', options: ['设置宽度', '图片替代文字', '设链接', '改颜色'], answer: 1, explain: 'alt 在图片加载失败或读屏时替代显示。' },
    { q: 'img 标签需要闭合吗？', options: ['需要 </img>', '不需要，自闭合', '必须有 </img>结束', '看情况'], answer: 1, explain: 'img 是自闭合标签，不需要 </img>。' },
    { q: '怎么让点击图片跳转到链接？', options: ['img 加 href', '把 img 放在 a 里', 'img 加 link 属性', '做不到'], answer: 1, explain: '用 a 包裹 img，点图即跳转。' }
  ],
  'html-form': [
    { q: '多个单选框 radio 要实现只能选一个，要怎么做？', options: ['给相同 id', '给相同 name', '给相同 class', '加 checked'], answer: 1, explain: 'name 相同的 radio 为一组，只能选一个。' },
    { q: '密码输入框用什么 type？', options: ['text', 'password', 'hidden', 'secret'], answer: 1, explain: 'type="password" 输入显示圆点。' },
    { q: 'input 不写 type 时默认是什么？', options: ['password', 'text', 'radio', 'button'], answer: 1, explain: '默认 type="text"，但建议显式写。' }
  ],
  'html-semantic': [
    { q: '语义化标签的主要好处是？', options: ['样式更好看', '利于 SEO 和无障碍', '加载更快', '代码更短'], answer: 1, explain: '语义标签让浏览器和读屏理解结构，利于 SEO。' },
    { q: '一个页面可以有几个 <main>？', options: ['1 个', '多个', '不限', '0 个'], answer: 0, explain: 'main 表示主内容，一个页面唯一。' },
    { q: '页脚应该用哪个标签？', options: ['<bottom>', '<footer>', '<end>', '<div class="foot">'], answer: 1, explain: 'footer 是语义化的页脚标签。' }
  ],
  'css-selector-box': [
    { q: '类选择器和 id 选择器的符号分别是？', options: ['. 和 #', '# 和 .', '* 和 .', '. 和 *'], answer: 0, explain: '类用 . id 用 #，类可复用 id 唯一。' },
    { q: 'padding 和 margin 的区别？', options: ['没区别', 'padding 内边距 margin 外边距', 'padding 外边距 margin 内边距', '都是边框'], answer: 1, explain: 'padding 撑大内部，margin 推开外部元素。' },
    { q: '下面哪个选择器优先级最高？', options: ['标签选择器', '类选择器', 'id 选择器', '通配符'], answer: 2, explain: 'id 选择器优先级高于类和标签。' }
  ],
  'css-text-color': [
    { q: '改文字颜色用哪个属性？', options: ['background', 'color', 'font-color', 'text-color'], answer: 1, explain: 'color 改文字色，background 改背景。' },
    { q: '让文字居中用？', options: ['text-align: center', 'align: center', 'center: true', 'margin: center'], answer: 0, explain: 'text-align: center 让文字水平居中。' },
    { q: '#3D7EFF 是什么颜色表示法？', options: ['RGB', '十六进制', 'HSL', '颜色名'], answer: 1, explain: '十六进制用 # 开头，最常用。' }
  ],
  'css-layout': [
    { q: 'flex 布局的 display 值设在哪？', options: ['子元素', '父元素', 'body', '不用设'], answer: 1, explain: 'display:flex 设在父元素，控制子元素排列。' },
    { q: '做两等宽列布局用 grid 怎么写？', options: ['grid-template-columns: 1fr 1fr', 'columns: 2', 'grid: 2', 'flex: 2'], answer: 0, explain: '1fr 1fr 表示两等宽列。' },
    { q: '让元素水平垂直居中最常用？', options: ['margin: auto', 'flex 的 justify+align center', 'position: absolute', 'float'], answer: 1, explain: '父元素 flex + justify-content/align-items center 最简单。' }
  ],
  'css-responsive': [
    { q: '媒体查询的语法是？', options: ['@if (max-width: 768px)', '@media (max-width: 768px)', '@screen 768px', '@responsive 768px'], answer: 1, explain: '@media (max-width: 768px) 是标准语法。' },
    { q: '手机端页面必须加什么 meta？', options: ['charset', 'viewport', 'description', 'keywords'], answer: 1, explain: 'viewport meta 让手机不缩放整个页面。' },
    { q: '响应式宽度推荐用？', options: ['固定 px', '百分比或 max-width', 'cm', 'pt'], answer: 1, explain: '百分比/max-width 能自适应屏幕。' }
  ],
  'css-animation': [
    { q: '让 hover 变化平滑要加什么？', options: ['animation', 'transition', 'transform', 'hover-only'], answer: 1, explain: 'transition 让属性变化平滑过渡。' },
    { q: ':hover 表示什么？', options: ['点击时', '鼠标悬停时', '加载时', '隐藏时'], answer: 1, explain: ':hover 是鼠标移上去的状态。' },
    { q: '做淡入动画不能直接用哪个属性切换？', options: ['opacity', 'display:none', 'transform', 'visibility:hidden'], answer: 1, explain: 'display:none 无法过渡，动画会失效。' }
  ],
  'js-variable': [
    { q: '声明一个能修改的变量用？', options: ['const', 'let', 'var only', 'static'], answer: 1, explain: 'let 声明可修改，const 不可重新赋值。' },
    { q: '[1,2,3] 是什么类型？', options: ['对象', '数组', '字符串', '数字'], answer: 1, explain: '方括号是数组，花括号是对象。' },
    { q: 'const 声明的变量能重新赋值吗？', options: ['能', '不能', '看情况', '报错但能跑'], answer: 1, explain: 'const 重新赋值会报错。' }
  ],
  'js-condition-loop': [
    { q: '判断相等应该用？', options: ['=', '==', '===', ':='], answer: 2, explain: '=== 严格相等，= 是赋值会出 bug。' },
    { q: 'for (let i=0; i<arr.length; i++) 里 i< 应该是？', options: ['<=', '<', '==', '>'], answer: 1, explain: '下标从 0 开始，< length 才不越界。' },
    { q: 'if (a = 5) 会有什么问题？', options: ['语法错', '变成赋值不是比较，恒为真', '没问题', '报错'], answer: 1, explain: '一个等号是赋值，是经典 bug。' }
  ],
  'js-function': [
    { q: '函数要返回结果给调用处用？', options: ['print', 'return', 'output', 'echo'], answer: 1, explain: 'return 把结果返回，没 return 返回 undefined。' },
    { q: '箭头函数怎么写？', options: ['function() => {}', '() => {}', '=> () {}', 'func => {}'], answer: 1, explain: 'const f = () => {} 是箭头函数。' },
    { q: '函数没写 return，返回什么？', options: ['null', 'undefined', '0', '报错'], answer: 1, explain: '没 return 的函数返回 undefined。' }
  ],
  'js-dom-event': [
    { q: '按 id 获取元素用？', options: ['getElementById', 'querySelectorAll', 'getByClass', 'find'], answer: 0, explain: 'getElementById("x") 按 id 找元素。' },
    { q: '给元素绑点击事件用？', options: ['onclick =', 'addEventListener("click", fn)', 'click(fn)', 'on("click")'], answer: 1, explain: 'addEventListener 是标准绑定方式。' },
    { q: 'script 操作 DOM 应该放在哪？', options: ['head 里', 'body 末尾', '随便', 'css 里'], answer: 1, explain: '放 body 末尾确保 DOM 已加载。' }
  ],
  'sql-create-table': [
    { q: '主键的作用是？', options: ['加速查询', '唯一标识每行', '存大文件', '排序'], answer: 1, explain: 'PRIMARY KEY 唯一标识每行，不能重复。' },
    { q: '存文字用哪种数据类型？', options: ['INTEGER', 'TEXT', 'REAL', 'BOOL'], answer: 1, explain: 'TEXT 存文字，INTEGER 存整数。' },
    { q: '主键重复插入会怎样？', options: ['覆盖', '报错 unique constraint', '忽略', '追加'], answer: 1, explain: '主键必须唯一，重复会报错。' }
  ],
  'sql-crud': [
    { q: 'UPDATE 不加 WHERE 会怎样？', options: ['报错', '更新全表', '不执行', '只更新第一条'], answer: 1, explain: '不加 WHERE 会更新所有行，很危险。' },
    { q: 'CRUD 里的 D 指？', options: ['Display', 'Delete', 'Drop', 'Data'], answer: 1, explain: 'CRUD = Create增/Read查/Update改/Delete删。' },
    { q: '删除所有数据但不删表用？', options: ['DROP TABLE', 'DELETE FROM 表', 'REMOVE', 'CLEAR'], answer: 1, explain: 'DELETE FROM 删数据，DROP TABLE 连表一起删。' }
  ],
  'sql-query-sort': [
    { q: 'SQL 子句的正确顺序是？', options: ['ORDER BY → WHERE → LIMIT', 'WHERE → ORDER BY → LIMIT', 'LIMIT → WHERE → ORDER BY', 'WHERE → LIMIT → ORDER BY'], answer: 1, explain: '标准顺序：WHERE 过滤 → ORDER BY 排序 → LIMIT 限制。' },
    { q: 'WHERE 班级 = 一班 会怎样？', options: ['正常', '报错，字符串要引号', '查全部', '查空'], answer: 1, explain: '字符串值要用引号 "一班" 或 一班。' },
    { q: '模糊查询用哪个关键字？', options: ['MATCH', 'LIKE', 'FIND', 'SEARCH'], answer: 1, explain: 'LIKE 配合 % 做模糊匹配。' }
  ],
  'sql-aggregate-join': [
    { q: 'GROUP BY 后 SELECT 非聚合列要？', options: ['随便取', '必须在 GROUP BY 里', '不能取', '加引号'], answer: 1, explain: '非聚合列必须出现在 GROUP BY 中。' },
    { q: 'JOIN 必须写什么？', options: ['WHERE', 'ON 关联条件', 'LIMIT', 'GROUP BY'], answer: 1, explain: 'ON 指定两表关联字段，不写会笛卡尔积。' },
    { q: '统计行数用哪个函数？', options: ['SUM', 'COUNT', 'TOTAL', 'AVG'], answer: 1, explain: 'COUNT(*) 统计行数。' }
  ]
};
