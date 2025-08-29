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

// Mock fallback data
const mockSiteData: SiteInfo = {
  id: 101,
  name: "Haber Merkezi",
  domain: "habermodul.test",
  description: "En güncel haberler ve analizler",
  status: "active",
  language: "tr",
  created_at: "2025-01-27T00:00:00.000000Z",
  updated_at: "2025-01-27T16:00:00.000000Z",
  logo: {
    path: null,
    url: null
  },
  favicons: [
    {
      url: "https://cdn.icerikplanla.com/favicons/site-101/favicon-16x16-1753915306.png?t=1753915306",
      name: "favicon-16x16",
      path: "favicons/site-101/favicon-16x16-1753915306.png",
      size: "16x16",
      filename: "favicon-16x16-1753915306.png"
    },
    {
      url: "https://cdn.icerikplanla.com/favicons/site-101/favicon-32x32-1753915306.png?t=1753915306",
      name: "favicon-32x32",
      path: "favicons/site-101/favicon-32x32-1753915306.png",
      size: "32x32",
      filename: "favicon-32x32-1753915306.png"
    },
    {
      url: "https://cdn.icerikplanla.com/favicons/site-101/apple-touch-icon-1753915306.png?t=1753915306",
      name: "apple-touch-icon",
      path: "favicons/site-101/apple-touch-icon-1753915306.png",
      size: "180x180",
      filename: "apple-touch-icon-1753915306.png"
    }
  ],
  theme: {
    id: 1,
    name: "BBC News",
    slug: "bbc-news",
    description: "BBC benzeri profesyonel haber sitesi teması",
    preview_image: "https://habermodul.test/img/media/1/2025/07/24/b3fec24d-f875-4d62-8fc6-98ce35e60c97.png",
    color_palette: {
      primary: "#CC0000",
      secondary: "#767676"
    },
    features: [
      "Responsive Tasarım",
      "Haber Kategorileri",
      "Canlı Yayın Desteği",
      "Temiz Tipografi"
    ]
  },
  social_media: {
    facebook: "https://facebook.com/habermerkezi",
    twitter: "https://twitter.com/habermerkezi",
    instagram: "https://instagram.com/habermerkezi",
    linkedin: null,
    youtube: "https://youtube.com/@habermerkezi",
    github: null,
    telegram: null,
    whatsapp: null
  },
  menus: {
    "header": [
      {
        id: 49,
        name: "teknoloji-kategorileri",
        label: "Teknoloji Kategorileri",
        url: "/kategori/teknoloji-kategorileri",
        type: "mega",
        target: "_self",
        icon: null,
        sort_order: 1,
        description: null,
        css_classes: null,
        is_active: true,
        children: [
          {
            id: 50,
            name: "yazilim",
            label: "Yazılım",
            url: null,
            type: "header",
            target: "_self",
            icon: null,
            sort_order: 1,
            description: null,
            css_classes: null,
            is_active: true,
            children: [
              {
                id: 51,
                name: "yazilim-gelisim",
                label: "Yazılım Geliştirme",
                url: "/kategori/yazilim-gelisim",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 1,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 52,
                name: "yazilim-araclar",
                label: "Yazılım Araçları",
                url: "/kategori/yazilim-araclar",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 2,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 53,
                name: "yazilim-haberleri",
                label: "Yazılım Haberleri",
                url: "/kategori/yazilim-haberleri",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 3,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 54,
                name: "yazilim-rehber",
                label: "Yazılım Rehberi",
                url: "/kategori/yazilim-rehber",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 4,
                description: null,
                css_classes: null,
                is_active: true
              }
            ]
          },
          {
            id: 55,
            name: "donanim",
            label: "Donanım",
            url: null,
            type: "header",
            target: "_self",
            icon: null,
            sort_order: 2,
            description: null,
            css_classes: null,
            is_active: true,
            children: [
              {
                id: 56,
                name: "donanim-yenilikler",
                label: "Donanım Yenilikleri",
                url: "/kategori/donanim-yenilikler",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 1,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 57,
                name: "donanim-urunleri",
                label: "Donanım Ürünleri",
                url: "/kategori/donanim-urunleri",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 2,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 58,
                name: "donanim-testler",
                label: "Donanım Testleri",
                url: "/kategori/donanim-testler",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 3,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 59,
                name: "donanim-rehberi",
                label: "Donanım Rehberi",
                url: "/kategori/donanim-rehberi",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 4,
                description: null,
                css_classes: null,
                is_active: true
              }
            ]
          },
          {
            id: 60,
            name: "mobil",
            label: "Mobil",
            url: null,
            type: "header",
            target: "_self",
            icon: null,
            sort_order: 3,
            description: null,
            css_classes: null,
            is_active: true,
            children: [
              {
                id: 61,
                name: "mobil-uygulamalar",
                label: "Mobil Uygulamalar",
                url: "/kategori/mobil-uygulamalar",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 1,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 62,
                name: "mobil-cihazlar",
                label: "Mobil Cihazlar",
                url: "/kategori/mobil-cihazlar",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 2,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 63,
                name: "mobil-haberler",
                label: "Mobil Haberler",
                url: "/kategori/mobil-haberler",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 3,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 64,
                name: "mobil-rehber",
                label: "Mobil Rehber",
                url: "/kategori/mobil-rehber",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 4,
                description: null,
                css_classes: null,
                is_active: true
              }
            ]
          },
          {
            id: 65,
            name: "trend-teknolojiler",
            label: "Trend Teknolojiler",
            url: null,
            type: "header",
            target: "_self",
            icon: null,
            sort_order: 4,
            description: null,
            css_classes: null,
            is_active: true,
            children: [
              {
                id: 66,
                name: "ai",
                label: "AI",
                url: "/kategori/ai",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 1,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 67,
                name: "blockchain",
                label: "Blockchain",
                url: "/kategori/blockchain",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 2,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 68,
                name: "iot",
                label: "IoT",
                url: "/kategori/iot",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 3,
                description: null,
                css_classes: null,
                is_active: true
              },
              {
                id: 69,
                name: "trend-rehber",
                label: "Trend Rehber",
                url: "/kategori/trend-rehber",
                type: "category",
                target: "_self",
                icon: null,
                sort_order: 4,
                description: null,
                css_classes: null,
                is_active: true
              }
            ]
          }
        ]
      },
      {
        id: 70,
        name: "rehber",
        label: "Rehber",
        url: "/kategori/rehber",
        type: "category",
        target: "_self",
        icon: null,
        sort_order: 2,
        description: null,
        css_classes: null,
        is_active: true
      },
      {
        id: 71,
        name: "incelemeler",
        label: "İncelemeler",
        url: "/kategori/incelemeler",
        type: "category",
        target: "_self",
        icon: null,
        sort_order: 3,
        description: null,
        css_classes: null,
        is_active: true
      },
      {
        id: 72,
        name: "haberler",
        label: "Haberler",
        url: "/kategori/haberler",
        type: "category",
        target: "_self",
        icon: null,
        sort_order: 4,
        description: null,
        css_classes: null,
        is_active: true
      }
    ],
    "footer": []
  },
  settings: {
    seo: {
      meta_title: "Haber Merkezi - Güncel Haberler ve Analizler",
      meta_description: "Türkiye'nin en güncel haberleri, son dakika gelişmeleri ve derinlemesine analizler için Haber Merkezi'ni takip edin.",
      meta_keywords: "haber, güncel, son dakika, analiz, türkiye"
    },
    analytics: {
      google_analytics_id: "GA-XXXXXXXXX",
      google_tag_manager_id: "GTM-XXXXXXX",
      facebook_pixel_id: null
    },
    contact: {
      email: "iletisim@habermerkezi.com",
      phone: "+90 212 555 0123",
      address: "İstanbul, Türkiye"
    },
    maintenance_mode: false,
    comments_enabled: true,
    registration_enabled: true
  }
}

// External API'den site bilgilerini çek (fallback ile)
async function fetchSiteDataFromAPI(): Promise<SiteInfo> {
  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  // Environment variables debug log
  console.log('🔍 Site API Environment Check:')
  console.log('  - NEXT_PUBLIC_BASE_API_URL:', externalApiUrl ? '✅ Set' : '❌ Missing')
  console.log('  - API_KEY:', apiKey ? '✅ Set' : '❌ Missing')

  // Environment variables eksikse mock data dön
  if (!externalApiUrl || !apiKey) {
    console.warn('⚠️ External API URL veya API key tanımlı değil, mock data kullanılıyor')
    console.warn('⚠️ externalApiUrl:', externalApiUrl)
    console.warn('⚠️ apiKey length:', apiKey ? apiKey.length : 0)
    return mockSiteData
  }

  try {
    const response = await fetch(`${externalApiUrl}/site`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      // SEO için cache stratejisi
      next: { revalidate: 3600 } // 1 saat cache
    })

    if (!response.ok) {
      console.warn(`⚠️ External API error: ${response.status} ${response.statusText}, mock data kullanılıyor`)
      return mockSiteData
    }

    const data = await response.json()
    
    // External API'den gelen data'da error varsa mock data dön
    if (data.error) {
      console.warn(`⚠️ External API error: ${data.error}, mock data kullanılıyor`)
      return mockSiteData
    }
    
    return data
  } catch (error) {
    console.warn(`⚠️ External API connection failed: ${error}, mock data kullanılıyor`)
    return mockSiteData
  }
}

export async function GET(request: NextRequest) {
  try {
    // Internal API endpoint - authentication bypass  
    // Bu endpoint frontend'den kullanılacak, external API'ye proxy yapacak

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
    // POST işlemleri için API key doğrulaması gerekli
    if (!validateApiKey(request)) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Site güncellemeleri için geçerli API key gerekli',
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
