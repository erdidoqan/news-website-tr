"use client"

import { ChevronRight } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import Link from "next/link"
import { useArticles } from "@/hooks/use-articles"

// Client-side dynamic footer sections
export function FooterSections() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <CategorySection categorySlug="yazilim-gelisim" title="Yazılım" />
        <CategorySection categorySlug="donanim-yenilikler" title="Donanım" />
        <CategorySection categorySlug="mobil-uygulamalar" title="Mobil" />
        <CategorySection categorySlug="ai" title="AI & Teknoloji" />
      </div>
    </section>
  )
}

// Her kategori için ayrı component
function CategorySection({ categorySlug, title }: { categorySlug: string; title: string }) {
  const { articles, loading } = useArticles({
    category: categorySlug,
    perPage: 4,
    autoFetch: true
  })

  // Loading veya haber yoksa gösterme
  if (loading || articles.length === 0) {
    return null
  }

  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1, 4)

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Link 
          href={`/kategori/${categorySlug}`}
          className="text-lg font-bold text-black font-serif hover:text-primary transition-colors"
        >
          {title}
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </div>

      {/* Featured Article */}
      <div className="space-y-3">
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
          <OptimizedImage
            src={featuredArticle.featured_media?.url || "/placeholder.svg"}
            alt={featuredArticle.title}
            preset="thumbnail"
            fill
          />
        </div>
        
        <div className="space-y-2">
          <Link 
            href={`/${featuredArticle.slug}`}
            className="block group"
          >
            <h3 className="font-serif font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {featuredArticle.title}
            </h3>
          </Link>
          {featuredArticle.excerpt && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {featuredArticle.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Other Articles */}
      <div className="space-y-3">
        {otherArticles.map((article) => (
          <Link
            key={article.id}
            href={`/${article.slug}`}
            className="block group"
          >
            <h4 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  )
}