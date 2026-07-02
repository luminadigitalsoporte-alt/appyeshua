const CACHE = "yeshua-web-v88";
const ASSETS = ["./", "./index.html", "./styles.css?v=88", "./app.js?v=88", "./bible-books.js?v=88", "./bible-overview-data.js?v=88", "./supabase-client.js?v=88", "./config.js?v=2", "./manifest.webmanifest?v=88", "./biblia-vistazo.html", "./coach-proverbios.html", "./content/paz-nocturna.html", "./content/oracion-eficaz.html", "./content/momentos-oracion.html", "./assets/app-icon.png", "./assets/logo-official.png", "./assets/splash-screen.png", "./assets/icons/favicon.ico", "./assets/icons/favicon-16.png", "./assets/icons/favicon-32.png", "./assets/icons/favicon-48.png", "./assets/icons/apple-touch-icon.png", "./assets/icons/icon-72.png", "./assets/icons/icon-96.png", "./assets/icons/icon-128.png", "./assets/icons/icon-144.png", "./assets/icons/icon-152.png", "./assets/icons/icon-167.png", "./assets/icons/icon-180.png", "./assets/icons/icon-192.png", "./assets/icons/icon-384.png", "./assets/icons/icon-512.png", "./assets/icons/app-icon.png", "./assets/icons/logo-official.png", "./assets/icons/splash-screen.png", "./assets/icons/android-chrome-192x192.png", "./assets/icons/android-chrome-512x512.png", "./assets/icons/maskable-192.png", "./assets/icons/maskable-512.png", "./assets/covers/cover-sleep-word.png", "./assets/covers/cover-peace.png", "./assets/covers/cover-jesus-stories.png", "./assets/covers/cover-prayer.png", "./assets/covers/cover-sleep-lake.png", "./assets/covers/cover-sleep-path.png", "./assets/covers/cover-sleep-window.png", "./assets/covers/cover-prayer-window.png", "./assets/covers/cover-night-bible.png", "./assets/covers/cover-path-sunrise.png", "./assets/covers/cover-family-walk.png", "./assets/covers/cover-start-bible.png", "./assets/covers/cover-jesus-children.png", "./assets/covers/cover-family-jesus-child.png", "./assets/covers/cover-home-jesus-walk.webp", "./assets/stories/story-01-cover.webp", "./assets/stories/story-01-thumb.webp", "./assets/stories/story-02-cover.webp", "./assets/stories/story-02-thumb.webp", "./assets/stories/story-03-cover.webp", "./assets/stories/story-03-thumb.webp", "./assets/stories/story-04-cover.webp", "./assets/stories/story-04-thumb.webp", "./assets/stories/story-05-cover.webp", "./assets/stories/story-05-thumb.webp", "./assets/stories/story-06-cover.webp", "./assets/stories/story-06-thumb.webp", "./assets/stories/story-07-cover.webp", "./assets/stories/story-07-thumb.webp", "./assets/stories/story-08-cover.webp", "./assets/stories/story-08-thumb.webp", "./assets/stories/story-09-cover.webp", "./assets/stories/story-09-thumb.webp", "./assets/stories/story-10-cover.webp", "./assets/stories/story-10-thumb.webp", "./assets/stories/story-11-cover.webp", "./assets/stories/story-11-thumb.webp", "./assets/stories/story-12-cover.webp", "./assets/stories/story-12-thumb.webp", "./assets/stories/story-13-cover.webp", "./assets/stories/story-13-thumb.webp", "./assets/stories/story-14-cover.webp", "./assets/stories/story-14-thumb.webp", "./assets/stories/story-15-cover.webp", "./assets/stories/story-15-thumb.webp", "./assets/stories/story-16-cover.webp", "./assets/stories/story-16-thumb.webp", "./assets/stories/story-17-cover.webp", "./assets/stories/story-17-thumb.webp", "./assets/stories/story-18-cover.webp", "./assets/stories/story-18-thumb.webp", "./assets/stories/story-19-cover.webp", "./assets/stories/story-19-thumb.webp", "./assets/stories/story-20-cover.webp", "./assets/stories/story-20-thumb.webp", "./assets/stories/story-21-cover.webp", "./assets/stories/story-21-thumb.webp", "./assets/stories/story-22-cover.webp", "./assets/stories/story-22-thumb.webp", "./assets/stories/story-23-cover.webp", "./assets/stories/story-23-thumb.webp", "./assets/stories/story-24-cover.webp", "./assets/stories/story-24-thumb.webp", "./assets/stories/story-25-cover.webp", "./assets/stories/story-25-thumb.webp", "./assets/stories/story-26-cover.webp", "./assets/stories/story-26-thumb.webp", "./assets/stories/story-27-cover.webp", "./assets/stories/story-27-thumb.webp", "./assets/stories/story-28-cover.webp", "./assets/stories/story-28-thumb.webp", "./assets/stories/story-29-cover.webp", "./assets/stories/story-29-thumb.webp", "./assets/stories/story-30-cover.webp", "./assets/stories/story-30-thumb.webp"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
  );
});











