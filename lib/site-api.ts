import type { SiteInfo, SiteApiResponse } from '@/types/site'
import { siteCache } from './site-cache'
import { apiService } from './api'

export class SiteApiService {
  private static instance: SiteApiService
  
  private constructor() {}
  
  static getInstance(): SiteApiService {
    if (!SiteApiService.instance) {
      SiteApiService.instance = new SiteApiService()
    }
    return SiteApiService.instance
  }

  // Get site information with caching
  async getSiteInfo(forceRefresh = false): Promise<SiteApiResponse> {
    try {
      // Check cache first (unless force refresh is requested)
      if (!forceRefresh) {
        const cachedSiteInfo = siteCache.getCachedSiteInfo()
        if (cachedSiteInfo) {
          return {
            success: true,
            data: cachedSiteInfo,
          }
        }
      }

      // Fetch from API using the general API service
      const response = await apiService.get<SiteInfo>('/site', 'site', !forceRefresh)
      
      // Cache the response if successful
      if (response.success && response.data) {
        siteCache.setCachedSiteInfo(response.data)
        return {
          success: true,
          data: response.data,
        }
      }
      
      return {
        success: false,
        data: null,
        error: response.error || 'Failed to get site info',
      }
    } catch (error) {
      console.error('Error getting site info:', error)
      
      // Try to return cached data as fallback
      const cachedSiteInfo = siteCache.getCachedSiteInfo()
      if (cachedSiteInfo) {
        return {
          success: true,
          data: cachedSiteInfo,
        }
      }
      
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Failed to get site info',
      }
    }
  }

  // Clear site cache and force refresh
  async refreshSiteInfo(): Promise<SiteApiResponse> {
    siteCache.clearCache()
    apiService.clearSpecificCache('/site', 'site')
    return this.getSiteInfo(true)
  }

  // Get cache status
  getCacheStatus() {
    return siteCache.getCacheInfo()
  }
}

export const siteApi = SiteApiService.getInstance()
