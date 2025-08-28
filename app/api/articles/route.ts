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

// External API'den articles bilgilerini çek
async function fetchArticlesFromAPI(queryParams: URLSearchParams): Promise<ArticlesResponse> {
  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  if (!externalApiUrl || !apiKey) {
    throw new Error('External API URL veya API key tanımlı değil')
  }

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
    throw new Error(`External API error: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

export async function GET(request: NextRequest) {
  try {
    // API key doğrulaması
    if (!validateApiKey(request)) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Geçerli API key gerekli',
        },
        { 
          status: 401,
          headers: {
            'WWW-Authenticate': 'Bearer realm="API"',
          }
        }
      )
    }

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
