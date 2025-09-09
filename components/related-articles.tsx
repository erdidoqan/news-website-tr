import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"

interface RelatedArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  imageUrl: string
  category: string
  publishedAt: string
  readTime: number
}

interface RelatedArticlesProps {
  category: string
  currentSlug: string
}

export function RelatedArticles({ category, currentSlug }: RelatedArticlesProps) {
  // Mock related articles - would be fetched from API
  const relatedArticles: RelatedArticle[] = [
    {
      id: "2",
      title: "Merkez Bankası Faiz Kararı Açıklandı",
      slug: "merkez-bankasi-faiz-karari",
      excerpt: "Merkez Bankası'nın faiz kararı piyasalarda yankı buldu...",
      imageUrl: "/central-bank-news.png",
      category: "Ekonomi",
      publishedAt: "2025-01-14T08:00:00Z",
      readTime: 3,
    },
    {
      id: "3",
      title: "Borsa İstanbul'da Yeni Rekor",
      slug: "borsa-istanbul-yeni-rekor",
      excerpt: "Borsa İstanbul 100 endeksi tarihi zirvesini gördü...",
      imageUrl: "/stock-market-news.png",
      category: "Ekonomi",
      publishedAt: "2025-01-13T16:30:00Z",
      readTime: 4,
    },
    {
      id: "4",
      title: "Döviz Kurlarında Son Durum",
      slug: "doviz-kurlari-son-durum",
      excerpt: "Dolar ve Euro kurlarında yaşanan gelişmeler...",
      imageUrl: "/currency-exchange-news.png",
      category: "Ekonomi",
      publishedAt: "2025-01-13T14:15:00Z",
      readTime: 2,
    },
  ]

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Diğer Haberler</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/${article.slug}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="aspect-video relative overflow-hidden">
              <OptimizedImage
                src={article.imageUrl || "/placeholder.svg"}
                alt={article.title}
                preset="thumbnail"
                fill
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs bg-primary-10 text-primary">
                  {article.category}
                </Badge>
                <span className="text-xs text-gray-500">{article.readTime} dk</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>

              <time className="text-xs text-gray-500 mt-2 block">
                {new Date(article.publishedAt).toLocaleDateString("tr-TR")}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
