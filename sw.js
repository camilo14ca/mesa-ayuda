// Permite abrir Soporte Técnico Sistemas aunque el equipo no tenga internet.
const CACHE = "soporte-tecnico-v2";
const FILES = ["./", "./index.html", "./manifest.json", "./icon.svg"];
const FB = "https://www.gstatic.com/firebasejs/10.12.2/";
const FB_FILES = ["firebase-app-compat.js", "firebase-firestore-compat.js", "firebase-auth-compat.js"].map(f => FB + f);

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(FILES);
    try { await c.addAll(FB_FILES); } catch {}
  }).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);

  // Librerías de Firebase: primero la copia guardada (no cambian)
  if (url.href.startsWith(FB)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;

  // Página: red primero (última versión); sin red, la copia guardada
  e.respondWith(
    fetch(e.request)
      .then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});
