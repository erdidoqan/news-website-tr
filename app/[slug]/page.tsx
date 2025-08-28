import { notFound } from "next/navigation"
import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { NewsDetailContent } from "@/components/news-detail-content"
import { RelatedArticles } from "@/components/related-articles"

// Mock function to fetch article by slug
async function getArticleBySlug(slug: string) {
  // This would be replaced with actual API call
  const mockArticle = {
    id: "1",
    title: "Türkiye'de Ekonomik Gelişmeler: Yeni Dönemin Başlangıcı",
    slug: slug,
    excerpt: "Türkiye ekonomisinde yaşanan son gelişmeler ve gelecek dönem için beklentiler...",
    content: `
      <p>Türkiye ekonomisinde yaşanan son gelişmeler, ülkenin ekonomik geleceği açısından önemli ipuçları veriyor. Uzmanlar, yeni dönemde atılacak adımların kritik önemde olduğunu belirtiyor.</p>
      
      <p>Ekonomi Bakanlığı'ndan yapılan açıklamada, "Yeni ekonomik program çerçevesinde, sürdürülebilir büyüme hedefimizi gerçekleştirmek için gerekli tüm adımları atıyoruz" denildi.</p>
      
      <h3>Beklenen Gelişmeler</h3>
      <p>Önümüzdeki dönemde beklenen başlıca gelişmeler şunlar:</p>
      <ul>
        <li>Enflasyon oranlarında düşüş</li>
        <li>İstihdam artışı</li>
        <li>Yatırım teşvikleri</li>
        <li>İhracat artışı</li>
      </ul>
      
      <p>Bu gelişmeler, Türkiye ekonomisinin güçlü temellerini bir kez daha ortaya koyuyor. Uzmanlar, doğru politikalarla bu trendin devam edeceğini öngörüyor.</p>
      
      <blockquote>
        "Türkiye ekonomisi, doğru politikalar ve kararlı duruşla güçlü bir büyüme trendine girecek." - Ekonomi Uzmanı Dr. Mehmet Yılmaz
      </blockquote>
      
      <p>Sonuç olarak, Türkiye ekonomisinin önümüzdeki dönemde yaşayacağı dönüşüm, hem ulusal hem de uluslararası arenada önemli fırsatlar yaratacak.</p>
    `,
    imageUrl: "/turkish-economy-news.png",
    category: "Ekonomi",
    publishedAt: "2025-01-14T10:00:00Z",
    author: {
      name: "Ahmet Kaya",
      avatar: "/journalist-avatar.png",
      bio: "Ekonomi editörü, 15 yıllık deneyim",
    },
    tags: ["ekonomi", "türkiye", "büyüme", "politika"],
    readTime: 5,
    views: 1250,
    shares: 45,
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return mockArticle
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <NewsDetailContent article={article} />
        <RelatedArticles category={article.category} currentSlug={article.slug} />
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Haber Bulunamadı",
      description: "Aradığınız haber bulunamadı.",
    }
  }

  return {
    title: `${article.title} | Haber Merkezi`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.imageUrl],
    },
  }
}
