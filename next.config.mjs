import { downloadFavicons } from './scripts/download-favicons.js'

// Build sırasında sadece bir kez çalıştırmak için global flag
let faviconDownloaded = false

// SSL sertifika doğrulamasını geliştirme ortamında devre dışı bırak
if (process.env.NODE_ENV !== 'production') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Build başlangıcında favicon'ları indir (sadece ilk build'de)
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
    
    return config
  },
}

export default nextConfig
