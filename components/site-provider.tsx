'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import type { SiteInfo } from '@/types/site'
import { siteApi } from '@/lib/site-api'

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

  const fetchSiteInfo = async (forceRefresh = false) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await siteApi.getSiteInfo(forceRefresh)
      
      if (response.success && response.data) {
        setSiteInfo(response.data)
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
    fetchSiteInfo()
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
      {children}
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
