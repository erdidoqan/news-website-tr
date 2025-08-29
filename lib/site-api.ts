import type { SiteInfo, SiteApiResponse } from '@/types/site'
import { siteCache } from './site-cache'
import { apiService } from './api'

// Build-time direct external API call (server-side only)
async function fetchSiteInfoDirect(): Promise<SiteInfo | null> {
  // Only use this on server-side during build
  if (typeof window !== 'undefined') {
    return null
  }

  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  console.log('🔄 Direct external API call (build-time):')
  console.log('  - URL:', externalApiUrl ? '✅ Set' : '❌ Missing')
  console.log('  - API Key:', apiKey ? '✅ Set' : '❌ Missing')

  if (!externalApiUrl || !apiKey) {
    console.warn('⚠️ Build-time: Environment variables missing, using fallback')
    return null
  }

  try {
    const response = await fetch(`${externalApiUrl}/site`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`⚠️ Build-time: External API error ${response.status}, using fallback`)
      return null
    }

    const data = await response.json()
    console.log('✅ Build-time: External API success')
    return data
  } catch (error) {
    console.warn('⚠️ Build-time: External API failed, using fallback:', error)
    return null
  }
}

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

      // Server-side: use direct external API call (both build and runtime)
      if (typeof window === 'undefined') {
        console.log('🏗️ Server-side: Using direct external API call')
        const directData = await fetchSiteInfoDirect()
        if (directData) {
          // Cache the server-side fetched data
          siteCache.setCachedSiteInfo(directData)
          return {
            success: true,
            data: directData,
          }
        }
        // If direct call fails, continue with normal flow
      }

      // Client-side: use internal API endpoint (no authentication required)
      const response = await fetch('/api/site', {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const apiResponse = {
        success: true,
        data: data as SiteInfo,
      }
      
      // Cache the response if successful
      if (apiResponse.success && apiResponse.data) {
        siteCache.setCachedSiteInfo(apiResponse.data)
        return {
          success: true,
          data: apiResponse.data,
        }
      }
      
      return {
        success: false,
        data: null,
        error: 'Failed to get site info',
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
