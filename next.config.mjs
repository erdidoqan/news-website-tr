import { downloadFavicons } from './scripts/download-favicons.js'
import { downloadLogo } from './scripts/download-logo.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Environment variables'ları açıkça yükle
dotenv.config()

// Build sırasında sadece bir kez çalıştırmak için global flag
let faviconDownloaded = false
let logoDownloaded = false
let cacheCleared = false

// Cache temizleme fonksiyonu
function clearBuildCaches() {
  try {
    console.log('🧹 Cache temizleme başlatılıyor...')
    
    // Browser localStorage cache'ini temizlemek için flag dosyası oluştur
    const flagPath = path.join(__dirname, 'public', '.cache-clear-flag')
    fs.writeFileSync(flagPath, Date.now().toString())
    
    // .next cache klasörünü temizle
    const nextCachePath = path.join(__dirname, '.next', 'cache')
    if (fs.existsSync(nextCachePath)) {
      fs.rmSync(nextCachePath, { recursive: true, force: true })
      console.log('🗑️ .next/cache temizlendi')
    }
    
    // Eski favicon'ları temizle (yenileri indirilecek)
    const faviconDir = path.join(__dirname, 'public', 'favicons')
    if (fs.existsSync(faviconDir)) {
      const files = fs.readdirSync(faviconDir)
      files.forEach(file => {
        if (file.match(/\d{10,}/) && !file.includes('manifest.json')) {
          const filePath = path.join(faviconDir, file)
          fs.unlinkSync(filePath)
          console.log('🗑️ Eski favicon temizlendi:', file)
        }
      })
    }
    
    // Eski logo'ları temizle (yenisi indirilecek)
    const logoDir = path.join(__dirname, 'public', 'logos')
    if (fs.existsSync(logoDir)) {
      const files = fs.readdirSync(logoDir)
      files.forEach(file => {
        if (file.startsWith('logo-') && file.match(/\d{10,}/)) {
          const filePath = path.join(logoDir, file)
          fs.unlinkSync(filePath)
          console.log('🗑️ Eski logo temizlendi:', file)
        }
      })
    }
    
    console.log('✅ Cache temizleme tamamlandı')
  } catch (error) {
    console.warn('⚠️ Cache temizleme hatası:', error.message)
  }
}

// SSL sertifika doğrulamasını geliştirme ortamında devre dışı bırak
if (process.env.NODE_ENV !== 'production') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
}

// Environment variables'ları build zamanında logla
console.log('🔧 Build-time environment check:')
console.log('  - NEXT_PUBLIC_BASE_API_URL:', process.env.NEXT_PUBLIC_BASE_API_URL ? '✅ Set' : '❌ Missing')
console.log('  - API_KEY:', process.env.API_KEY ? '✅ Set' : '❌ Missing')
console.log('  - NODE_ENV:', process.env.NODE_ENV)

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.bibulten.com',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.icerikplanla.com',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Fixed sizes
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Cache temizleme (build başlangıcında, sadece bir kez)
    if (!dev && isServer && !cacheCleared) {
      cacheCleared = true
      clearBuildCaches()
    }

    // Build başlangıcında favicon'ları ve logo'yu indir (sadece ilk build'de)
    if (!dev && isServer && !faviconDownloaded) {
      faviconDownloaded = true
      
      console.log('🎯 Favicon indirme işlemi başlatılıyor...')
      
      // Favicon indirme işlemini background'da çalıştır
      downloadFavicons()
        .then(() => {
          console.log('✅ Favicon indirme tamamlandı')
        })
        .catch(error => {
          console.warn('⚠️ Favicon indirme başarısız, varsayılan favicon\'lar kullanılacak:', error.message)
        })
    }

    // Logo download
    if (!dev && isServer && !logoDownloaded) {
      logoDownloaded = true
      
      console.log('🎯 Logo indirme işlemi başlatılıyor...')
      
      // Logo indirme işlemini background'da çalıştır
      downloadLogo()
        .then(() => {
          console.log('✅ Logo indirme tamamlandı')
        })
        .catch(error => {
          console.warn('⚠️ Logo indirme başarısız, placeholder logo kullanılacak:', error.message)
        })
    }
    
    return config
  },
}

export default nextConfig
