import type { SiteInfo } from '@/types/site'
import { cacheManager } from './cache-manager'

const SITE_CACHE_KEY = 'site_info'

export class SiteCacheManager {
  private static instance: SiteCacheManager
  
  private constructor() {}
  
  static getInstance(): SiteCacheManager {
    if (!SiteCacheManager.instance) {
      SiteCacheManager.instance = new SiteCacheManager()
    }
    return SiteCacheManager.instance
  }

  // Get cached site info
  getCachedSiteInfo(): SiteInfo | null {
    return cacheManager.getCached<SiteInfo>(SITE_CACHE_KEY, 'site')
  }

  // Cache site info
  setCachedSiteInfo(siteInfo: SiteInfo): void {
    cacheManager.setCached(SITE_CACHE_KEY, siteInfo, 'site')
  }

  // Clear cache
  clearCache(): void {
    cacheManager.clearCache(SITE_CACHE_KEY, 'site')
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
