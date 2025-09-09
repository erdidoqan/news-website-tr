'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { SiteInfo } from '@/types/site'
import { siteApi } from '@/lib/site-api'
import { DynamicThemeProvider } from './dynamic-theme-provider'

interface SiteContextType {
  siteInfo: SiteInfo | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const SiteContext = createContext<SiteContextType | undefined>(undefined)

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  const fetchSiteInfo = async (forceRefresh = false) => {
    try {
      // If already initialized and not forcing refresh, don't fetch again
      if (initialized && !forceRefresh && siteInfo) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      
      const response = await siteApi.getSiteInfo(forceRefresh)
      
      if (response.success && response.data) {
        setSiteInfo(response.data)
        setInitialized(true)
      } else {
        setError(response.error || 'Site bilgileri alınamadı')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await fetchSiteInfo(true)
  }

  useEffect(() => {
    // Check if we have cached data first
    const checkCacheAndFetch = async () => {
      try {
        // Try to get cached data immediately
        const cachedResponse = await siteApi.getSiteInfo(false)
        if (cachedResponse.success && cachedResponse.data) {
          setSiteInfo(cachedResponse.data)
          setInitialized(true)
          setLoading(false)
          return
        }
        
        // If no cache, fetch from API
        await fetchSiteInfo()
      } catch (err) {
        console.error('Error during initial site info load:', err)
        await fetchSiteInfo()
      }
    }

    checkCacheAndFetch()
  }, [])

  return (
    <SiteContext.Provider
      value={{
        siteInfo,
        loading,
        error,
        refetch,
      }}
    >
      <DynamicThemeProvider>
        {children}
      </DynamicThemeProvider>
    </SiteContext.Provider>
  )
}

export function useSiteContext() {
  const context = useContext(SiteContext)
  if (context === undefined) {
    throw new Error('useSiteContext must be used within a SiteProvider')
  }
  return context
}
