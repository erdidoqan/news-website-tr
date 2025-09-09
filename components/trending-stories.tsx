"use client"

import { TrendingUp } from "lucide-react"
import { useArticles } from "@/hooks/use-articles"
import Link from "next/link"

export function TrendingStories() {
  const { articles, loading } = useArticles({
    perPage: 5,
    autoFetch: true,
    sortBy: 'published_at',
    sortOrder: 'desc'
  })

  // Loading veya haber yoksa gösterme
  if (loading || articles.length === 0) {
    return null
  }

  const trendingStories = articles.slice(0, 5).map(article => ({
    title: article.title,
    slug: article.slug,
    readTime: Math.ceil(article.content.replace(/<[^>]*>/g, '').length / 1000) || 2
  }))
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="font-serif text-lg font-bold text-gray-900">Trend Haberler</h3>
      </div>

      <div className="space-y-4">
        {trendingStories.map((story, index) => (
          <div key={story.slug} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded min-w-[24px] text-center">
              {index + 1}
            </div>
            <div className="flex-1">
              <Link href={`/${story.slug}`}>
                <h4 className="text-sm font-medium text-gray-900 leading-tight mb-1 hover:text-primary cursor-pointer transition-colors">
                  {story.title}
                </h4>
              </Link>
              <span className="text-xs text-gray-500">{story.readTime} dk okuma</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
