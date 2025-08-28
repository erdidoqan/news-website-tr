import { StoryCard } from "./story-card"
import type { Article } from "@/types/news"

interface NewsListingProps {
  articles: Article[]
  loading?: boolean
}

export function NewsListing({ articles, loading }: NewsListingProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-serif text-gray-900 mb-2">Bu kategoride henüz haber bulunmuyor</h3>
        <p className="text-gray-600">Yakında yeni haberler eklenecek.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <StoryCard
          key={article.id}
          title={article.title}
          excerpt={article.excerpt}
          imageUrl={article.imageUrl}
          imageAlt={article.imageAlt}
          category={article.category}
          publishedAt={article.publishedAt}
          size="medium"
        />
      ))}
    </div>
  )
}
