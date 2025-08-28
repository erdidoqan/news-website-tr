import { useState, useEffect } from 'react'
import type { SiteInfo } from '@/types/site'
import { siteApi } from '@/lib/site-api'

interface UseSiteInfoReturn {
  siteInfo: SiteInfo | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useSiteInfo(): UseSiteInfoReturn {
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

  return {
    siteInfo,
    loading,
    error,
    refetch,
  }
}
