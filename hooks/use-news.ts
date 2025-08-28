"use client"

import { useState, useEffect } from "react"
import { newsApi } from "@/lib/api"
import type { NewsArticle, BreakingNewsItem, TrendingStory } from "@/types/news"

export function useFeaturedStory() {
  const [story, setStory] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedStory() {
      setLoading(true)
      const response = await newsApi.getFeaturedStory()

      if (response.success) {
        setStory(response.data)
        setError(null)
      } else {
        setError(response.error || "Failed to fetch featured story")
      }

      setLoading(false)
    }

    fetchFeaturedStory()
  }, [])

  return { story, loading, error }
}

export function useNews(page = 1, limit = 6, category?: string) {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchNews() {
      setLoading(true)
      const response = await newsApi.getNews(page, limit, category)

      if (response.success) {
        setArticles(response.data.articles)
        setTotal(response.data.total)
        setError(null)
      } else {
        setError(response.error || "Failed to fetch news")
      }

      setLoading(false)
    }

    fetchNews()
  }, [page, limit, category])

  return { articles, loading, error, total }
}

export function useBreakingNews() {
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBreakingNews() {
      setLoading(true)
      const response = await newsApi.getBreakingNews()

      if (response.success) {
        setBreakingNews(response.data)
        setError(null)
      } else {
        setError(response.error || "Failed to fetch breaking news")
      }

      setLoading(false)
    }

    fetchBreakingNews()

    // Refresh breaking news every 5 minutes
    const interval = setInterval(fetchBreakingNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { breakingNews, loading, error }
}

export function useTrendingStories() {
  const [stories, setStories] = useState<TrendingStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTrendingStories() {
      setLoading(true)
      const response = await newsApi.getTrendingStories()

      if (response.success) {
        setStories(response.data)
        setError(null)
      } else {
        setError(response.error || "Failed to fetch trending stories")
      }

      setLoading(false)
    }

    fetchTrendingStories()
  }, [])

  return { stories, loading, error }
}
