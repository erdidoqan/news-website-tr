import { Badge } from "@/components/ui/badge"

interface TrendingArticle {
  id: string
  title: string
  image: string
  category?: string
  isSponsored?: boolean
}

interface TrendingSectionProps {
  articles?: TrendingArticle[]
}

export function TrendingSection({ articles }: TrendingSectionProps) {
  // Mock data - replace with API data
  const defaultArticles: TrendingArticle[] = [
    {
      id: "1",
      title: "Merkez Vadisi ev sahipleri mülk değerlerinin düşmesini izliyor",
      image: "/placeholder.svg?height=200&width=300",
      category: "Emlak",
    },
    {
      id: "2",
      title: "Kaliforniya'nın burger savaşları Habit Burger & Grill'in In-N-Out'a rakip olmasıyla kızışıyor",
      image: "/placeholder.svg?height=200&width=300",
      category: "İş Dünyası",
    },
    {
      id: "3",
      title: "İstanbul'da çılgın bir kovalamacaya öncülük ettiler, sonra polise teslim oldular",
      image: "/placeholder.svg?height=200&width=300",
      category: "Gündem",
      isSponsored: true,
    },
  ]

  const displayArticles = articles || defaultArticles

  return (
    <section className="w-full py-8 mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold font-serif">Trend Haberler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArticles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="space-y-3">
                <div className="aspect-[4/3] overflow-hidden rounded-lg relative">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {article.isSponsored && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
                        SPONSORLU
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {article.category && (
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  )}

                  <h3 className="font-serif font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
