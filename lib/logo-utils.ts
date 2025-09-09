// Auto-generated logo configuration
// This file is generated during build time

export interface LogoInfo {
  url: string
  filename: string
  localPath: string
  timestamp: number
  originalPath?: string | null
}


// Downloaded logo from API
export const logoInfo: LogoInfo = {
  "url": "https://app.bibulten.com/img/media/1/2025/09/03/2cb77209-0a4c-483b-b776-757e7c0664c5.png",
  "filename": "logo-1757444746698.png",
  "localPath": "/logos/logo-1757444746698.png",
  "timestamp": 1757444746698,
  "originalPath": "media/1/2025/09/03/2cb77209-0a4c-483b-b776-757e7c0664c5.png"
}

export function getLogoPath(): string {
  return logoInfo.localPath
}

export function getLogoUrl(): string {
  return logoInfo.url
}

export function isLogoAvailable(): boolean {
  return true
}


// Get logo with fallback
export function getLogoSrc(): string {
  return isLogoAvailable() ? getLogoPath() : '/placeholder-logo.svg'
}
