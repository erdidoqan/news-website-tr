import type { SiteInfo } from '@/types/site'
import { cacheManager } from './cache-manager'

const SITE_CACHE_KEY = 'site_info'
const SESSION_CACHE_KEY = 'session_site_info'

export class SiteCacheManager {
  private static instance: SiteCacheManager
  
  private constructor() {}
  
  static getInstance(): SiteCacheManager {
    if (!SiteCacheManager.instance) {
      SiteCacheManager.instance = new SiteCacheManager()
    }
    return SiteCacheManager.instance
  }

  // Check if we're in browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined'
  }

  // Get cached site info (check session first, then localStorage)
  getCachedSiteInfo(): SiteInfo | null {
    if (!this.isBrowser()) return null

    // First check session storage for instant access
    try {
      const sessionData = sessionStorage.getItem(SESSION_CACHE_KEY)
      if (sessionData) {
        return JSON.parse(sessionData) as SiteInfo
      }
    } catch (error) {
      console.error('Error reading session cache:', error)
    }

    // Then check localStorage with TTL
    const localData = cacheManager.getCached<SiteInfo>(SITE_CACHE_KEY, 'site')
    if (localData) {
      // Also store in session for faster access
      this.setSessionCache(localData)
      return localData
    }

    return null
  }

  // Set session cache
  private setSessionCache(siteInfo: SiteInfo): void {
    if (!this.isBrowser()) return
    
    try {
      sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify(siteInfo))
    } catch (error) {
      console.error('Error setting session cache:', error)
    }
  }

  // Cache site info (both localStorage and session)
  setCachedSiteInfo(siteInfo: SiteInfo): void {
    cacheManager.setCached(SITE_CACHE_KEY, siteInfo, 'site')
    this.setSessionCache(siteInfo)
  }

  // Clear cache (both localStorage and session)
  clearCache(): void {
    cacheManager.clearCache(SITE_CACHE_KEY, 'site')
    
    if (this.isBrowser()) {
      try {
        sessionStorage.removeItem(SESSION_CACHE_KEY)
      } catch (error) {
        console.error('Error clearing session cache:', error)
      }
    }
  }

  // Check if cache exists and is valid
  isCacheValid(): boolean {
    return cacheManager.isCacheValid(SITE_CACHE_KEY, 'site')
  }

  // Get cache expiry info
  getCacheInfo(): { isValid: boolean; expiresIn: number; cachedAt: number } | null {
    return cacheManager.getCacheInfo(SITE_CACHE_KEY, 'site')
  }
}

export const siteCache = SiteCacheManager.getInstance()
