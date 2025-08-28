const fs = require('fs')
const path = require('path')

// Favicon manifest dosyasını oku
function getFaviconManifest() {
  try {
    const manifestPath = path.join(process.cwd(), 'public', 'favicons', 'manifest.json')
    
    if (!fs.existsSync(manifestPath)) {
      return null
    }
    
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8')
    return JSON.parse(manifestContent)
  } catch (error) {
    console.error('Error reading favicon manifest:', error)
    return null
  }
}

// Favicon bilgilerini log'la
function logFaviconStatus() {
  const manifest = getFaviconManifest()
  
  if (!manifest) {
    console.log('📄 Favicon manifest bulunamadı')
    return
  }
  
  console.log(`📄 Favicon Manifest:`)
  console.log(`   Site: ${manifest.siteName}`)
  console.log(`   Son güncelleme: ${manifest.lastUpdated}`)
  console.log(`   Favicon sayısı: ${manifest.favicons.length}`)
  
  // Dosya kontrolü
  const missing = []
  
  for (const favicon of manifest.favicons) {
    const filePath = path.join(process.cwd(), 'public', favicon.localPath)
    if (!fs.existsSync(filePath)) {
      missing.push(favicon.filename)
    } else {
      console.log(`   ✅ ${favicon.filename} (${favicon.size})`)
    }
  }
  
  if (missing.length > 0) {
    console.log(`   ❌ Eksik dosyalar: ${missing.join(', ')}`)
  } else {
    console.log('✅ Tüm favicon dosyaları mevcut')
  }
}

// Script'i çalıştır
if (require.main === module) {
  logFaviconStatus()
}

module.exports = { getFaviconManifest, logFaviconStatus }
