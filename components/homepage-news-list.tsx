'use client'

import { useArticles } from '@/hooks/use-articles'
import { LoadingSpinner } from '@/components/loading-spinner'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface HomepageNewsListProps {
  categorySlug?: string
  tag?: string
  limit?: number
  showLoadMore?: boolean
  title?: string
  className?: string
}

export function HomepageNewsList({
  categorySlug,
  tag,
  limit = 12,
  showLoadMore = true,
  title = "Son Haberler",
  className = ""
}: HomepageNewsListProps) {
  const { articles, loading, error, pagination, fetchArticles } = useArticles({
    perPage: limit,
    category: categorySlug,
    tag: tag,
    status: 'published',
    sortBy: 'published_at',
    sortOrder: 'desc'
  })

  const handleLoadMore = async () => {
    if (pagination && pagination.current_page < pagination.last_page) {
      await fetchArticles({
        page: pagination.current_page + 1,
        perPage: limit,
        category: categorySlug,
        tag: tag
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading && articles.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          {title}
        </h2>
        <div className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner size="large" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          {title}
        </h2>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Haberler yüklenirken bir hata oluştu.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          {title}
        </h2>
        <div className="text-center py-8 text-gray-500">
          <p>Henüz haber bulunmuyor.</p>
        </div>
      </div>
    )
  }

  // İlk haber featured olacak, geri kalanlar grid'de
  const [featuredArticle, ...gridArticles] = articles

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
          {title}
        </h2>
        <Link 
          href="/haberler" 
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium"
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[16/10] md:aspect-square">
              {featuredArticle.featured_media?.url ? (
                <Image
                  src={featuredArticle.featured_media.url}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📰</div>
                    <p className="text-sm">Görsel Yok</p>
                  </div>
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge 
                  style={{ backgroundColor: featuredArticle.category.color }}
                  className="text-white text-xs font-medium"
                >
                  {featuredArticle.category.name}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <Link 
                  href={`/${featuredArticle.slug}`}
                  className="block group"
                >
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                    {featuredArticle.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                {/* Tags */}
                {featuredArticle.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {featuredArticle.tags.slice(0, 3).map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/etiket/${tag.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {featuredArticle.author.first_name} {featuredArticle.author.last_name}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {featuredArticle.published_at ? formatDate(featuredArticle.published_at) : 'Tarih belirsiz'}
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      )}

      {/* News Grid */}
      {gridArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image */}
              <div className="relative aspect-[16/10]">
                {article.featured_media?.url ? (
                  <Image
                    src={article.featured_media.url}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-1">📰</div>
                      <p className="text-xs">Görsel Yok</p>
                    </div>
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge 
                    style={{ backgroundColor: article.category.color }}
                    className="text-white text-xs font-medium"
                  >
                    {article.category.name}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-4 space-y-3">
                <Link 
                  href={`/${article.slug}`}
                  className="block group"
                >
                  <h3 className="font-serif font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author.first_name} {article.author.last_name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.published_at ? formatDate(article.published_at).split(' ')[0] : 'Tarih belirsiz'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {showLoadMore && pagination && pagination.current_page < pagination.last_page && (
        <div className="text-center pt-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Yükleniyor...' : 'Daha Fazla Haber'}
          </button>
        </div>
      )}

      {/* Results Info */}
      {pagination && (
        <div className="text-center text-sm text-gray-500">
          Toplam {pagination.total} haberden {articles.length} tanesi gösteriliyor
        </div>
      )}
    </div>
  )
}
