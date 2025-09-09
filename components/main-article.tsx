import { Badge } from "@/components/ui/badge"
import { OptimizedImage } from "@/components/optimized-image"

interface MainArticleProps {
  title: string
  excerpt: string
  imageUrl: string
  imageAlt: string
  category: string
  publishedAt: string
  bulletPoints?: string[]
}

export function MainArticle({
  title,
  excerpt,
  imageUrl,
  imageAlt,
  category,
  publishedAt,
  bulletPoints = [],
}: MainArticleProps) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
      <div className="space-y-4 lg:space-y-6 order-2 lg:order-1">
        <div className="space-y-3 lg:space-y-4">
          <Badge variant="secondary" className="text-sm font-medium">
            {category}
          </Badge>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
          <p className="text-base lg:text-lg text-gray-700 leading-relaxed">{excerpt}</p>
          <div className="text-sm text-gray-500">{publishedAt}</div>
        </div>

        {/* Bullet points for related stories */}
        {bulletPoints.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <ul className="space-y-2">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm lg:text-base text-gray-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative order-1 lg:order-2">
        <OptimizedImage
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt}
          preset="hero"
          options={{
            className: "w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg",
            priority: true,
            fetchPriority: 'high'
          }}
        />
      </div>
    </article>
  )
}
