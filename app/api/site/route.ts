import { NextRequest, NextResponse } from 'next/server'
import type { SiteInfo } from '@/types/site'

// API Key doğrulama fonksiyonu
function validateApiKey(request: NextRequest): boolean {
  const apiKey = process.env.API_KEY
  if (!apiKey) {
    return false // API key tanımlanmamışsa erişimi reddet
  }

  // Authorization header'ından key'i al
  const authHeader = request.headers.get('authorization')
  const providedKey = authHeader?.replace('Bearer ', '') || 
                     request.headers.get('x-api-key') ||
                     request.nextUrl.searchParams.get('api_key')

  return providedKey === apiKey
}

// External API'den site bilgilerini çek
async function fetchSiteDataFromAPI(): Promise<SiteInfo> {
  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  if (!externalApiUrl || !apiKey) {
    throw new Error('External API URL veya API key tanımlı değil')
  }

  const response = await fetch(`${externalApiUrl}/site`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    // SEO için cache stratejisi
    next: { revalidate: 3600 } // 1 saat cache
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

    // URL parametrelerini al
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'

    // External API'den site bilgilerini çek
    const siteData = await fetchSiteDataFromAPI()

    // Response format kontrolü
    if (format === 'xml') {
      // XML format istenirse (opsiyonel)
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<site>
  <name>${siteData.name}</name>
  <description>${siteData.description}</description>
  <language>${siteData.language}</language>
</site>`,
        {
          status: 200,
          headers: {
            'Content-Type': 'application/xml',
          },
        }
      )
    }

    // JSON response (default)
    return NextResponse.json(siteData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600', // 1 saat cache
        'Content-Type': 'application/json',
      },
    })

  } catch (error) {
    console.error('Site API Error:', error)
    
    return NextResponse.json(
      {
        error: 'Site bilgileri alınamadı',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// POST metodu - site bilgilerini güncellemek için (opsiyonel)
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    
    // External API'ye güncellemek için POST isteği
    const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
    const apiKey = process.env.API_KEY

    if (!externalApiUrl || !apiKey) {
      throw new Error('External API URL veya API key tanımlı değil')
    }

    const updateResponse = await fetch(`${externalApiUrl}/site`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })

    if (!updateResponse.ok) {
      throw new Error(`External API update error: ${updateResponse.status}`)
    }

    const updatedData = await updateResponse.json()
    
    return NextResponse.json(
      {
        message: 'Site bilgileri güncellendi',
        data: updatedData
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Site Update Error:', error)
    
    return NextResponse.json(
      {
        error: 'Site bilgileri güncellenemedi',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
