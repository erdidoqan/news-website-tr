import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import http from 'http'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Logo download configuration
const LOGO_DIR = path.join(__dirname, '..', 'public', 'logos')
const LOGO_EXPORTS_FILE = path.join(__dirname, '..', 'lib', 'logo-utils.ts')

// Create logos directory if it doesn't exist
if (!fs.existsSync(LOGO_DIR)) {
  fs.mkdirSync(LOGO_DIR, { recursive: true })
  console.log('📁 Logo directory created:', LOGO_DIR)
}

// Download file function
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath)
        response.pipe(fileStream)
        
        fileStream.on('finish', () => {
          fileStream.close()
          resolve(filePath)
        })
        
        fileStream.on('error', reject)
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject)
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`))
      }
    })
    
    request.on('error', reject)
    request.setTimeout(10000, () => {
      request.destroy()
      reject(new Error('Download timeout'))
    })
  })
}

// Get site info and download logo
async function downloadLogo() {
  try {
    console.log('🚀 Logo download başlatılıyor...')
    
    // Environment variables check
    const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_API_URL
    const apiKey = process.env.API_KEY
    
    console.log('🔍 Logo Download Environment Check:')
    console.log('  - API_BASE_URL:', apiBaseUrl ? '✅ Set' : '❌ Missing')
    console.log('  - API_KEY:', apiKey ? '✅ Set' : '❌ Missing')
    
    if (!apiBaseUrl || !apiKey) {
      console.warn('⚠️ Environment variables missing, skipping logo download')
      return
    }

    // Fetch site info
    const response = await fetch(`${apiBaseUrl}/site`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const siteData = await response.json()
    console.log('📄 Site:', siteData.name)

    // Check if logo exists
    if (!siteData.logo?.url) {
      console.log('📋 No logo URL found in site data')
      createLogoExports(null)
      return
    }

    const logoUrl = siteData.logo.url
    console.log('🖼️ Logo URL found:', logoUrl)

    // Generate filename with timestamp for cache busting
    const timestamp = Date.now()
    const urlParts = new URL(logoUrl)
    const originalExt = path.extname(urlParts.pathname) || '.png'
    const filename = `logo-${timestamp}${originalExt}`
    const localPath = path.join(LOGO_DIR, filename)

    // Download logo
    console.log('⬇️  Downloading logo...')
    await downloadFile(logoUrl, localPath)
    console.log('✅ Logo downloaded:', filename)

    // Create logo exports
    const logoInfo = {
      url: logoUrl,
      filename: filename,
      localPath: `/logos/${filename}`,
      timestamp: timestamp,
      originalPath: siteData.logo.path
    }

    createLogoExports(logoInfo)
    console.log('✅ Logo download tamamlandı!')

  } catch (error) {
    console.error('❌ Logo download error:', error.message)
    console.warn('⚠️ Using fallback logo configuration')
    createLogoExports(null)
  }
}

// Create logo exports file
function createLogoExports(logoInfo) {
  const exportsContent = `// Auto-generated logo configuration
// This file is generated during build time

export interface LogoInfo {
  url: string
  filename: string
  localPath: string
  timestamp: number
  originalPath?: string | null
}

${logoInfo ? `
// Downloaded logo from API
export const logoInfo: LogoInfo = ${JSON.stringify(logoInfo, null, 2)}

export function getLogoPath(): string {
  return logoInfo.localPath
}

export function getLogoUrl(): string {
  return logoInfo.url
}

export function isLogoAvailable(): boolean {
  return true
}
` : `
// No logo available from API
export const logoInfo: LogoInfo | null = null

export function getLogoPath(): string {
  return '/placeholder-logo.svg'
}

export function getLogoUrl(): string {
  return '/placeholder-logo.svg'
}

export function isLogoAvailable(): boolean {
  return false
}
`}

// Get logo with fallback
export function getLogoSrc(): string {
  return isLogoAvailable() ? getLogoPath() : '/placeholder-logo.svg'
}
`

  fs.writeFileSync(LOGO_EXPORTS_FILE, exportsContent)
  console.log('🔗 Logo exports created:', LOGO_EXPORTS_FILE)
}

export { downloadLogo }
