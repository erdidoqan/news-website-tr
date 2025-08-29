export interface CacheItem<T = any> {
  data: T
  timestamp: number
  expires: number
}

export type CacheType = 'site' | 'news' | 'default'

export class CacheManager {
  private static instance: CacheManager
  
  private constructor() {}
  
  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  // Check if we're in browser environment
  private isBrowser(): boolean {
    return typeof window !== 'undefined'
  }

  // Get cache TTL based on type
  private getCacheTTL(type: CacheType): number {
    switch (type) {
      case 'site':
        return Number(process.env.SITE_CACHE_TTL) * 1000 || 7 * 24 * 60 * 60 * 1000 // 7 days (site bilgileri nadiren değişir)
      case 'news':
        return Number(process.env.NEWS_CACHE_TTL) * 1000 || 5 * 60 * 1000 // 5 minutes
      case 'default':
        return Number(process.env.DEFAULT_CACHE_TTL) * 1000 || 10 * 60 * 1000 // 10 minutes
      default:
        return 10 * 60 * 1000 // 10 minutes fallback
    }
  }

  // Generate cache key
  private getCacheKey(key: string, type: CacheType): string {
    return `${type}_cache_${key}`
  }

  // Get cached data
  getCached<T>(key: string, type: CacheType): T | null {
    if (!this.isBrowser()) return null
    
    try {
      const cacheKey = this.getCacheKey(key, type)
      const cached = localStorage.getItem(cacheKey)
      if (!cached) return null
      
      const cacheData: CacheItem<T> = JSON.parse(cached)
      const now = Date.now()
      
      // Check if cache is expired
      if (now > cacheData.expires) {
        this.clearCache(key, type)
        return null
      }
      
      return cacheData.data
    } catch (error) {
      console.error(`Error reading cache for ${key}:`, error)
      this.clearCache(key, type)
      return null
    }
  }

  // Cache data
  setCached<T>(key: string, data: T, type: CacheType): void {
    if (!this.isBrowser()) return
    
    try {
      const now = Date.now()
      const ttl = this.getCacheTTL(type)
      const cacheKey = this.getCacheKey(key, type)
      
      const cacheData: CacheItem<T> = {
        data,
        timestamp: now,
        expires: now + ttl
      }
      
      localStorage.setItem(cacheKey, JSON.stringify(cacheData))
    } catch (error) {
      console.error(`Error caching data for ${key}:`, error)
    }
  }

  // Clear specific cache
  clearCache(key: string, type: CacheType): void {
    if (!this.isBrowser()) return
    
    try {
      const cacheKey = this.getCacheKey(key, type)
      localStorage.removeItem(cacheKey)
    } catch (error) {
      console.error(`Error clearing cache for ${key}:`, error)
    }
  }

  // Check if cache exists and is valid
  isCacheValid(key: string, type: CacheType): boolean {
    if (!this.isBrowser()) return false
    
    try {
      const cacheKey = this.getCacheKey(key, type)
      const cached = localStorage.getItem(cacheKey)
      if (!cached) return false
      
      const cacheData: CacheItem = JSON.parse(cached)
      const now = Date.now()
      
      return now <= cacheData.expires
    } catch (error) {
      console.error(`Error checking cache validity for ${key}:`, error)
      return false
    }
  }

  // Get cache info
  getCacheInfo(key: string, type: CacheType): { isValid: boolean; expiresIn: number; cachedAt: number } | null {
    if (!this.isBrowser()) return null
    
    try {
      const cacheKey = this.getCacheKey(key, type)
      const cached = localStorage.getItem(cacheKey)
      if (!cached) return null
      
      const cacheData: CacheItem = JSON.parse(cached)
      const now = Date.now()
      
      return {
        isValid: now <= cacheData.expires,
        expiresIn: cacheData.expires - now,
        cachedAt: cacheData.timestamp
      }
    } catch (error) {
      console.error(`Error getting cache info for ${key}:`, error)
      return null
    }
  }

  // Clear all caches of a specific type
  clearCachesByType(type: CacheType): void {
    if (!this.isBrowser()) return
    
    try {
      const prefix = `${type}_cache_`
      const keysToRemove: string[] = []
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.error(`Error clearing ${type} caches:`, error)
    }
  }

  // Clear all caches
  clearAllCaches(): void {
    if (!this.isBrowser()) return
    
    try {
      const keysToRemove: string[] = []
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.includes('_cache_')) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.error('Error clearing all caches:', error)
    }
  }
}

export const cacheManager = CacheManager.getInstance()
