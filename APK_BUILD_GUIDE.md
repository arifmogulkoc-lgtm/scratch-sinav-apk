# Scratch Sınav - APK Oluşturma Kılavuzu

## Proje Durumu

Web uygulaması başarıyla oluşturulmuş ve Capacitor ile Android projesine dönüştürülmüştür. APK oluşturma için aşağıdaki yöntemlerden birini kullanabilirsiniz.

## Yöntem 1: Android Studio Kullanarak (Önerilen)

### Adımlar:

1. **Android Studio'yu İndir ve Kur**
   - https://developer.android.com/studio adresinden Android Studio'yu indir
   - Kurulumu tamamla

2. **Projeyi Aç**
   ```bash
   # Android Studio'yu aç
   # File → Open → /home/ubuntu/scratch_quiz/android seçin
   ```

3. **APK Oluştur**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Veya Ctrl+F9 tuşuna bas
   - APK dosyası şu konumda oluşacak:
     ```
     /home/ubuntu/scratch_quiz/android/app/build/outputs/apk/debug/app-debug.apk
     ```

## Yöntem 2: Gradle Command Line Kullanarak

### Gereksinimler:

1. **Java Development Kit (JDK) 21+**
   ```bash
   sudo apt-get install openjdk-21-jdk
   ```

2. **Android SDK**
   - SDK Platform 36
   - Build Tools 35.0.0

3. **Gradle** (Capacitor ile birlikte gelir)

### APK Oluşturma:

```bash
cd /home/ubuntu/scratch_quiz/android

# Debug APK oluştur
./gradlew assembleDebug

# Release APK oluştur (imzalama gerekir)
./gradlew assembleRelease
```

### Sorun Giderme:

**Hata: SDK directory is not writable**
- Android SDK'yı kullanıcı dizinine kopyala:
```bash
mkdir -p ~/android-sdk
cp -r /usr/lib/android-sdk/* ~/android-sdk/
export ANDROID_HOME=~/android-sdk
```

**Hata: License not accepted**
```bash
yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses
```

## Yöntem 3: Cloud Build Servisleri Kullanarak

### EAS Build (Expo Application Services)

```bash
npm install -g eas-cli
eas build --platform android
```

### Appetize.io

- Projeyi GitHub'a push et
- https://appetize.io adresine git
- Repository'yi bağla
- APK'yı tarayıcıda test et

## Yöntem 4: PWA Olarak Dağıt (Hızlı Alternatif)

Web uygulaması zaten PWA olarak yapılandırılmıştır. Kullanıcılar şu şekilde yükleyebilirler:

1. **Web Uygulamasını Aç**
   - https://3000-i4lgvwqr0ex0k8frrclnr-78315054.sg1.manus.computer

2. **"Install" Seçeneğini Kullan**
   - Tarayıcıda "Install app" veya "Add to Home Screen" seçeneğini kullan
   - Uygulama masaüstüne veya ana ekrana eklenir

3. **Offline Kullanım**
   - Service Worker sayesinde internet olmadan da çalışır

## Oluşturulan Dosyalar

### Web Uygulaması
- **Build Çıktısı**: `/home/ubuntu/scratch_quiz/dist/public/`
- **Manifest**: `/home/ubuntu/scratch_quiz/dist/public/manifest.json`
- **Service Worker**: `/home/ubuntu/scratch_quiz/dist/public/sw.js`

### Android Projesi
- **Capacitor Config**: `/home/ubuntu/scratch_quiz/capacitor.config.ts`
- **Android Proje**: `/home/ubuntu/scratch_quiz/android/`
- **Gradle Build**: `/home/ubuntu/scratch_quiz/android/build.gradle`

## Uygulama Özellikleri

- **Platform**: Web, Android (Capacitor), iOS (Capacitor)
- **Dil**: Türkçe
- **Soru Sayısı**: 30 (kolay, orta, zor)
- **Soru Türleri**: Çoktan seçmeli, Sürükle-bırak
- **Adaptif Zorluk**: Başarıya göre zorluk seviyesi artar
- **Görseller**: Scratch temalı görseller dahil

## Dağıtım

### Web Dağıtımı
```bash
# Manus Platform'a dağıt
# Management UI → Publish butonu
```

### APK Dağıtımı
```bash
# Google Play Store'a yükle
# 1. Signed APK oluştur
# 2. Google Play Console'a giriş yap
# 3. APK'yı yükle
```

## İletişim ve Destek

Sorularınız için lütfen proje yöneticisine başvurunuz.
