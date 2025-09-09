import Link from "next/link"
import { Calendar, Clock, Eye, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OptimizedImage, AvatarImage, ArticleImage } from "@/components/optimized-image"

interface Author {
  name: string
  avatar: string
  bio: string
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  publishedAt: string
  author: Author
  tags: string[]
  readTime: number
  views: number
  shares: number
}

interface NewsDetailContentProps {
  article: Article
}

export function NewsDetailContent({ article }: NewsDetailContentProps) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <article className="max-w-none">
      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-primary-10 text-primary hover:bg-primary-20">
            {article.category}
          </Badge>
          <span className="text-sm text-gray-500">•</span>
          <time className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {publishedDate}
          </time>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight font-serif">{article.title}</h1>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-200">
          <div className="flex items-center gap-3">
            <AvatarImage
              src={article.author.avatar || "/placeholder-user.jpg"}
              alt={article.author.name}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">{article.author.name}</p>
              <p className="text-sm text-gray-500">{article.author.bio}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} dk okuma
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString("tr-TR")} görüntülenme
            </span>
          </div>

          <Button variant="outline" size="sm" className="ml-auto bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Paylaş
          </Button>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8">
        <ArticleImage
          src={article.imageUrl || "/placeholder.jpg"}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Article Content */}
      <div className="article-content">
        <div
          className="prose prose-lg max-w-none 
            prose-headings:font-serif prose-headings:text-gray-900 prose-headings:mb-4 prose-headings:mt-8
            prose-p:text-gray-800 prose-p:leading-[1.8] prose-p:mb-6 prose-p:text-[18px]
            prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 
            prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-lg prose-blockquote:my-8
            prose-blockquote:text-gray-800 prose-blockquote:italic prose-blockquote:text-lg
            prose-ul:text-gray-800 prose-ul:space-y-2 prose-ul:mb-6
            prose-li:text-gray-800 prose-li:leading-relaxed
            prose-ol:text-gray-800 prose-ol:space-y-2 prose-ol:mb-6
            prose-h1:text-3xl prose-h1:font-bold prose-h1:text-gray-900
            prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
            prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-900
            prose-h4:text-lg prose-h4:font-semibold prose-h4:text-gray-900
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
            first:prose-p:text-xl first:prose-p:font-medium first:prose-p:text-gray-900 first:prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Tags */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Etiketler:</h3>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/etiket/${tag}`}
              className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Social Share */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Bu haberi paylaş:</h3>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            Twitter
          </Button>
          <Button variant="outline" size="sm">
            Facebook
          </Button>
          <Button variant="outline" size="sm">
            WhatsApp
          </Button>
          <Button variant="outline" size="sm">
            LinkedIn
          </Button>
        </div>
      </div>
    </article>
  )
}
