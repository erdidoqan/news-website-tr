// Bu dosya, gelecekte başka endpointler için API kullanımının nasıl yapılacağını göstermektedir
// Gerçek kullanımda bu dosyayı silebilirsiniz

import { apiService } from './api'
import type { ApiResponse } from './api'
import type { Article, Category, PaginatedResponse } from '@/types/news'

// Örnek: Haber API'si
export class NewsApiService {
  // Kategori listesi (10 dakika cache - default)
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiService.get<Category[]>('/categories', 'default')
  }

  // Haber listesi (5 dakika cache - news)
  async getNews(page = 1, limit = 10, category?: string): Promise<ApiResponse<PaginatedResponse<Article>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category }),
    })

    return apiService.get<PaginatedResponse<Article>>(`/news?${params}`, 'news')
  }

  // Tek haber detayı (5 dakika cache - news)
  async getArticle(slug: string): Promise<ApiResponse<Article>> {
    return apiService.get<Article>(`/news/${slug}`, 'news')
  }

  // Son dakika haberleri (5 dakika cache - news)
  async getBreakingNews(): Promise<ApiResponse<Article[]>> {
    return apiService.get<Article[]>('/news/breaking', 'news')
  }

  // Kategoriye göre haberler (5 dakika cache - news)
  async getNewsByCategory(categorySlug: string, limit = 6): Promise<ApiResponse<Article[]>> {
    const params = new URLSearchParams({
      limit: limit.toString(),
    })

    return apiService.get<Article[]>(`/categories/${categorySlug}/news?${params}`, 'news')
  }

  // Haber arama (cache'lenmez)
  async searchNews(query: string, page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Article>>> {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
    })

    return apiService.get<PaginatedResponse<Article>>(`/news/search?${params}`, 'news', false)
  }

  // Cache yönetimi
  clearNewsCache() {
    apiService.clearCache('news')
  }

  clearCategoriesCache() {
    apiService.clearCache('default')
  }
}

// Kullanım örnekleri:
/*
const newsApi = new NewsApiService()

// Kategori listesi al
const categories = await newsApi.getCategories()

// Haber listesi al
const news = await newsApi.getNews(1, 10, 'gundem')

// Tek haber al
const article = await newsApi.getArticle('haber-slug')

// Son dakika haberleri
const breakingNews = await newsApi.getBreakingNews()

// Cache temizleme
newsApi.clearNewsCache()

// Genel API servisi ile direct kullanım
import { apiService } from './api'

// GET isteği
const response = await apiService.get('/endpoint', 'news')

// POST isteği
const createResponse = await apiService.post('/endpoint', { data: 'value' })

// Cache kontrolleri
const isCached = apiService.isCacheValid('/endpoint', 'news')
const cacheInfo = apiService.getCacheInfo('/endpoint', 'news')
*/
