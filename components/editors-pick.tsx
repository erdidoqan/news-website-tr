import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface EditorsPickProps {
  article?: {
    id: string
    title: string
    excerpt: string
    category: string
    image: string
    author: string
    publishedAt: string
    readTime: string
  }
}

export function EditorsPick({ article }: EditorsPickProps) {
  // Mock data - replace with API data
  const defaultArticle = {
    id: "1",
    title: "Önce ve sonra: Eski evlerini yıkıp modern bir havuz evi inşa ettiler",
    excerpt:
      "Emeklilik döneminde, bir çift Kadıköy'deki eski evlerini yıkarak 1960'lardan kalma havuzun etrafında modern bir ev inşa etti. Yeni tasarım, geçmişle geleceği harmanlayan benzersiz bir yaşam alanı sunuyor.",
    category: "YAŞAM",
    image: "/placeholder.svg?height=400&width=600",
    author: "Ayşe Demir",
    publishedAt: "2 saat önce",
    readTime: "5 dk okuma",
  }

  const displayArticle = article || defaultArticle

  return (
    <section className="w-full bg-black text-white py-8 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-serif tracking-wide">EDİTÖRÜN SEÇİMİ</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-gray-700 text-white hover:bg-gray-600">
              {displayArticle.category}
            </Badge>

            <h3 className="text-3xl lg:text-4xl font-serif font-bold leading-tight">{displayArticle.title}</h3>

            <p className="text-gray-300 text-lg leading-relaxed">{displayArticle.excerpt}</p>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{displayArticle.author}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{displayArticle.readTime}</span>
              </div>
              <span>•</span>
              <span>{displayArticle.publishedAt}</span>
            </div>
          </div>

          {/* Image */}
          <div className="order-first lg:order-last">
            <img
              src={displayArticle.image || "/placeholder.svg"}
              alt={displayArticle.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
