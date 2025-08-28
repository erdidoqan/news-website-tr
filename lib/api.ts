import { cacheManager } from './cache-manager'
import type { CacheType } from './cache-manager'

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "/api"

// Genel API Response interface'i
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

// Genel API Service
class ApiService {
  private async fetchApi<T>(
    endpoint: string, 
    options?: RequestInit, 
    cacheType: CacheType = 'default',
    useCache = true
  ): Promise<ApiResponse<T>> {
    // Cache kontrolü
    if (useCache) {
      const cached = cacheManager.getCached<ApiResponse<T>>(endpoint, cacheType)
      if (cached) {
        return cached
      }
    }

    try {
      // API key'i headers'a ekle
      const apiKey = process.env.API_KEY
      const authHeaders = apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const result: ApiResponse<T> = {
        success: true,
        data: data as T,
      }

      // Başarılı responseları cache'le
      if (useCache) {
        cacheManager.setCached(endpoint, result, cacheType)
      }

      return result
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error)
      const errorResult: ApiResponse<T> = {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }
      
      return errorResult
    }
  }

  // Genel GET metodu
  async get<T>(endpoint: string, cacheType: CacheType = 'default', useCache = true): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(endpoint, { method: 'GET' }, cacheType, useCache)
  }

  // Genel POST metodu
  async post<T>(endpoint: string, data?: any, cacheType: CacheType = 'default'): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(
      endpoint, 
      { 
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined
      }, 
      cacheType, 
      false // POST istekleri cache'lenmez
    )
  }

  // Genel PUT metodu
  async put<T>(endpoint: string, data?: any, cacheType: CacheType = 'default'): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(
      endpoint, 
      { 
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined
      }, 
      cacheType, 
      false // PUT istekleri cache'lenmez
    )
  }

  // Genel DELETE metodu
  async delete<T>(endpoint: string, cacheType: CacheType = 'default'): Promise<ApiResponse<T>> {
    return this.fetchApi<T>(
      endpoint, 
      { method: 'DELETE' }, 
      cacheType, 
      false // DELETE istekleri cache'lenmez
    )
  }

  // Cache yönetimi
  clearCache(type: CacheType): void {
    cacheManager.clearCachesByType(type)
  }

  clearSpecificCache(endpoint: string, type: CacheType): void {
    cacheManager.clearCache(endpoint, type)
  }

  getCacheInfo(endpoint: string, type: CacheType) {
    return cacheManager.getCacheInfo(endpoint, type)
  }

  isCacheValid(endpoint: string, type: CacheType): boolean {
    return cacheManager.isCacheValid(endpoint, type)
  }
}

export const apiService = new ApiService()
