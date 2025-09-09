"use client"

import { AlertCircle, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useArticles } from "@/hooks/use-articles"
import Link from "next/link"

export function BreakingNews() {
  const { articles, loading } = useArticles({
    perPage: 6,
    autoFetch: true,
    sortBy: 'published_at',
    sortOrder: 'desc'
  })

  // Loading veya haber yoksa gösterme
  if (loading || articles.length === 0) {
    return null
  }

  // Time ago hesaplama
  const getTimeAgo = (dateString: string | null) => {
    if (!dateString) return 'Tarih yok'
    
    const now = new Date()
    const publishDate = new Date(dateString)
    const diffMs = now.getTime() - publishDate.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffMins < 60) return `${diffMins} dk önce`
    if (diffHours < 24) return `${diffHours} saat önce`
    return `${diffDays} gün önce`
  }

  // Son 6 haberi breaking news olarak göster
  const breakingNewsItems = articles.slice(0, 6).map((article, index) => ({
    title: article.title,
    slug: article.slug,
    time: getTimeAgo(article.published_at),
    urgent: index === 0 // İlk haber "acil" olarak işaretle
  }))
  return (
    <section className="bg-red-600 text-white py-3 sm:py-4 mb-6 sm:mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Breaking News Label */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span className="font-bold text-sm sm:text-lg">SON DAKİKA</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-4 sm:gap-8 animate-scroll">
              {breakingNewsItems.map((item, index) => (
                <Link key={index} href={`/${item.slug}`} className="flex items-center gap-2 sm:gap-3 whitespace-nowrap hover:text-red-100 transition-colors">
                  {item.urgent && (
                    <Badge variant="secondary" className="bg-yellow-400 text-red-600 text-xs hidden sm:inline-flex">
                      ACIL
                    </Badge>
                  )}
                  <span className="font-medium text-sm sm:text-base">{item.title}</span>
                  <span className="text-red-200 text-xs sm:text-sm hidden sm:inline">({item.time})</span>
                  {index < breakingNewsItems.length - 1 && <div className="w-1 h-1 bg-red-300 rounded-full"></div>}
                </Link>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-1 bg-red-700 hover:bg-red-800 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-shrink-0">
            <span className="hidden sm:inline">Tümü</span>
            <span className="sm:hidden">+</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
