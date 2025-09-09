import { downloadFavicons } from './scripts/download-favicons.js'
import { downloadLogo } from './scripts/download-logo.js'
import dotenv from 'dotenv'

// Environment variables'ları açıkça yükle
dotenv.config()

// Build sırasında sadece bir kez çalıştırmak için global flag
let faviconDownloaded = false
let logoDownloaded = false

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
