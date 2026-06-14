#!/bin/bash

# Scratch Sınav APK Build Script
# Bu script PWA tabanlı APK oluşturur

echo "=== Scratch Sınav APK Build Başladı ==="

# 1. Web uygulamasını build et
echo "1. Web uygulaması build ediliyor..."
cd /home/ubuntu/scratch_quiz
pnpm run build

# 2. PWA manifest dosyası oluştur
echo "2. PWA manifest dosyası oluşturuluyor..."
cat > /home/ubuntu/scratch_quiz/dist/public/manifest.json << 'EOF'
{
  "name": "Scratch Sınav",
  "short_name": "Scratch Quiz",
  "description": "5. sınıf Scratch programlama interaktif sınavı",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/scratch_cat.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/scratch_cat.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "screenshots": [
    {
      "src": "/quiz_bg.png",
      "sizes": "540x720",
      "type": "image/png"
    }
  ]
}
EOF

echo "3. PWA manifest oluşturuldu: /home/ubuntu/scratch_quiz/dist/public/manifest.json"

# 3. Service Worker oluştur
echo "4. Service Worker oluşturuluyor..."
cat > /home/ubuntu/scratch_quiz/dist/public/sw.js << 'EOF'
const CACHE_NAME = 'scratch-quiz-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/scratch_cat.png',
  '/success_icon.png',
  '/try_again_icon.png',
  '/quiz_bg.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/index.html'))
  );
});
EOF

echo "5. Service Worker oluşturuldu: /home/ubuntu/scratch_quiz/dist/public/sw.js"

# 4. Capacitor sync et
echo "6. Capacitor sync ediliyor..."
npx cap sync

echo ""
echo "=== APK Build Tamamlandı ==="
echo ""
echo "Sonraki adımlar:"
echo "1. Android Studio'yu açın veya aşağıdaki komutu çalıştırın:"
echo "   cd /home/ubuntu/scratch_quiz/android"
echo "   ./gradlew assembleDebug"
echo ""
echo "2. APK dosyası şu konumda olacak:"
echo "   /home/ubuntu/scratch_quiz/android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
