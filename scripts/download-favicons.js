import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// .env dosyasını okumak için
dotenv.config()

// ES modules için __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// SSL sertifika doğrulamasını geliştirme ortamında devre dışı bırak
if (process.env.NODE_ENV !== 'production') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || 'https://habermodul.test/api/v1'
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const FAVICONS_DIR = path.join(PUBLIC_DIR, 'favicons')

// Favicons dizini oluştur
if (!fs.existsSync(FAVICONS_DIR)) {
  fs.mkdirSync(FAVICONS_DIR, { recursive: true })
}

// URL'den dosya indirme fonksiyonu
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    
    const file = fs.createWriteStream(filepath)
    
    client.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file)
        
        file.on('finish', () => {
          file.close()
          console.log(`✅ Downloaded: ${path.basename(filepath)}`)
          resolve(filepath)
        })
        
        file.on('error', (err) => {
          fs.unlink(filepath, () => {}) // Hatalı dosyayı sil
          reject(err)
        })
      } else {
        file.close()
        fs.unlink(filepath, () => {}) // Hatalı dosyayı sil
        reject(new Error(`HTTP ${response.statusCode}: ${url}`))
      }
    }).on('error', (err) => {
      file.close()
      fs.unlink(filepath, () => {}) // Hatalı dosyayı sil
      reject(err)
    })
  })
}

// Site bilgilerini al ve favicon'ları indir
async function downloadFavicons() {
  try {
    console.log('🚀 Site bilgileri alınıyor...')
    
    // Site endpoint'ine istek at
    const siteUrl = `${API_BASE_URL}/site`
    
    // Node.js'de fetch yoksa alternatif kullan
    let siteData
    try {
      const response = await fetch(siteUrl)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${siteUrl}`)
      }
      siteData = await response.json()
    } catch (error) {
      // Fetch yoksa https modülü kullan
      siteData = await new Promise((resolve, reject) => {
        const client = siteUrl.startsWith('https') ? https : http
        
        client.get(siteUrl, (response) => {
          let data = ''
          
          response.on('data', (chunk) => {
            data += chunk
          })
          
          response.on('end', () => {
            try {
              resolve(JSON.parse(data))
            } catch (parseError) {
              reject(parseError)
            }
          })
        }).on('error', reject)
      })
    }
    
    console.log(`📄 Site: ${siteData.name || 'Bilinmeyen'}`)
    
    if (!siteData.favicons || !Array.isArray(siteData.favicons)) {
      console.log('⚠️  Favicon bulunamadı')
      return
    }
    
    console.log(`🎯 ${siteData.favicons.length} favicon bulundu`)
    
    // Favicon manifest dosyası oluştur
    const faviconManifest = {
      lastUpdated: new Date().toISOString(),
      siteName: siteData.name,
      favicons: []
    }
    
    // Her favicon'ı indir
    for (const favicon of siteData.favicons) {
      try {
        const filename = favicon.filename || `${favicon.name}.png`
        const filepath = path.join(FAVICONS_DIR, filename)
        
        console.log(`⬇️  İndiriliyor: ${favicon.url}`)
        
        await downloadFile(favicon.url, filepath)
        
        // Manifest'e ekle
        faviconManifest.favicons.push({
          name: favicon.name,
          size: favicon.size,
          filename: filename,
          localPath: `/favicons/${filename}`,
          originalUrl: favicon.url
        })
        
      } catch (error) {
        console.error(`❌ Favicon indirilemedi (${favicon.name}):`, error.message)
      }
    }
    
    // Manifest dosyasını kaydet
    const manifestPath = path.join(FAVICONS_DIR, 'manifest.json')
    fs.writeFileSync(manifestPath, JSON.stringify(faviconManifest, null, 2))
    console.log('📋 Favicon manifest oluşturuldu')
    
    // Next.js metadata için favicons.js dosyası oluştur
    const faviconExports = `// Auto-generated favicon exports
// Generated at: ${new Date().toISOString()}

export const favicons = ${JSON.stringify(faviconManifest.favicons, null, 2)}

export const faviconLinks = favicons.map(favicon => ({
  rel: favicon.name.includes('apple') ? 'apple-touch-icon' : 'icon',
  href: favicon.localPath,
  sizes: favicon.size,
  type: favicon.name.includes('apple') ? 'image/png' : 'image/x-icon'
}))
`
    
    const faviconExportsPath = path.join(process.cwd(), 'lib', 'favicons.js')
    fs.writeFileSync(faviconExportsPath, faviconExports)
    console.log('🔗 Favicon exports oluşturuldu')
    
    console.log(`✅ Favicon indirme tamamlandı! ${faviconManifest.favicons.length} dosya indirildi.`)
    
  } catch (error) {
    console.error('💥 Favicon indirme hatası:', error.message)
    // Build sırasında hata ile çıkış yapma, sadece log ver
    if (process.env.NODE_ENV === 'production') {
      throw error
    } else {
      console.warn('⚠️ Geliştirme ortamında favicon indirme başarısız, devam ediliyor...')
    }
  }
}

// Script'i çalıştır
if (import.meta.url === `file://${process.argv[1]}`) {
  downloadFavicons()
}

export { downloadFavicons }
