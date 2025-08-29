import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { NewsDetailContent } from "@/components/news-detail-content"
import { RelatedArticles } from "@/components/related-articles"
import { SiteProvider } from "@/components/site-provider"
import { StructuredData } from "@/components/structured-data"
import { siteApi } from "@/lib/site-api"

// API Response interface
interface ArticleApiResponse {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  status: string
  published_at: string
  meta_title: string
  meta_description: string
  meta_keywords: string | null
  created_at: string
  updated_at: string
  category: {
    id: number
    name: string
    slug: string
    color: string
  }
  author: {
    id: number
    first_name: string
    last_name: string
  }
  tags: {
    id: number
    name: string
    slug: string
  }[]
  featured_media: {
    id: number
    filename: string
    original_filename: string | null
    url: string
    mime_type: string
    size: number | null
  }
}

// Fetch article from external API
async function fetchArticleFromAPI(slug: string): Promise<ArticleApiResponse | null> {
  const externalApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL
  const apiKey = process.env.API_KEY

  if (!externalApiUrl || !apiKey) {
    console.warn('⚠️ External API URL or API key not set for article fetch')
    return null
  }

  try {
    console.log(`🔍 Fetching article: ${slug}`)
    const response = await fetch(`${externalApiUrl}/articles/slug/${slug}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`⚠️ Article API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    console.log(`✅ Article data fetched for: ${slug}`)
    return data
  } catch (error) {
    console.error(`❌ Error fetching article ${slug}:`, error)
    return null
  }
}

// Function to fetch article by slug
async function getArticleBySlug(slug: string) {
  // Try to fetch from external API first
  const articleData = await fetchArticleFromAPI(slug)
  
  if (articleData) {
    // Convert API response to our format
    return {
      id: articleData.id.toString(),
      title: articleData.title,
      slug: articleData.slug,
      excerpt: articleData.excerpt,
      content: articleData.content,
      imageUrl: articleData.featured_media?.url || "/placeholder.jpg",
      category: articleData.category.name,
      publishedAt: articleData.published_at,
      author: {
        name: `${articleData.author.first_name} ${articleData.author.last_name}`,
        avatar: "/journalist-avatar.png",
        bio: "Haber Merkezi Editörü",
      },
      tags: articleData.tags.map(tag => tag.name),
      readTime: Math.ceil(articleData.content.length / 1000), // Rough calculation
      views: Math.floor(Math.random() * 2000) + 500, // Mock data
      shares: Math.floor(Math.random() * 100) + 10, // Mock data
    }
  }

  // Fallback to mock data if API fails
  console.log(`📝 Using mock data for article: ${slug}`)
  return {
    id: "1",
    title: "Haber Bulunamadı",
    slug: slug,
    excerpt: "Bu haber bulunamadı veya henüz yayınlanmadı.",
    content: "<p>Bu haber bulunamadı veya henüz yayınlanmadı. Lütfen daha sonra tekrar deneyin.</p>",
    imageUrl: "/placeholder.jpg",
    category: "Genel",
    publishedAt: new Date().toISOString(),
    author: {
      name: "Haber Merkezi",
      avatar: "/journalist-avatar.png",
      bio: "Haber Merkezi Editörü",
    },
    tags: ["güncel"],
    readTime: 1,
    views: 0,
    shares: 0,
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const siteResponse = await siteApi.getSiteInfo()
  const siteInfo = siteResponse.data

  if (!article) {
    notFound()
  }

  return (
    <SiteProvider>
      <div className="min-h-screen bg-white">
        {/* Structured Data */}
        <StructuredData
          type="article"
          data={{
            title: article.title,
            excerpt: article.excerpt,
            image: article.imageUrl,
            publishedAt: article.publishedAt,
            modifiedAt: article.publishedAt,
            author: {
              name: article.author.name,
              bio: article.author.bio
            },
            publisher: {
              name: siteInfo?.name || "Haber Merkezi",
              url: siteInfo?.domain || "http://localhost:3000",
              logo: siteInfo?.logo?.url
            },
            category: article.category,
            tags: article.tags,
            wordCount: article.content.replace(/<[^>]*>/g, '').split(' ').length,
            readTime: article.readTime,
            url: `http://localhost:3000/${slug}`
          }}
        />
        
        <StructuredData
          type="breadcrumb"
          data={{
            items: [
              { name: "Ana Sayfa", url: "http://localhost:3000" },
              { name: article.category, url: `http://localhost:3000/kategori/${article.category.toLowerCase().replace(/\s+/g, '-')}` },
              { name: article.title, url: `http://localhost:3000/${slug}` }
            ]
          }}
        />

        <ModernHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <NewsDetailContent article={article} />
        <RelatedArticles category={article.category} currentSlug={article.slug} />
      </main>

      <Footer />
      </div>
    </SiteProvider>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Haber Bulunamadı - Haber Merkezi",
      description: "Aradığınız haber bulunamadı veya yayından kaldırılmış olabilir.",
      robots: {
        index: false,
        follow: false,
      }
    }
  }

  // Haber içeriğinden temiz metin çıkar (HTML tagları olmadan)
  const cleanContent = article.content.replace(/<[^>]*>/g, '').substring(0, 160)
  const publishDate = new Date(article.publishedAt)
  const formattedDate = publishDate.toISOString()

  return {
    title: `${article.title} | Haber Merkezi`,
    description: article.excerpt || cleanContent,
    keywords: `${article.tags.join(', ')}, ${article.category.toLowerCase()}, haber, güncel`,
    authors: [{ name: article.author.name }],
    openGraph: {
      title: article.title,
      description: article.excerpt || cleanContent,
      url: `http://localhost:3000/${slug}`,
      siteName: "Haber Merkezi",
      locale: 'tr_TR',
      type: "article",
      publishedTime: formattedDate,
      modifiedTime: formattedDate,
      authors: [article.author.name],
      section: article.category,
      tags: article.tags,
      images: [{
        url: article.imageUrl,
        width: 1200,
        height: 630,
        alt: article.title,
        type: 'image/jpeg'
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || cleanContent,
      images: [{
        url: article.imageUrl,
        alt: article.title
      }],
      creator: '@habermerkezi',
      site: '@habermerkezi'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `http://localhost:3000/${slug}`,
    },
    other: {
      'article:published_time': formattedDate,
      'article:modified_time': formattedDate,
      'article:author': article.author.name,
      'article:section': article.category,
      'article:tag': article.tags.join(','),
      'og:image:width': '1200',
      'og:image:height': '630',
    }
  }
}
