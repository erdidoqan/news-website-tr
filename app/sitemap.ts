import { MetadataRoute } from 'next'
import { siteApi } from '@/lib/site-api'
import { getRelatedCategories } from '@/lib/categories'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'http://localhost:3000'
  
  try {
    // Site bilgilerini al
    const siteResponse = await siteApi.getSiteInfo()
    const actualBaseUrl = siteResponse.data?.domain || baseUrl

    // Kategorileri al
    const categories = await getRelatedCategories("", 100)

    const sitemap: MetadataRoute.Sitemap = [
      // Ana sayfa
      {
        url: actualBaseUrl,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1,
      },
      // Kategoriler ana sayfası
      {
        url: `${actualBaseUrl}/kategori`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }
    ]

    // Kategori sayfalarını ekle
    categories.forEach(category => {
      sitemap.push({
        url: `${actualBaseUrl}/kategori/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      })
    })

    // TODO: Haber sayfalarını da ekleyebiliriz (API'den son haberleri çekerek)
    // Bu şimdilik manual olarak birkaç örnek ekleyelim
    const sampleArticles = [
      'cedasin-sokak-lambasi-patladi-vatandas-magdur-oldu',
      // Diğer haber slug'ları API'den gelecek
    ]

    sampleArticles.forEach(slug => {
      sitemap.push({
        url: `${actualBaseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })

    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback sitemap
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1,
      },
      {
        url: `${baseUrl}/kategori`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }
    ]
  }
}
