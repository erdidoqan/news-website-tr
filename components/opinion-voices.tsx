import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

interface OpinionArticle {
  id: string
  title: string
  author: string
  category: string
  image: string
  publishedAt: string
}

interface OpinionVoicesProps {
  articles?: OpinionArticle[]
}

export function OpinionVoices({ articles }: OpinionVoicesProps) {
  // Mock data - replace with API data
  const defaultArticles: OpinionArticle[] = [
    {
      id: "1",
      title: "Katkı: Sıcaklık güvenlik yasası yeterli değil. Tarım işçileri hala risk altında",
      author: "Mehmet Özkan",
      category: "Görüşler",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "3 saat önce",
    },
    {
      id: "2",
      title: "Sakin: Erdoğan Amerika'yı Trump'tan daha kötü yapıyor",
      author: "Zeynep Tufekci",
      category: "Görüşler",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "4 saat önce",
    },
    {
      id: "3",
      title: "Katkı: Boğaziçi'nde farklı olarak, rektörün saldırısı öğrencileri hedef alıyor",
      author: "Prof. Dr. Ali Yılmaz",
      category: "Görüşler",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "5 saat önce",
    },
    {
      id: "4",
      title: "Köşe: 'Tarife Misyonu Tamamlandı' propagandası sadece bu kadar",
      author: "Ece Temelkuran",
      category: "Görüşler",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "6 saat önce",
    },
  ]

  const displayArticles = articles || defaultArticles

  return (
    <section className="w-full py-8 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold font-serif">Görüş Yazıları</h2>
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayArticles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="space-y-3">
                <div className="aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                    {article.category}
                  </Badge>

                  <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{article.author}</span>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
