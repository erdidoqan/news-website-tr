import fs from 'fs'
import path from 'path'

export interface FaviconInfo {
  name: string
  size: string
  filename: string
  localPath: string
  originalUrl: string
}

export interface FaviconManifest {
  lastUpdated: string
  siteName: string
  favicons: FaviconInfo[]
}

export interface FaviconLink {
  rel: string
  href: string
  sizes?: string
  type: string
}

// Favicon manifest dosyasını oku
export function getFaviconManifest(): FaviconManifest | null {
  try {
    // Server-side ve client-side uyumluluğu için
    if (typeof window !== 'undefined') {
      // Client-side'da manifest yok, fallback dön
      return null
    }
    
    const manifestPath = path.join(process.cwd(), 'public', 'favicons', 'manifest.json')
    
    if (!fs.existsSync(manifestPath)) {
      return null
    }
    
    const manifestContent = fs.readFileSync(manifestPath, 'utf-8')
    return JSON.parse(manifestContent) as FaviconManifest
  } catch (error) {
    console.error('Error reading favicon manifest:', error)
    return null
  }
}

// Favicon'ları Next.js metadata formatına çevir
export function getFaviconLinks(): FaviconLink[] {
  const manifest = getFaviconManifest()
  
  if (!manifest || !manifest.favicons.length) {
    // Fallback favicon'lar
    return [
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon'
      }
    ]
  }
  
  return manifest.favicons.map(favicon => {
    const isAppleIcon = favicon.name.includes('apple')
    const isAndroidIcon = favicon.name.includes('android')
    
    let rel = 'icon'
    if (isAppleIcon) {
      rel = 'apple-touch-icon'
    } else if (isAndroidIcon) {
      rel = 'icon'
    }
    
    const link: FaviconLink = {
      rel,
      href: favicon.localPath,
      type: favicon.filename.endsWith('.ico') ? 'image/x-icon' : 'image/png'
    }
    
    // Boyut bilgisi varsa ekle
    if (favicon.size && favicon.size !== 'unknown') {
      link.sizes = favicon.size
    }
    
    return link
  })
}

// Browser'da favicon'ları yükle
export function loadFaviconsInBrowser(): FaviconLink[] {
  if (typeof window === 'undefined') {
    return []
  }
  
  try {
    // Public/favicons/favicons.js dosyasından yükle
    // Bu dosya build sırasında oluşturulacak
    return getFaviconLinks()
  } catch (error) {
    console.error('Error loading favicons in browser:', error)
    return [
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon'
      }
    ]
  }
}

// Favicon URL'lerini kontrol et
export function validateFaviconUrls(favicons: any[]): boolean {
  if (!Array.isArray(favicons)) {
    return false
  }
  
  return favicons.every(favicon => 
    favicon.url && 
    typeof favicon.url === 'string' && 
    (favicon.url.startsWith('http://') || favicon.url.startsWith('https://'))
  )
}

// Favicon dosya adını temizle
export function sanitizeFilename(filename: string): string {
  // Özel karakterleri temizle ve güvenli dosya adı oluştur
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
}

// Favicons dizininin varlığını kontrol et
export function checkFaviconsDirectory(): boolean {
  try {
    const faviconDir = path.join(process.cwd(), 'public', 'favicons')
    return fs.existsSync(faviconDir)
  } catch (error) {
    return false
  }
}

// Manifest'teki favicon'ların dosyalarının var olup olmadığını kontrol et
export function validateLocalFavicons(): { valid: boolean; missing: string[] } {
  const manifest = getFaviconManifest()
  
  if (!manifest) {
    return { valid: false, missing: ['manifest.json not found'] }
  }
  
  const missing: string[] = []
  
  for (const favicon of manifest.favicons) {
    const filePath = path.join(process.cwd(), 'public', favicon.localPath)
    if (!fs.existsSync(filePath)) {
      missing.push(favicon.filename)
    }
  }
  
  return {
    valid: missing.length === 0,
    missing
  }
}

// Favicon bilgilerini log'la
export function logFaviconStatus(): void {
  const manifest = getFaviconManifest()
  
  if (!manifest) {
    console.log('📄 Favicon manifest bulunamadı')
    return
  }
  
  console.log(`📄 Favicon Manifest:`)
  console.log(`   Site: ${manifest.siteName}`)
  console.log(`   Son güncelleme: ${manifest.lastUpdated}`)
  console.log(`   Favicon sayısı: ${manifest.favicons.length}`)
  
  const validation = validateLocalFavicons()
  if (validation.valid) {
    console.log('✅ Tüm favicon dosyları mevcut')
  } else {
    console.log(`❌ Eksik favicon dosyaları: ${validation.missing.join(', ')}`)
  }
}
