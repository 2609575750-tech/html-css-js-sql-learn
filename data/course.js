/* ============================================================
   course.js — 课程数据（4 门 18 课，每课 6 板块）
   lang: html / css / js / sql —— 决定编辑器用哪个引擎
   ============================================================ */
var COURSE_DATA = {
  categories: [
    {
      id: 'html', title: 'HTML 基础', icon: 'fa-html5',
      lessons: [
        {
          id: 'html-structure', title: '标签与页面结构', lang: 'html',
          intro: 'HTML 就是网页的骨架。你看到的每个网页，底层都是一堆「标签」按结构拼起来的。标签像括号一样成对出现，把内容包起来告诉浏览器「这是标题、这是段落、这是图片」。',
          breakdown: [
            { code: '<h1>大标题</h1>', explain: 'h1 是一级标题，字号最大。h2、h3 依次变小，用来分层次。' },
            { code: '<p>这是一段文字</p>', explain: 'p 是段落 paragraph，一块文字就放一个 p 里。' },
            { code: '<div>容器</div>', explain: 'div 是个盒子，本身没样式，专门用来把东西分组、布局。' }
          ],
          cases: [
            { title: '最小可用页面', explain: '一个网页最基本的结构：文档声明 + html + head + body。', code: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>我的网页</title>\n</head>\n<body>\n  <h1>你好，HTML</h1>\n  <p>这是我的第一个网页。</p>\n</body>\n</html>' },
            { title: '用 div 分块', explain: '把页面分成头部、内容、底部三块。', code: '<div style="background:#eee;padding:10px">头部</div>\n<div style="padding:10px">主要内容在这里</div>\n<div style="background:#eee;padding:10px">底部</div>' }
          ],
          editorCode: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>练习</title>\n</head>\n<body>\n  <h1>把这里改成你的标题</h1>\n  <p>写一段自我介绍。</p>\n  <div>这里放点别的</div>\n</body>\n</html>',
          pitfalls: [
            { wrong: '<h1>标题', right: '<h1>标题</h1>', note: '标签必须闭合，少了结尾标签会乱版。' },
            { wrong: '<H1>标题</H1>', right: '<h1>标题</h1>', note: '标签用小写，大写虽能跑但不规范。' }
          ],
          exercises: [
            { q: '写一个页面，包含一个 h1 标题和两个 p 段落。', hint: 'h1 和 p 都是成对标签。' },
            { q: 'div 标签有什么用？', hint: '它本身没样式，是个「盒子」。' }
          ]
        },
        {
          id: 'html-text-link', title: '文本与链接', lang: 'html',
          intro: '网页里不光有大段文字，还有链接、加粗、换行这些。链接 a 是跳转用的，点击就跳到别的页面。strong/em 用来强调文字。',
          breakdown: [
            { code: '<a href="https://baidu.com">点我去百度</a>', explain: 'a 是链接，href 填目标网址，中间是显示文字。' },
            { code: '<strong>重要</strong> <em>斜体</em>', explain: 'strong 加粗表示重要，em 斜体表示强调。' },
            { code: '第一行<br>第二行', explain: 'br 是换行，单独一个标签不用闭合。' }
          ],
          cases: [
            { title: '做几个链接', explain: '外部链接 + 内部锚点跳转。', code: '<a href="https://github.com">GitHub</a><br>\n<a href="mailto:abc@xx.com">发邮件</a><br>\n<a href="#bottom">跳到底部</a>' },
            { title: '列表', explain: '无序列表 ul + li，有序列表 ol + li。', code: '<ul>\n  <li>苹果</li>\n  <li>香蕉</li>\n</ul>\n<ol>\n  <li>第一步</li>\n  <li>第二步</li>\n</ol>' }
          ],
          editorCode: '<h2>我的链接</h2>\n<a href="https://baidu.com">百度</a><br>\n<a href="https://github.com">GitHub</a>\n\n<h2>我喜欢的水果</h2>\n<ul>\n  <li>?</li>\n  <li>?</li>\n</ul>',
          pitfalls: [
            { wrong: '<a>百度</a>', right: '<a href="https://baidu.com">百度</a>', note: 'a 必须有 href 才能跳转，不然就是个普通文字。' },
            { wrong: '用 <b> 代替 <strong>', right: '<strong>', note: 'b 只是视觉加粗，strong 有语义，对 SEO 和读屏更友好。' }
          ],
          exercises: [
            { q: '做一个链接，点击后跳到 github.com。', hint: 'href 填完整网址 https://。' },
            { q: '有序列表和无序列表标签分别是什么？', hint: 'ol 和 ul。' }
          ]
        },
        {
          id: 'html-media', title: '图片与多媒体', lang: 'html',
          intro: '网页不能只有文字。img 标签插图片，video 插视频，audio 插音频。图片要给 alt 属性，加载失败或读屏时用得上。',
          breakdown: [
            { code: '<img src="图片地址" alt="描述">', explain: 'img 插图，src 是图片地址，alt 是替代文字。img 不用闭合。' },
            { code: '<video src="视频" controls></video>', explain: 'video 插视频，controls 显示播放按钮。' },
            { code: '<img src="x.jpg" width="200">', explain: 'width 控制宽度，高度会自动等比缩放。' }
          ],
          cases: [
            { title: '插一张网络图片', explain: '用网上的图片地址。', code: '<img src="https://via.placeholder.com/300" alt="占位图" width="300">' },
            { title: '图片加链接', explain: '把 img 套在 a 里，点图跳转。', code: '<a href="https://github.com">\n  <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="80" alt="GitHub">\n</a>' }
          ],
          editorCode: '<h2>图片展示</h2>\n<img src="https://via.placeholder.com/200" alt="示例图" width="200">\n\n<h2>带链接的图</h2>\n<a href="https://github.com">\n  <img src="https://via.placeholder.com/100" alt="点我" width="100">\n</a>',
          pitfalls: [
            { wrong: '<img src="x.jpg">', right: '<img src="x.jpg" alt="一只猫">', note: 'alt 必须写，读屏、加载失败、SEO 都靠它。' },
            { wrong: '用本地绝对路径 /img/x.png', right: '用相对路径 img/x.png', note: '上线后绝对路径容易 404，用相对路径更稳。' }
          ],
          exercises: [
            { q: '插一张图片，宽度 300，alt 写「风景」。', hint: 'img 标签加 width 和 alt 属性。' },
            { q: '为什么 img 要写 alt？', hint: '想想图片加载失败时显示什么。' }
          ]
        },
        {
          id: 'html-form', title: '表单', lang: 'html',
          intro: '表单是用户输入数据的地方：登录框、搜索框、注册页都是表单。input 是输入框，有不同 type：文字、密码、单选、复选等。',
          breakdown: [
            { code: '<input type="text" placeholder="请输入">', explain: '文字输入框，placeholder 是灰色提示。' },
            { code: '<input type="password">', explain: '密码框，输入显示圆点。' },
            { code: '<input type="radio" name="sex">男', explain: '单选框，name 相同的为一组只能选一个。' },
            { code: '<button>提交</button>', explain: '按钮，点一下能触发动作。' }
          ],
          cases: [
            { title: '登录表单', explain: '账号 + 密码 + 提交按钮。', code: '<form>\n  <input type="text" placeholder="账号"><br>\n  <input type="password" placeholder="密码"><br>\n  <button type="button">登录</button>\n</form>' },
            { title: '单选与复选', explain: 'radio 单选，checkbox 多选。', code: '<p>性别：</p>\n<input type="radio" name="s" checked>男\n<input type="radio" name="s">女\n<p>爱好：</p>\n<input type="checkbox">看书\n<input type="checkbox">打球' }
          ],
          editorCode: '<h2>注册表单</h2>\n<form>\n  <input type="text" placeholder="昵称"><br><br>\n  <input type="password" placeholder="密码"><br><br>\n  <input type="radio" name="s">男\n  <input type="radio" name="s">女<br><br>\n  <button type="button">注册</button>\n</form>',
          pitfalls: [
            { wrong: '多个 radio name 不同', right: '同一组 radio 用相同 name', note: 'name 不同就能多选了，不是单选。' },
            { wrong: '<input> 不写 type', right: '<input type="text">', note: '不写 type 默认是 text，但显式写更清晰。' }
          ],
          exercises: [
            { q: '做一个搜索框 + 搜索按钮。', hint: 'input type="text" + button。' },
            { q: '怎么让三个选项只能选一个？', hint: '用 radio 且 name 相同。' }
          ]
        },
        {
          id: 'html-semantic', title: '语义化标签', lang: 'html',
          intro: 'div 啥都能装但不表达含义。语义化标签如 header/nav/main/footer，让浏览器和读屏软件明白每块是什么，也对 SEO 友好。效果上跟 div 一样，但含义更清楚。',
          breakdown: [
            { code: '<header>顶部</header>', explain: 'header 表示页头，通常放 logo、导航。' },
            { code: '<nav>导航</nav>', explain: 'nav 表示导航链接区。' },
            { code: '<main>主体</main>', explain: 'main 表示页面主要内容，一个页面只有一个。' },
            { code: '<footer>底部</footer>', explain: 'footer 表示页脚，放版权、链接。' }
          ],
          cases: [
            { title: '语义化页面骨架', explain: '用语义标签搭结构，比一堆 div 清楚。', code: '<header>\n  <h1>我的博客</h1>\n  <nav>首页 | 文章 | 关于</nav>\n</header>\n<main>\n  <article>\n    <h2>第一篇</h2>\n    <p>正文内容……</p>\n  </article>\n</main>\n<footer>© 2026 我</footer>' }
          ],
          editorCode: '<header>\n  <h1>网站名</h1>\n  <nav>首页 | 文章 | 关于</nav>\n</header>\n<main>\n  <p>主要内容写这里</p>\n</main>\n<footer>© 2026</footer>',
          pitfalls: [
            { wrong: '全用 div', right: '该用 header/nav/main 就用', note: 'div 不表达含义，语义标签利于 SEO 和无障碍。' },
            { wrong: '多个 <main>', right: '一个页面一个 <main>', note: 'main 表示主内容，唯一。' }
          ],
          exercises: [
            { q: '把一个全是 div 的页面改成语义化结构。', hint: '顶部用 header，导航用 nav，主体用 main。' },
            { q: '语义化标签有什么好处？', hint: '想想 SEO 和读屏软件。' }
          ]
        }
      ]
    },
    {
      id: 'css', title: 'CSS 基础', icon: 'fa-css3-alt',
      lessons: [
        {
          id: 'css-selector-box', title: '选择器与盒模型', lang: 'css',
          intro: 'CSS 控制网页长什么样。选择器决定「改谁」，属性决定「改成啥」。盒模型是说每个元素都是一个盒子：内容 + 内边距 padding + 边框 border + 外边距 margin。',
          breakdown: [
            { code: 'p { color: red; }', explain: '标签选择器，所有 p 变红色。' },
            { code: '.box { }  #main { }', explain: '. 是类选择器，# 是 id 选择器。类可重复用，id 唯一。' },
            { code: 'padding: 10px;\nborder: 1px solid #ccc;\nmargin: 20px;', explain: '内边距、边框、外边距，盒模型三件套。' }
          ],
          cases: [
            { title: '给盒子加边框和间距', explain: '看 padding 和 margin 的区别。', code: '<style>\n  .box {\n    padding: 20px;\n    border: 2px solid #3D7EFF;\n    margin: 30px;\n    background: #EAF1FF;\n  }\n</style>\n<div class="box">我是一个盒子</div>\n<div class="box">我是另一个</div>' },
            { title: '类选择器复用', explain: '一个类能给多个元素用。', code: '<style>\n  .red { color: red; }\n  .big { font-size: 24px; }\n</style>\n<p class="red">红色文字</p>\n<p class="red big">红色加大</p>' }
          ],
          editorCode: '<style>\n  .card {\n    padding: 20px;\n    border: 1px solid #ddd;\n    margin: 10px;\n    border-radius: 8px;\n  }\n</style>\n<div class="card">改改我的样式</div>',
          pitfalls: [
            { wrong: 'margin 和 padding 分不清', right: 'padding 是内边距，margin 是外边距', note: 'padding 撑大盒子内部，margin 推开别的元素。' },
            { wrong: 'id 重复用', right: 'id 唯一，复用用 class', note: '一个页面同名 id 只能一个。' }
          ],
          exercises: [
            { q: '给一个 div 设置 padding 20px、border 1px 实线灰色。', hint: 'padding + border 属性。' },
            { q: '类选择器和 id 选择器符号分别是？', hint: '点和井号。' }
          ]
        },
        {
          id: 'css-text-color', title: '文本、颜色、背景', lang: 'css',
          intro: '文字大小、颜色、行高、背景色背景图，这些是最常用的样式。颜色可以用十六进制 #3D7EFF、rgb、或颜色名 red。',
          breakdown: [
            { code: 'color: #3D7EFF;', explain: '文字颜色，十六进制最常用。' },
            { code: 'font-size: 16px;\nline-height: 1.6;', explain: '字号和行高，行高 1.6 阅读舒服。' },
            { code: 'background: #EAF1FF;', explain: '背景色。也能加图片 background-image。' },
            { code: 'text-align: center;', explain: '文字对齐：left/center/right。' }
          ],
          cases: [
            { title: '彩色卡片', explain: '背景色 + 文字色 + 圆角。', code: '<style>\n  .tip {\n    background: #EAF1FF;\n    color: #3D7EFF;\n    padding: 14px;\n    border-radius: 8px;\n    font-size: 15px;\n  }\n</style>\n<div class="tip">这是一条提示</div>' },
            { title: '文字居中与加粗', explain: 'text-align 和 font-weight。', code: '<style>\n  h2 { text-align: center; }\n  .bold { font-weight: 700; }\n</style>\n<h2>居中标题</h2>\n<p class="bold">加粗文字</p>' }
          ],
          editorCode: '<style>\n  body { font-size: 16px; line-height: 1.6; }\n  .title { color: #3D7EFF; text-align: center; }\n  .box { background: #f5f5f5; padding: 20px; border-radius: 10px; }\n</style>\n<h2 class="title">标题</h2>\n<div class="box">改改颜色和背景</div>',
          pitfalls: [
            { wrong: 'color 和 background 混淆', right: 'color 是文字色，background 是背景', note: 'color 改字的颜色，background 改背景。' },
            { wrong: '字号不设，默认太小', right: '显式设 font-size: 16px', note: '浏览器默认字号偏小，显式设置更可控。' }
          ],
          exercises: [
            { q: '做一个蓝底白字的提示框。', hint: 'background 蓝 + color 白。' },
            { q: '让标题文字居中。', hint: 'text-align: center。' }
          ]
        },
        {
          id: 'css-layout', title: '布局 flex 与 grid', lang: 'css',
          intro: '把元素摆到想要的位置，靠布局。flex 是一维布局（一行或一列），最常用；grid 是二维布局（行列网格），适合复杂结构。',
          breakdown: [
            { code: 'display: flex;', explain: '开启 flex 布局，子元素默认横向排列。' },
            { code: 'justify-content: center;\nalign-items: center;', explain: 'justify 控制主轴对齐，align 控制交叉轴对齐。' },
            { code: 'display: grid;\ngrid-template-columns: 1fr 1fr;', explain: 'grid 开网格，1fr 1fr 是两等宽列。' }
          ],
          cases: [
            { title: 'flex 横向排列', explain: '三个盒子横向排，间距均匀。', code: '<style>\n  .row { display: flex; gap: 10px; }\n  .row > div { flex: 1; padding: 20px; background: #EAF1FF; text-align: center; border-radius: 6px; }\n</style>\n<div class="row">\n  <div>一</div><div>二</div><div>三</div>\n</div>' },
            { title: 'grid 两列', explain: '网格布局做卡片墙。', code: '<style>\n  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }\n  .grid > div { padding: 20px; background: #f5f5f5; border-radius: 6px; }\n</style>\n<div class="grid">\n  <div>卡片1</div><div>卡片2</div>\n  <div>卡片3</div><div>卡片4</div>\n</div>' },
            { title: '垂直水平居中', explain: 'flex 最经典的用法。', code: '<style>\n  .center { display: flex; justify-content: center; align-items: center; height: 120px; background: #EAF1FF; border-radius: 8px; }\n</style>\n<div class="center"><span>我在正中间</span></div>' }
          ],
          editorCode: '<style>\n  .row { display: flex; gap: 10px; }\n  .row > div { flex: 1; padding: 20px; background: #EAF1FF; border-radius: 6px; text-align: center; }\n</style>\n<div class="row">\n  <div>左</div>\n  <div>中</div>\n  <div>右</div>\n</div>',
          pitfalls: [
            { wrong: '用 float 布局', right: '用 flex/grid', note: 'float 是老办法，现在都用 flex/grid，简单太多。' },
            { wrong: 'flex 不生效', right: '确认 display:flex 设在父元素', note: 'flex 属性加在父级，控制的是子元素排列。' }
          ],
          exercises: [
            { q: '让一个元素在容器里水平垂直居中。', hint: '父元素 display:flex + justify/align center。' },
            { q: '用 grid 做一个三列等宽布局。', hint: 'grid-template-columns: 1fr 1fr 1fr。' }
          ]
        },
        {
          id: 'css-responsive', title: '响应式与媒体查询', lang: 'css',
          intro: '手机、平板、电脑屏幕宽度不一样，网页要能自适应。媒体查询 @media 让你按屏幕宽度切换样式，比如手机单列、电脑双列。',
          breakdown: [
            { code: '@media (max-width: 768px) { }', explain: '屏幕 ≤768px（手机）时里面的样式生效。' },
            { code: 'width: 100%; max-width: 600px;', explain: '宽度撑满但不超过 600，是响应式常用写法。' },
            { code: '<meta name="viewport" content="width=device-width, initial-scale=1">', explain: 'head 里加这个，手机才不会缩放整个页面。' }
          ],
          cases: [
            { title: '手机变单列', explain: '电脑两列，手机一列。', code: '<style>\n  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }\n  .grid > div { padding: 20px; background: #EAF1FF; border-radius: 6px; }\n  @media (max-width: 600px) {\n    .grid { grid-template-columns: 1fr; }\n  }\n</style>\n<div class="grid">\n  <div>1</div><div>2</div>\n  <div>3</div><div>4</div>\n</div>\n<p style="font-size:12px;color:#888">缩小窗口看效果</p>' },
            { title: '字号自适应', explain: '用 rem 或 vw 单位。', code: '<style>\n  h2 { font-size: 5vw; }\n  p { font-size: 2vw; }\n</style>\n<h2>标题会随窗口变</h2>\n<p>文字也跟着变</p>' }
          ],
          editorCode: '<style>\n  .box { padding: 20px; background: #EAF1FF; border-radius: 8px; }\n  @media (max-width: 600px) {\n    .box { background: #FFEAEA; }\n  }\n</style>\n<div class="box">缩小窗口我的颜色会变</div>\n<p style="font-size:12px;color:#888">把预览窗口拉窄试试</p>',
          pitfalls: [
            { wrong: '忘写 viewport meta', right: 'head 加 viewport meta', note: '不加的话手机会显示电脑版缩略图，白做响应式。' },
            { wrong: '固定宽度 width: 1200px', right: '用 max-width 或百分比', note: '固定宽度在手机会超出屏幕。' }
          ],
          exercises: [
            { q: '写一个媒体查询，屏幕小于 480px 时背景变红。', hint: '@media (max-width: 480px)。' },
            { q: '为什么手机页面要加 viewport meta？', hint: '不加手机会缩放整个页面。' }
          ]
        },
        {
          id: 'css-animation', title: '动画与过渡', lang: 'css',
          intro: 'hover 时颜色渐变、按钮放大、元素淡入，这些动效让页面活起来。transition 过渡是状态变化的平滑动画，animation 是更复杂的自动动画。',
          breakdown: [
            { code: 'transition: all 0.3s;', explain: '所有属性变化用 0.3 秒过渡，hover 时平滑变化。' },
            { code: '.btn:hover { background: red; }', explain: ':hover 是鼠标悬停状态，配合 transition 做动效。' },
            { code: '@keyframes fade { from{opacity:0} to{opacity:1} }', explain: '定义关键帧动画，配合 animation 使用。' }
          ],
          cases: [
            { title: 'hover 按钮', explain: '鼠标移上去颜色渐变。', code: '<style>\n  .btn { padding: 12px 24px; background: #3D7EFF; color: #fff; border: none; border-radius: 8px; cursor: pointer; transition: all 0.3s; }\n  .btn:hover { background: #185FA5; transform: translateY(-2px); }\n</style>\n<button class="btn">鼠标移上来</button>' },
            { title: '淡入动画', explain: '页面打开时元素淡入。', code: '<style>\n  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }\n  .fade { animation: fadeIn 0.6s ease; padding: 20px; background: #EAF1FF; border-radius: 8px; }\n</style>\n<div class="fade">我会淡入出现</div>' }
          ],
          editorCode: '<style>\n  .btn {\n    padding: 12px 24px;\n    background: #3D7EFF;\n    color: #fff;\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: all 0.3s;\n  }\n  .btn:hover {\n    background: #185FA5;\n    transform: scale(1.05);\n  }\n</style>\n<button class="btn">悬停试试</button>',
          pitfalls: [
            { wrong: 'hover 没加 transition', right: '加 transition 才平滑', note: '不加 transition 会瞬间跳变，生硬。' },
            { wrong: '动画用 display 切换', right: '用 opacity 或 transform', note: 'display:none 无法过渡，动效会失效。' }
          ],
          exercises: [
            { q: '做一个按钮，hover 时放大 1.1 倍。', hint: 'transform: scale(1.1) + transition。' },
            { q: 'transition 和 animation 区别？', hint: 'transition 是状态触发，animation 是自动播放。' }
          ]
        }
      ]
    },
    {
      id: 'js', title: 'JavaScript 基础', icon: 'fa-js',
      lessons: [
        {
          id: 'js-variable', title: '变量与数据类型', lang: 'js',
          intro: '变量就是装数据的盒子。let 声明能改的变量，const 声明不能改的。数据类型有数字、字符串、布尔、数组、对象等。',
          breakdown: [
            { code: 'let age = 18;\nconst name = "小明";', explain: 'let 能改，const 不能改。变量名用英文。' },
            { code: 'let s = "hello";\nlet n = 123;\nlet b = true;', explain: '字符串、数字、布尔三种基本类型。' },
            { code: 'let arr = [1, 2, 3];\nlet obj = { name: "小明", age: 18 };', explain: '数组用方括号，对象用花括号存键值对。' }
          ],
          cases: [
            { title: '打印变量', explain: 'console.log 在控制台输出，调试最常用。', code: 'let name = "小明";\nlet age = 18;\nconsole.log("我叫" + name);\nconsole.log("今年" + age + "岁");' },
            { title: '数组与对象', explain: '存一组数据用数组，存实体用对象。', code: 'let fruits = ["苹果", "香蕉", "橘子"];\nconsole.log(fruits[0]);\nconsole.log(fruits.length);\n\nlet person = { name: "小明", age: 18 };\nconsole.log(person.name);' }
          ],
          editorCode: 'let name = "小明";\nlet age = 18;\nlet hobbies = ["看书", "打球"];\n\nconsole.log("姓名：" + name);\nconsole.log("年龄：" + age);\nconsole.log("爱好：" + hobbies.length + "个");',
          pitfalls: [
            { wrong: 'name = "小明" 不声明', right: 'let name = "小明"', note: '不写 let 会变全局变量，严格模式报错。' },
            { wrong: '用 const 又重新赋值', right: '要改的用 let', note: 'const 声明的变量重新赋值会报错。' }
          ],
          exercises: [
            { q: '声明一个变量存你的名字，并打印出来。', hint: 'let + console.log。' },
            { q: 'let 和 const 区别？', hint: '能不能重新赋值。' }
          ]
        },
        {
          id: 'js-condition-loop', title: '条件与循环', lang: 'js',
          intro: '条件 if 让程序能判断，循环 for/while 让程序能重复做事。这是让程序「会思考、会干活」的基础。',
          breakdown: [
            { code: 'if (age >= 18) { console.log("成年"); }', explain: 'if 条件成立才执行大括号里的。' },
            { code: 'if (a) {} else if (b) {} else {}', explain: '多分支判断，else 兜底。' },
            { code: 'for (let i = 0; i < 5; i++) { }', explain: 'for 循环，i 从 0 到 4 跑 5 次。' }
          ],
          cases: [
            { title: '判断成绩等级', explain: 'if/else if 链。', code: 'let score = 85;\nif (score >= 90) {\n  console.log("优秀");\n} else if (score >= 60) {\n  console.log("及格");\n} else {\n  console.log("不及格");\n}' },
            { title: '循环求和', explain: '用 for 累加 1 到 10。', code: 'let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum = sum + i;\n}\nconsole.log("1到10的和是 " + sum);' },
            { title: '遍历数组', explain: 'for 遍历数组每个元素。', code: 'let fruits = ["苹果", "香蕉", "橘子"];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log("第" + (i+1) + "个：" + fruits[i]);\n}' }
          ],
          editorCode: 'let score = 75;\n\nif (score >= 90) {\n  console.log("优秀");\n} else if (score >= 60) {\n  console.log("及格");\n} else {\n  console.log("不及格");\n}\n\n// 试试循环\nfor (let i = 1; i <= 5; i++) {\n  console.log("第" + i + "次");\n}',
          pitfalls: [
            { wrong: 'if (a = 5)', right: 'if (a === 5)', note: '一个等号是赋值，三个等号才是比较。这是经典 bug。' },
            { wrong: 'for 循环 i <= arr.length', right: 'i < arr.length', note: '数组下标从 0 开始，<= 会越界。' }
          ],
          exercises: [
            { q: '判断一个数是奇数还是偶数并打印。', hint: '用 % 2 取余判断。' },
            { q: '用循环打印 1 到 10。', hint: 'for (let i=1; i<=10; i++)。' }
          ]
        },
        {
          id: 'js-function', title: '函数', lang: 'js',
          intro: '函数是把一段代码打包，起个名字，需要时调用。避免重复写一样的代码。参数是传给函数的数据，return 是函数返回的结果。',
          breakdown: [
            { code: 'function greet(name) { console.log("你好," + name); }', explain: '声明函数，name 是参数。' },
            { code: 'greet("小明");', explain: '调用函数，传入参数。' },
            { code: 'function add(a, b) { return a + b; }', explain: 'return 把结果返回出来给调用处用。' },
            { code: 'const add = (a, b) => a + b;', explain: '箭头函数，简写形式，现代写法常用。' }
          ],
          cases: [
            { title: '加法函数', explain: '传两个数返回和。', code: 'function add(a, b) {\n  return a + b;\n}\nlet result = add(3, 5);\nconsole.log("3 + 5 = " + result);' },
            { title: '计算数组平均值', explain: '函数处理数据并返回。', code: 'function avg(arr) {\n  let sum = 0;\n  for (let i = 0; i < arr.length; i++) {\n    sum += arr[i];\n  }\n  return sum / arr.length;\n}\nconsole.log("平均值：" + avg([80, 90, 100]));' }
          ],
          editorCode: 'function greet(name) {\n  console.log("你好，" + name + "！");\n}\n\nfunction add(a, b) {\n  return a + b;\n}\n\ngreet("小明");\nconsole.log("2 + 3 = " + add(2, 3));\n\n// 试试箭头函数\nconst square = x => x * x;\nconsole.log("4 的平方：" + square(4));',
          pitfalls: [
            { wrong: '函数忘了 return', right: '需要结果就 return', note: '没 return 的函数返回 undefined。' },
            { wrong: '调用前不声明', right: 'function 声明会提升，但 const 箭头函数不会', note: 'const fn = ()=>{} 必须先声明后调用。' }
          ],
          exercises: [
            { q: '写一个函数判断数字正负，返回「正/负/零」。', hint: 'if 判断 + return。' },
            { q: '箭头函数和普通函数怎么写？', hint: 'const f = () => {}。' }
          ]
        },
        {
          id: 'js-dom-event', title: 'DOM 操作与事件', lang: 'js',
          intro: 'DOM 就是网页元素在 JS 里的表示。JS 能改网页内容、样式，还能响应点击、输入等事件。这是让网页「动起来、能交互」的关键。',
          breakdown: [
            { code: 'document.getElementById("x")', explain: '按 id 找元素。' },
            { code: 'el.textContent = "新内容";', explain: '改元素的文字内容。' },
            { code: 'el.addEventListener("click", fn)', explain: '给元素绑事件，click 是点击。' }
          ],
          cases: [
            { title: '点击改文字', explain: '点按钮改标题。', code: '<h2 id="title">原标题</h2>\n<button id="btn">点我改</button>\n<script>\n  document.getElementById("btn").addEventListener("click", function() {\n    document.getElementById("title").textContent = "被改了！";\n  });\n<\/script>' },
            { title: '输入框实时显示', explain: '输入时把内容显示出来。', code: '<input id="inp" placeholder="输入文字">\n<p id="show"></p>\n<script>\n  document.getElementById("inp").addEventListener("input", function(e) {\n    document.getElementById("show").textContent = "你输入了：" + e.target.value;\n  });\n<\/script>' }
          ],
          editorCode: '<h2 id="title">点按钮试试</h2>\n<button id="btn">改变标题</button>\n<p id="count">点击次数：0</p>\n<script>\n  let n = 0;\n  document.getElementById("btn").addEventListener("click", function() {\n    n++;\n    document.getElementById("title").textContent = "被点了 " + n + " 次";\n    document.getElementById("count").textContent = "点击次数：" + n;\n  });\n<\/script>',
          pitfalls: [
            { wrong: 'script 在 head 里且直接操作 DOM', right: 'script 放 body 末尾或用 DOMContentLoaded', note: 'head 里 DOM 还没加载，找不到元素。' },
            { wrong: 'getElementById 写成 class 名', right: 'id 用 getElementById，class 用 querySelector', note: '两者选择器方法不同。' }
          ],
          exercises: [
            { q: '做一个按钮，点击后弹出一个文字。', hint: 'addEventListener("click", fn)。' },
            { q: '怎么在 JS 里改某个元素的文字？', hint: 'element.textContent = "..."。' }
          ]
        }
      ]
    },
    {
      id: 'sql', title: 'SQL 基础', icon: 'fa-database',
      lessons: [
        {
          id: 'sql-create-table', title: '建表与数据类型', lang: 'sql',
          intro: '数据库用表存数据，像 Excel 表格。建表要指定列名和类型：INTEGER 整数、TEXT 文字、REAL 小数。PRIMARY KEY 是主键，唯一标识每行。',
          breakdown: [
            { code: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER);', explain: '建表，列名 + 类型，主键唯一。' },
            { code: 'INSERT INTO 学生 VALUES (1, "小明", 18);', explain: '插入一行数据，按列顺序填。' },
            { code: 'INSERT INTO 学生 (姓名, 年龄) VALUES ("小红", 17);', explain: '指定列插入，主键自增可省略。' }
          ],
          cases: [
            { title: '建学生表并插入数据', explain: '建表 + 插几条记录。', code: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER, 班级 TEXT);\nINSERT INTO 学生 VALUES (1, "小明", 18, "一班");\nINSERT INTO 学生 VALUES (2, "小红", 17, "二班");\nINSERT INTO 学生 VALUES (3, "小刚", 18, "一班");\nSELECT * FROM 学生;' },
            { title: '查所有数据', explain: 'SELECT * 看表里全部内容。', code: 'SELECT * FROM 学生;' }
          ],
          editorCode: 'CREATE TABLE 学生 (\n  id INTEGER PRIMARY KEY,\n  姓名 TEXT,\n  年龄 INTEGER,\n  班级 TEXT\n);\n\nINSERT INTO 学生 VALUES (1, "小明", 18, "一班");\nINSERT INTO 学生 VALUES (2, "小红", 17, "二班");\nINSERT INTO 学生 VALUES (3, "小刚", 18, "一班");\n\nSELECT * FROM 学生;',
          pitfalls: [
            { wrong: '主键重复', right: '每行主键唯一', note: '主键重复会报 unique constraint 错误。' },
            { wrong: 'INSERT 列数不匹配', right: 'VALUES 数量要和列对应', note: '列数对不上会报错。' }
          ],
          exercises: [
            { q: '建一个商品表，含 id、名称、价格。', hint: 'CREATE TABLE + INTEGER/TEXT/REAL。' },
            { q: '主键的作用是什么？', hint: '唯一标识每行。' }
          ]
        },
        {
          id: 'sql-crud', title: '增删改查', lang: 'sql',
          intro: 'CRUD 是操作数据的四件事：Create 增 INSERT、Read 查 SELECT、Update 改 UPDATE、Delete 删 DELETE。这是 SQL 最核心的部分。',
          breakdown: [
            { code: 'INSERT INTO 学生 VALUES (4, "小丽", 19, "三班");', explain: '增：插入一条新数据。' },
            { code: 'SELECT * FROM 学生;', explain: '查：看所有数据，* 表示所有列。' },
            { code: 'UPDATE 学生 SET 年龄 = 19 WHERE 姓名 = "小明";', explain: '改：更新符合条件的行，WHERE 指定条件。' },
            { code: 'DELETE FROM 学生 WHERE id = 3;', explain: '删：删除符合条件的行。' }
          ],
          cases: [
            { title: '完整 CRUD 流程', explain: '建表后增查改删全套。', code: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER);\nINSERT INTO 学生 VALUES (1, "小明", 18);\nINSERT INTO 学生 VALUES (2, "小红", 17);\n\nUPDATE 学生 SET 年龄 = 19 WHERE 姓名 = "小明";\n\nDELETE FROM 学生 WHERE id = 2;\n\nSELECT * FROM 学生;' },
            { title: '忘记 WHERE 的后果', explain: 'UPDATE/DELETE 不加 WHERE 会改/删全部！', code: 'CREATE TABLE t (id INTEGER, v TEXT);\nINSERT INTO t VALUES (1, "a");\nINSERT INTO t VALUES (2, "b");\nDELETE FROM t;\nSELECT * FROM t;' }
          ],
          editorCode: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER, 班级 TEXT);\nINSERT INTO 学生 VALUES (1, "小明", 18, "一班");\nINSERT INTO 学生 VALUES (2, "小红", 17, "二班");\nINSERT INTO 学生 VALUES (3, "小刚", 18, "一班");\n\n-- 改：把小明的年龄改成 19\nUPDATE 学生 SET 年龄 = 19 WHERE 姓名 = "小明";\n\n-- 删：删掉 id 为 3 的\nDELETE FROM 学生 WHERE id = 3;\n\n-- 查：看结果\nSELECT * FROM 学生;',
          pitfalls: [
            { wrong: 'UPDATE 不加 WHERE', right: 'UPDATE 必须加 WHERE 条件', note: '不加 WHERE 会更新全表，很危险！' },
            { wrong: 'DELETE FROM 学生', right: 'DELETE FROM 学生 WHERE ...', note: '不加 WHERE 删全表，数据没了。' }
          ],
          exercises: [
            { q: '把所有学生的班级改成「三班」。', hint: 'UPDATE ... SET 班级="三班"。' },
            { q: '删除年龄小于 18 的学生。', hint: 'DELETE FROM ... WHERE 年龄 < 18。' }
          ]
        },
        {
          id: 'sql-query-sort', title: '条件查询与排序', lang: 'sql',
          intro: 'SELECT 能加条件筛数据：WHERE 过滤、ORDER BY 排序、LIMIT 限制条数。这是日常查询最常用的组合。',
          breakdown: [
            { code: 'SELECT * FROM 学生 WHERE 年龄 = 18;', explain: 'WHERE 筛选年龄等于 18 的。' },
            { code: 'SELECT * FROM 学生 WHERE 年龄 > 17 AND 班级 = "一班";', explain: 'AND 同时满足，OR 满足其一。' },
            { code: 'SELECT * FROM 学生 ORDER BY 年龄 DESC;', explain: 'ORDER BY 排序，DESC 降序，ASC 升序。' },
            { code: 'SELECT * FROM 学生 LIMIT 2;', explain: 'LIMIT 只取前 2 条。' }
          ],
          cases: [
            { title: '筛选与排序', explain: '找一班学生按年龄降序。', code: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER, 班级 TEXT);\nINSERT INTO 学生 VALUES (1, "小明", 18, "一班");\nINSERT INTO 学生 VALUES (2, "小红", 17, "二班");\nINSERT INTO 学生 VALUES (3, "小刚", 19, "一班");\nINSERT INTO 学生 VALUES (4, "小丽", 16, "一班");\n\nSELECT * FROM 学生 WHERE 班级 = "一班" ORDER BY 年龄 DESC;' },
            { title: '模糊查询', explain: 'LIKE 做模糊匹配，% 表示任意字符。', code: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT);\nINSERT INTO 学生 VALUES (1, "王小明");\nINSERT INTO 学生 VALUES (2, "李小红");\nINSERT INTO 学生 VALUES (3, "张小刚");\n\nSELECT * FROM 学生 WHERE 姓名 LIKE "%小%";' }
          ],
          editorCode: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER, 班级 TEXT);\nINSERT INTO 学生 VALUES (1, "小明", 18, "一班");\nINSERT INTO 学生 VALUES (2, "小红", 17, "二班");\nINSERT INTO 学生 VALUES (3, "小刚", 19, "一班");\nINSERT INTO 学生 VALUES (4, "小丽", 16, "一班");\n\n-- 查一班的，按年龄从小到大\nSELECT * FROM 学生 WHERE 班级 = "一班" ORDER BY 年龄 ASC;\n\n-- 只看前 2 条\nSELECT * FROM 学生 ORDER BY 年龄 DESC LIMIT 2;',
          pitfalls: [
            { wrong: 'WHERE 用 = 比较字符串不加引号', right: '字符串用单/双引号', note: 'WHERE 班级 = 一班 会报错，要 "一班"。' },
            { wrong: 'ORDER BY 写在 WHERE 前面', right: 'WHERE 在前 ORDER BY 在后', note: 'SQL 子句有固定顺序：WHERE → ORDER BY → LIMIT。' }
          ],
          exercises: [
            { q: '查年龄大于 17 且在一班的学生。', hint: 'WHERE 年龄 > 17 AND 班级 = "一班"。' },
            { q: '按年龄降序取前 3 条。', hint: 'ORDER BY 年龄 DESC LIMIT 3。' }
          ]
        },
        {
          id: 'sql-aggregate-join', title: '聚合与多表连接', lang: 'sql',
          intro: '聚合是统计：COUNT 计数、SUM 求和、AVG 平均、MAX/MIN 最值。GROUP BY 按组统计。JOIN 把多张表按关联字段拼一起查。',
          breakdown: [
            { code: 'SELECT COUNT(*) FROM 学生;', explain: 'COUNT 统计行数，* 表示所有行。' },
            { code: 'SELECT 班级, COUNT(*) FROM 学生 GROUP BY 班级;', explain: 'GROUP BY 按班级分组统计人数。' },
            { code: 'SELECT AVG(年龄) FROM 学生;', explain: 'AVG 求平均年龄。' },
            { code: 'SELECT * FROM 学生 JOIN 成绩 ON 学生.id = 成绩.学生id;', explain: 'JOIN 把两表按关联字段拼一起。' }
          ],
          cases: [
            { title: '分组统计', explain: '每个班多少人、平均年龄。', code: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER, 班级 TEXT);\nINSERT INTO 学生 VALUES (1, "小明", 18, "一班");\nINSERT INTO 学生 VALUES (2, "小红", 17, "二班");\nINSERT INTO 学生 VALUES (3, "小刚", 19, "一班");\nINSERT INTO 学生 VALUES (4, "小丽", 16, "一班");\n\nSELECT 班级, COUNT(*) AS 人数, AVG(年龄) AS 平均年龄 FROM 学生 GROUP BY 班级;' },
            { title: '两表连接', explain: '学生表 + 成绩表 JOIN 查每人分数。', code: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT);\nINSERT INTO 学生 VALUES (1, "小明");\nINSERT INTO 学生 VALUES (2, "小红");\n\nCREATE TABLE 成绩 (id INTEGER PRIMARY KEY, 学生id INTEGER, 科目 TEXT, 分数 INTEGER);\nINSERT INTO 成绩 VALUES (1, 1, "语文", 90);\nINSERT INTO 成绩 VALUES (2, 1, "数学", 85);\nINSERT INTO 成绩 VALUES (3, 2, "语文", 95);\n\nSELECT 学生.姓名, 成绩.科目, 成绩.分数\nFROM 学生 JOIN 成绩 ON 学生.id = 成绩.学生id;' }
          ],
          editorCode: 'CREATE TABLE 学生 (id INTEGER PRIMARY KEY, 姓名 TEXT, 年龄 INTEGER, 班级 TEXT);\nINSERT INTO 学生 VALUES (1, "小明", 18, "一班");\nINSERT INTO 学生 VALUES (2, "小红", 17, "二班");\nINSERT INTO 学生 VALUES (3, "小刚", 19, "一班");\nINSERT INTO 学生 VALUES (4, "小丽", 16, "一班");\n\n-- 每个班多少人、平均年龄\nSELECT 班级, COUNT(*) AS 人数, AVG(年龄) AS 平均年龄\nFROM 学生\nGROUP BY 班级;\n\n-- 总人数和最大年龄\nSELECT COUNT(*) AS 总人数, MAX(年龄) AS 最大年龄 FROM 学生;',
          pitfalls: [
            { wrong: 'GROUP BY 后 SELECT 随便取列', right: 'SELECT 的非聚合列要在 GROUP BY 里', note: '没分组的列不能直接 SELECT，会出错或结果乱。' },
            { wrong: 'JOIN 忘了 ON 条件', right: 'JOIN 必须写 ON 关联条件', note: '不写 ON 会产生笛卡尔积，行数爆炸。' }
          ],
          exercises: [
            { q: '统计每个班级的人数。', hint: 'GROUP BY 班级 + COUNT(*)。' },
            { q: 'JOIN 两表时 ON 的作用？', hint: '指定两表按哪个字段关联。' }
          ]
        }
      ]
    }
  ]
};
