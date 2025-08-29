import type { Article } from "@/types/news"
import { siteApi } from "@/lib/site-api"

// API Response interfaces
interface CategoryApiResponse {
  id: number
  name: string
  slug: string
  description: string
  color: string
  articles_count: number
  created_at: string
  updated_at: string
  articles: {
    title: string
    slug: string
    excerpt: string
    featured_image_url: string
  }[]
}

interface CategoriesListResponse {
  data: {
    id: number
    name: string
    slug: string
    description: string
    color: string
    articles_count: number
    created_at: string
    updated_at: string
  }[]
}

export interface Category {
  slug: string
  name: string
  description: string
  parentCategory?: string
}

export const categories: Category[] = [
  // News Categories
  {
    slug: "turkiye-siyaseti",
    name: "Türkiye Siyaseti",
    description: "Türkiye'nin siyasi gündeminden son dakika haberleri ve analizler",
  },
  {
    slug: "konut-evsizlik",
    name: "Konut & Evsizlik",
    description: "Konut piyasası, emlak sektörü ve evsizlik konularındaki gelişmeler",
  },
  { slug: "depremler", name: "Depremler", description: "Deprem haberleri, afet yönetimi ve güvenlik önlemleri" },
  { slug: "egitim", name: "Eğitim", description: "Eğitim sistemi, okul haberleri ve akademik gelişmeler" },
  { slug: "istanbul", name: "İstanbul", description: "İstanbul'dan yerel haberler ve şehir gündeminden gelişmeler" },
  {
    slug: "turkiye",
    name: "Tüm Türkiye Haberleri",
    description: "Türkiye genelinden kapsamlı haber ve analiz içerikleri",
  },

  // Lifestyle Categories
  {
    slug: "kultur-sanat",
    name: "Kültür Sanat",
    description: "Sanat, kültür etkinlikleri ve yaratıcı endüstri haberleri",
  },
  { slug: "turk-mutfagi", name: "Türk Mutfağı", description: "Geleneksel ve modern Türk mutfağı, yemek kültürü" },
  { slug: "haber-merkezi-turkce", name: "Haber Merkezi Türkçe", description: "Türkçe içerik ve dil kültürü haberleri" },
  { slug: "dijital-platform", name: "Dijital Platform", description: "Dijital medya, platform haberleri ve teknoloji" },

  // Economy Categories
  { slug: "borsa-istanbul", name: "Borsa İstanbul", description: "Borsa İstanbul haberleri ve piyasa analizleri" },
  { slug: "doviz-kurlari", name: "Döviz Kurları", description: "Döviz piyasası, kur hareketleri ve ekonomik etkiler" },
  {
    slug: "altin-fiyatlari",
    name: "Altın Fiyatları",
    description: "Altın piyasası, fiyat hareketleri ve yatırım tavsiyeleri",
  },
  { slug: "kripto-paralar", name: "Kripto Paralar", description: "Kripto para haberleri ve blockchain teknolojisi" },

  // Main Categories
  { slug: "teknoloji", name: "Teknoloji", description: "Teknoloji haberleri, yenilikler ve dijital dönüşüm" },
  { slug: "kultur", name: "Kültür", description: "Kültür, sanat ve toplumsal etkinlikler" },
  { slug: "yasam", name: "Yaşam", description: "Yaşam tarzı, sağlık ve kişisel gelişim haberleri" },
]

// Get all categories from site API (flatten menu structure)
async function getAllCategoriesFromAPI(): Promise<Category[]> {
  try {
    const response = await siteApi.getSiteInfo()
    if (!response.success || !response.data?.menus?.header) {
      return categories // fallback to static categories
    }

    const dynamicCategories: Category[] = []
    
    // Flatten menu structure to extract all categories
    const extractCategories = (menuItems: any[], parentName?: string) => {
      menuItems.forEach(item => {
        if (item.url && item.type === 'category') {
          // Extract slug from URL (remove /kategori/ prefix)
          const slug = item.url.replace('/kategori/', '')
          dynamicCategories.push({
            slug,
            name: item.label || item.name,
            description: item.description || `${item.label || item.name} kategorisindeki haberler`,
            parentCategory: parentName
          })
        }
        
        // Recursively check children
        if (item.children && item.children.length > 0) {
          extractCategories(item.children, item.label || item.name)
        }
      })
    }

    extractCategories(response.data.menus.header)
    
    // Combine with static categories (for backwards compatibility)
    const allCategories = [...dynamicCategories, ...categories]
    
    // Remove duplicates (prefer dynamic over static)
    const uniqueCategories = allCategories.filter((category, index, self) => 
      index === self.findIndex(c => c.slug === category.slug)
    )
    
    return uniqueCategories
  } catch (error) {
    console.error('Error fetching categories from API:', error)
    return categories // fallback to static categories
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  // Try to get category from external API first
  const categoryData = await fetchCategoryFromAPI(slug)
  
  if (categoryData) {
    return {
      slug: categoryData.slug,
      name: categoryData.name,
      description: categoryData.description,
    }
  }

  // Fallback to site menu categories
  const allCategories = await getAllCategoriesFromAPI()
  return allCategories.find((category) => category.slug === slug)
}

// Fetch category data from external API
async function fetchCategoryFromAPI(slug: string): Promise<CategoryApiResponse | null> {
  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  if (!externalApiUrl || !apiKey) {
    console.warn('⚠️ External API URL or API key not set for category fetch')
    return null
  }

  try {
    console.log(`🔍 Fetching category: ${slug}`)
    const response = await fetch(`${externalApiUrl}/categories/slug/${slug}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`⚠️ Category API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    console.log(`✅ Category data fetched for: ${slug}`)
    return data
  } catch (error) {
    console.error(`❌ Error fetching category ${slug}:`, error)
    return null
  }
}

// Fetch all categories from external API
async function fetchAllCategoriesFromAPI(): Promise<CategoriesListResponse | null> {
  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  if (!externalApiUrl || !apiKey) {
    console.warn('⚠️ External API URL or API key not set for categories list')
    return null
  }

  try {
    console.log('🔍 Fetching all categories')
    const response = await fetch(`${externalApiUrl}/categories`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`⚠️ Categories API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    console.log(`✅ All categories fetched: ${data.data?.length || 0} categories`)
    return data
  } catch (error) {
    console.error('❌ Error fetching all categories:', error)
    return null
  }
}

// Convert API article to our Article interface
function convertApiArticleToArticle(apiArticle: CategoryApiResponse['articles'][0], categoryName: string): Article {
  return {
    id: apiArticle.slug,
    title: apiArticle.title,
    excerpt: apiArticle.excerpt,
    imageUrl: apiArticle.featured_image_url || '/placeholder.jpg',
    imageAlt: `${apiArticle.title} görseli`,
    category: categoryName,
    publishedAt: new Date().toLocaleDateString("tr-TR"),
    slug: apiArticle.slug,
    content: apiArticle.excerpt,
    author: "Haber Merkezi",
    tags: ["güncel"],
  }
}

export async function getCategoryArticles(
  categorySlug: string,
  page = 1,
  limit = 12,
): Promise<{ articles: Article[]; totalCount: number }> {
  // Try to fetch from external API first
  const categoryData = await fetchCategoryFromAPI(categorySlug)
  
  if (categoryData) {
    // Convert API articles to our format
    const articles = categoryData.articles.map(apiArticle => 
      convertApiArticleToArticle(apiArticle, categoryData.name)
    )
    
    return {
      articles,
      totalCount: categoryData.articles_count,
    }
  }

  // Fallback to mock data if API fails
  console.log(`📝 Using mock data for category: ${categorySlug}`)
  const category = await getCategoryBySlug(categorySlug)
  const categoryName = category?.name || "Genel"

  const mockArticles: Article[] = Array.from({ length: limit }, (_, i) => ({
    id: `${categorySlug}-${page}-${i + 1}`,
    title: `${categoryName} Haberi ${(page - 1) * limit + i + 1}`,
    excerpt: "Bu haberin özeti burada yer alacak. Gerçek API entegrasyonu sonrasında dinamik içerik gelecek.",
    imageUrl: `/placeholder.svg?height=300&width=400&query=${categorySlug} news image`,
    imageAlt: `${categoryName} haberi görseli`,
    category: categoryName,
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString("tr-TR"),
    slug: `${categorySlug}-haberi-${(page - 1) * limit + i + 1}`,
    content: "",
    author: "Haber Merkezi",
    tags: [categorySlug, "güncel"],
  }))

  return {
    articles: mockArticles,
    totalCount: 156,
  }
}

// Get related categories based on current category (or all categories if currentSlug is empty)
export async function getRelatedCategories(currentSlug: string, limit = 6): Promise<{ name: string; slug: string; count: number }[]> {
  try {
    const categoriesData = await fetchAllCategoriesFromAPI()
    
    if (categoriesData && categoriesData.data) {
      let filteredCategories = categoriesData.data
      
      // If currentSlug is provided, filter it out and only show categories with articles
      if (currentSlug) {
        filteredCategories = categoriesData.data
          .filter(cat => cat.slug !== currentSlug && cat.articles_count > 0)
          .sort(() => Math.random() - 0.5) // Random shuffle for related categories
      } else {
        // If no currentSlug (for categories page), show all categories sorted by name
        filteredCategories = categoriesData.data
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
      }
      
      const resultCategories = filteredCategories
        .slice(0, limit)
        .map(cat => ({
          name: cat.name,
          slug: cat.slug,
          count: cat.articles_count
        }))
      
      return resultCategories
    }
  } catch (error) {
    console.error('Error fetching related categories:', error)
  }

  // Fallback to static categories
  const fallbackCategories = [
    { name: "Teknoloji", slug: "teknoloji", count: 45 },
    { name: "Yazılım", slug: "yazilim-gelisim", count: 32 },
    { name: "Donanım", slug: "donanim-yenilikler", count: 28 },
    { name: "Mobil", slug: "mobil-uygulamalar", count: 24 },
    { name: "AI", slug: "ai", count: 18 },
    { name: "Blockchain", slug: "blockchain", count: 15 },
    { name: "IoT", slug: "iot", count: 12 },
    { name: "Rehber", slug: "rehber", count: 35 },
    { name: "İncelemeler", slug: "incelemeler", count: 22 },
    { name: "Haberler", slug: "haberler", count: 67 },
  ]

  if (currentSlug) {
    // For related categories, filter out current and randomize
    return fallbackCategories
      .filter(cat => cat.slug !== currentSlug)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit)
  } else {
    // For categories page, show all sorted by name
    return fallbackCategories
      .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
      .slice(0, limit)
  }
}

export function getCategoriesByParent(parentSlug?: string): Category[] {
  return categories.filter((category) => category.parentCategory === parentSlug)
}

export function getAllCategorySlugs(): string[] {
  return categories.map((category) => category.slug)
}
