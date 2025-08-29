'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Article, ArticlesResponse } from '@/types/news'

interface UseArticlesOptions {
  page?: number
  perPage?: number
  status?: 'published' | 'draft' | 'all'
  category?: string
  tag?: string
  search?: string
  sortBy?: 'title' | 'created_at' | 'published_at'
  sortOrder?: 'asc' | 'desc'
  autoFetch?: boolean
}

interface UseArticlesReturn {
  articles: Article[]
  loading: boolean
  error: string | null
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  } | null
  refresh: () => Promise<void>
  fetchArticles: (options?: UseArticlesOptions) => Promise<void>
}

export function useArticles(initialOptions: UseArticlesOptions = {}): UseArticlesReturn {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<UseArticlesReturn['pagination']>(null)

  const {
    page = 1,
    perPage = 20,
    status = 'published',
    category,
    tag,
    search,
    sortBy = 'published_at',
    sortOrder = 'desc',
    autoFetch = true
  } = initialOptions

  const fetchArticles = useCallback(async (options: UseArticlesOptions = {}) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      
      // Use provided options or fallback to individual initial values
      const finalOptions = {
        page: options.page || page,
        perPage: options.perPage || perPage,
        status: options.status || status,
        category: options.category || category,
        tag: options.tag || tag,
        search: options.search || search,
        sortBy: options.sortBy || sortBy,
        sortOrder: options.sortOrder || sortOrder,
      }
      
      if (finalOptions.page) params.append('page', finalOptions.page.toString())
      if (finalOptions.perPage) params.append('per_page', finalOptions.perPage.toString())
      if (finalOptions.status) params.append('status', finalOptions.status)
      if (finalOptions.category) params.append('category', finalOptions.category)
      if (finalOptions.tag) params.append('tag', finalOptions.tag)
      if (finalOptions.search) params.append('search', finalOptions.search)
      if (finalOptions.sortBy) params.append('sort_by', finalOptions.sortBy)
      if (finalOptions.sortOrder) params.append('sort_order', finalOptions.sortOrder)

      const response = await fetch(`/api/articles?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Client-side cache for 2 minutes
        cache: 'force-cache'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ArticlesResponse = await response.json()
      
      setArticles(data.data || [])
      setPagination(data.pagination || null)
    } catch (err) {
      console.error('Error fetching articles:', err)
      setError(err instanceof Error ? err.message : 'Haberler yüklenirken bir hata oluştu')
      setArticles([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }, [page, perPage, status, category, tag, search, sortBy, sortOrder])

  const refresh = useCallback(async () => {
    await fetchArticles()
  }, [fetchArticles])

  useEffect(() => {
    if (autoFetch) {
      fetchArticles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    articles,
    loading,
    error,
    pagination,
    refresh,
    fetchArticles
  }
}
