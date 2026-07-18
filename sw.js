/* ============================================================
   sw.js — 离线缓存（Service Worker）
   作用：首次联网访问后，把应用壳 + 关键 CDN 缓存下来，
        之后断网也能打开（不联网也能用）。
   策略：
     - 同源 GET（index.html / js / css / data / 图片）：network-first，
       联网拿最新，失败回退缓存；断网直接用缓存。
     - 跨域 GET（Tailwind / Font Awesome / sql.js）：stale-while-revalidate，
       先给缓存，后台静默更新；断网用缓存。
   ============================================================ */
const CACHE = 'fylearn-cache-v1';

// 应用壳：本地文件（相对 SW 所在目录，即仓库根）
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/css/theme.css',
  './assets/css/app.css',
  './assets/js/app.js',
  './assets/js/router.js',
  './assets/js/storage.js',
  './assets/js/theme.js',
  './components/nav.js',
  './components/sidebar.js',
  './components/editor.js',
  './components/exam-modal.js',
  './data/course.js',
  './data/quiz.js',
  './data/search.js',
  './pages/home.js',
  './pages/lesson.js',
  './pages/quiz.js',
  './pages/certificate.js',
  './pages/notfound.js',
  './assets/images/apple-touch-icon.png',
  './assets/images/favicon.svg',
];

// 关键 CDN（断网也要能跑）
const CDN = [
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js',
  'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.wasm',
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 有新版本立刻激活
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // 应用壳：逐个缓存，单个失败不影响整体
    await Promise.all(APP_SHELL.map((u) => cache.add(u).catch(() => {})));

    // Tailwind Play CDN：不发 CORS 头，用 no-cors 拿 opaque 响应（可缓存、可服务脚本）
    try {
      const r = await fetch(CDN[0], { mode: 'no-cors' });
      if (r && r.type !== 'error') await cache.put(CDN[0], r.clone());
    } catch (_) {}

    // sql.js：js + wasm（no-cors 即可缓存）
    for (const u of [CDN[2], CDN[3]]) {
      try {
        const r = await fetch(u, { mode: 'no-cors' });
        if (r && r.type !== 'error') await cache.put(u, r.clone());
      } catch (_) {}
    }

    // Font Awesome：css 用 cors 读取文本（解析字体路径），再 no-cors 缓存字体文件
    try {
      const cssUrl = CDN[1];
      const res = await fetch(cssUrl, { mode: 'cors' });
      if (res && res.type !== 'error') await cache.put(cssUrl, res.clone());
      const text = await res.text();
      const fontUrls = [...text.matchAll(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g)]
        .map((m) => m[2])
        .filter((u) => !u.startsWith('data:'))
        .filter((u) => /\.(woff2?|ttf|svg|eot)$/i.test(u))
        .map((u) => { try { return new URL(u, cssUrl).href; } catch (_) { return null; } })
        .filter(Boolean);
      for (const f of fontUrls) {
        try {
          const r = await fetch(f, { mode: 'no-cors' });
          if (r && r.type !== 'error') await cache.put(f, r.clone());
        } catch (_) {}
      }
    } catch (_) {}
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim(); // 立即接管页面
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // 页面导航：联网优先，失败回退缓存的首页
  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req, './index.html'));
    return;
  }

  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(req));
  } else {
    event.respondWith(staleWhileRevalidate(req));
  }
});

async function networkFirst(req, fallback) {
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      const c = await caches.open(CACHE);
      c.put(req.url, res.clone());
    }
    return res;
  } catch (err) {
    const c = await caches.open(CACHE);
    const cached = (await c.match(req.url)) || (fallback ? await c.match(fallback) : null);
    if (cached) return cached;
    throw err;
  }
}

async function staleWhileRevalidate(req) {
  const c = await caches.open(CACHE);
  const cached = await c.match(req.url);
  const network = fetch(req)
    .then((res) => {
      if (res && (res.ok || res.type === 'opaque')) c.put(req.url, res.clone());
      return res;
    })
    .catch(() => undefined);
  return cached || (await network);
}
