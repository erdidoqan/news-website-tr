import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface StoryCardProps {
  title: string
  excerpt?: string
  imageUrl: string
  imageAlt: string
  category: string
  publishedAt: string
  size?: "small" | "medium" | "large"
  href?: string
}

export function StoryCard({
  title,
  excerpt,
  imageUrl,
  imageAlt,
  category,
  publishedAt,
  size = "medium",
  href,
}: StoryCardProps) {
  const sizeClasses = {
    small: "h-48",
    medium: "h-64",
    large: "h-80",
  }

  const titleSizes = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-2xl",
  }

  const content = (
    <article className="group cursor-pointer">
      <div className="space-y-3">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            width={400}
            height={300}
            className={`w-full ${sizeClasses[size]} object-cover transition-transform duration-300 group-hover:scale-105`}
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="text-xs font-medium bg-white/90 text-gray-800">
              {category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3
            className={`font-serif ${titleSizes[size]} font-bold leading-tight text-gray-900 group-hover:text-gray-700 transition-colors`}
          >
            {title}
          </h3>
          {excerpt && <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{excerpt}</p>}
          <div className="text-xs text-gray-500">{publishedAt}</div>
        </div>
      </div>
    </article>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
