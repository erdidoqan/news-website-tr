import { NextRequest, NextResponse } from 'next/server'
import type { ArticlesResponse, Article } from '@/types/news'

// API Key doğrulama fonksiyonu
function validateApiKey(request: NextRequest): boolean {
  const apiKey = process.env.API_KEY
  if (!apiKey) {
    return false
  }

  const authHeader = request.headers.get('authorization')
  const providedKey = authHeader?.replace('Bearer ', '') || 
                     request.headers.get('x-api-key') ||
                     request.nextUrl.searchParams.get('api_key')

  return providedKey === apiKey
}

// Mock fallback data
const mockArticlesData: ArticlesResponse = {
  data: [
    {
      id: 1,
      title: "Yeni Teknoloji Atılımı Hayatımızı Değiştiriyor",
      slug: "yeni-teknoloji-atilimi-hayatimizi-degistiriyor",
      excerpt: "Günümüzde teknolojinin gelişim hızı her geçen gün artmaktadır. Bu gelişmeler hayatımızın her alanında kendini göstermektedir. Özellikle yapay zeka ve makine öğrenmesi alanındaki ilerlemeler, iş dünyası...",
      content: "<p>Günümüzde teknolojinin gelişim hızı her geçen gün artmaktadır. Bu gelişmeler hayatımızın her alanında kendini göstermektedir.</p><p>Özellikle yapay zeka ve makine öğrenmesi alanındaki ilerlemeler, iş dünyasından sağlığa kadar birçok sektörü derinden etkilemektedir.</p>",
      status: "published",
      published_at: "2025-01-28T11:17:21.000000Z",
      meta_title: "Yeni Teknoloji Atılımı Hayatımızı Değiştiriyor",
      meta_description: null,
      meta_keywords: null,
      created_at: "2025-01-30T11:17:21.000000Z",
      updated_at: "2025-01-30T11:17:21.000000Z",
      category: {
        id: 1,
        name: "Teknoloji",
        slug: "teknoloji",
        color: "#3B82F6"
      },
      author: {
        id: 1,
        first_name: "John",
        last_name: "Doe"
      },
      tags: [
        {
          id: 1,
          name: "teknoloji",
          slug: "teknoloji"
        },
        {
          id: 2,
          name: "yapay zeka",
          slug: "yapay-zeka"
        }
      ],
      featured_media: {
        id: 1,
        filename: "tech-news.jpg",
        original_filename: null,
        url: "/placeholder.jpg",
        mime_type: "image/jpeg",
        size: null
      }
    },
    {
      id: 2,
      title: "İklim Değişikliği ve Çevre Koruma",
      slug: "iklim-degisikligi-ve-cevre-koruma",
      excerpt: "İklim değişikliği günümüzün en önemli sorunlarından biri haline gelmiştir. Küresel ısınmanın etkileri her geçen gün daha belirgin hale gelmektedir.",
      content: "<p>İklim değişikliği günümüzün en önemli sorunlarından biri haline gelmiştir.</p><p>Küresel ısınmanın etkileri her geçen gün daha belirgin hale gelmektedir. Bu durumun önüne geçebilmek için acil önlemler alınması gerekmektedir.</p>",
      status: "published",
      published_at: "2025-01-29T10:30:00.000000Z",
      meta_title: "İklim Değişikliği ve Çevre Koruma",
      meta_description: "İklim değişikliği ve çevre koruma konularında son gelişmeler",
      meta_keywords: "iklim, çevre, koruma, küresel ısınma",
      created_at: "2025-01-29T09:00:00.000000Z",
      updated_at: "2025-01-29T10:30:00.000000Z",
      category: {
        id: 2,
        name: "Çevre",
        slug: "cevre",
        color: "#16A34A"
      },
      author: {
        id: 2,
        first_name: "Jane",
        last_name: "Smith"
      },
      tags: [
        {
          id: 4,
          name: "çevre",
          slug: "cevre"
        },
        {
          id: 5,
          name: "iklim",
          slug: "iklim"
        }
      ],
      featured_media: {
        id: 2,
        filename: "climate-change.jpg",
        original_filename: "climate-change-original.jpg",
        url: "/placeholder.jpg",
        mime_type: "image/jpeg",
        size: 245678
      }
    },
    {
      id: 3,
      title: "Türkiye Ekonomisinde Olumlu Sinyaller",
      slug: "turkiye-ekonomisinde-olumlu-sinyaller",
      excerpt: "Son açıklanan ekonomik veriler Türkiye ekonomisi için umut verici görünüyor. Enflasyon oranlarında yaşanan düşüş ve ihracattaki artış, ekonomik toparlanmanın sinyallerini veriyor.",
      content: "<p>Son açıklanan ekonomik veriler Türkiye ekonomisi için umut verici görünüyor.</p><p>Enflasyon oranlarında yaşanan düşüş ve ihracattaki artış, ekonomik toparlanmanın sinyallerini veriyor.</p>",
      status: "published",
      published_at: "2025-01-30T11:17:21.000000Z",
      meta_title: "Türkiye Ekonomisinde Olumlu Sinyaller",
      meta_description: null,
      meta_keywords: null,
      created_at: "2025-01-30T11:17:21.000000Z",
      updated_at: "2025-01-30T11:31:44.000000Z",
      category: {
        id: 3,
        name: "Ekonomi",
        slug: "ekonomi",
        color: "#10B981"
      },
      author: {
        id: 1,
        first_name: "John",
        last_name: "Doe"
      },
      tags: [
        {
          id: 3,
          name: "ekonomi",
          slug: "ekonomi"
        }
      ],
      featured_media: {
        id: 3,
        filename: "economy-news.jpg",
        original_filename: null,
        url: "/placeholder.jpg",
        mime_type: "image/jpeg",
        size: null
      }
    }
  ],
  pagination: {
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 3
  }
}

// External API'den articles bilgilerini çek (fallback ile)
async function fetchArticlesFromAPI(queryParams: URLSearchParams): Promise<ArticlesResponse> {
  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  // Environment variables debug log
  console.log('🔍 Articles API Environment Check:')
  console.log('  - NEXT_PUBLIC_BASE_API_URL:', externalApiUrl ? '✅ Set' : '❌ Missing')
  console.log('  - API_KEY:', apiKey ? '✅ Set' : '❌ Missing')

  // Environment variables eksikse mock data dön
  if (!externalApiUrl || !apiKey) {
    console.warn('⚠️ External API URL veya API key tanımlı değil, mock data kullanılıyor')
    console.warn('⚠️ externalApiUrl:', externalApiUrl)
    console.warn('⚠️ apiKey length:', apiKey ? apiKey.length : 0)
    return mockArticlesData
  }

  try {
    const apiUrl = `${externalApiUrl}/articles?${queryParams.toString()}`
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      // SEO için cache stratejisi - 5 dakika
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      console.warn(`⚠️ External API error: ${response.status} ${response.statusText}, mock data kullanılıyor`)
      return mockArticlesData
    }

    const data = await response.json()
    
    // External API'den gelen data'da error varsa mock data dön
    if (data.error) {
      console.warn(`⚠️ External API error: ${data.error}, mock data kullanılıyor`)
      return mockArticlesData
    }
    
    // Null category'leri düzelt
    if (data.data && Array.isArray(data.data)) {
      data.data = data.data.map((article: any) => ({
        ...article,
        category: article.category || {
          id: 0,
          name: "Genel",
          slug: "genel",
          color: "#6366F1"
        }
      }))
    }
    
    return data
  } catch (error) {
    console.warn(`⚠️ External API connection failed: ${error}, mock data kullanılıyor`)
    return mockArticlesData
  }
}

export async function GET(request: NextRequest) {
  try {
    // Internal API endpoint - authentication bypass
    // Bu endpoint sadece frontend'den kullanılacak, external API'ye proxy yapacak

    // Query parametrelerini al
    const { searchParams } = new URL(request.url)

    // External API'den articles bilgilerini çek
    const articlesData = await fetchArticlesFromAPI(searchParams)

    // Response'u olduğu gibi dön (external API zaten pagination vs. yapıyor)
    const response: ArticlesResponse = articlesData

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300', // 5 dakika cache - SEO için
        'Content-Type': 'application/json',
        'X-Total-Count': response.pagination.total.toString(),
        'X-Page': response.pagination.current_page.toString(),
        'X-Per-Page': response.pagination.per_page.toString(),
      },
    })

  } catch (error) {
    console.error('Articles API Error:', error)
    
    return NextResponse.json(
      {
        error: 'Makale listesi alınamadı',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
