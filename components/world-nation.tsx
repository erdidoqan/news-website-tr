import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface WorldNationArticle {
  id: string
  title: string
  excerpt?: string
  image: string
  category: string
  publishedAt: string
  isMainStory?: boolean
}

interface WorldNationProps {
  articles?: WorldNationArticle[]
}

export function WorldNation({ articles }: WorldNationProps) {
  // Mock data - replace with API data
  const defaultArticles: WorldNationArticle[] = [
    {
      id: "1",
      title: "Türkiye'deki siyasi gelişmeler uluslararası arenada yankı buluyor",
      excerpt:
        "Cumhurbaşkanı Erdoğan'ın son açıklamaları AB ve ABD'de dikkatle takip ediliyor. Dış politika uzmanları gelişmelerin bölgesel dengeleri etkileyebileceğini belirtiyor.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Politika",
      publishedAt: "2 saat önce",
      isMainStory: true,
    },
    {
      id: "2",
      title: "Gazze'deki çatışmalarda sivil kayıplar artıyor",
      excerpt: "BM raporuna göre son bir haftada 150'den fazla sivil hayatını kaybetti.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Dünya",
      publishedAt: "3 saat önce",
    },
    {
      id: "3",
      title: "ABD'de seçim kampanyası hızlanıyor",
      excerpt: "Başkan adayları kritik eyaletlerde yoğun kampanya yürütüyor.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Dünya",
      publishedAt: "4 saat önce",
    },
    {
      id: "4",
      title: "Ukrayna'da kış hazırlıkları sürüyor",
      excerpt: "Enerji altyapısına yönelik saldırılar endişe yaratıyor.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Dünya",
      publishedAt: "5 saat önce",
    },
    {
      id: "5",
      title: "Avrupa'da enerji krizi derinleşiyor",
      excerpt: "Doğal gaz fiyatları rekor seviyelere ulaştı.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Ekonomi",
      publishedAt: "6 saat önce",
    },
    {
      id: "6",
      title: "Çin'de COVID-19 vakaları artışta",
      excerpt: "Yeni varyant endişesi sağlık otoritelerini alarma geçirdi.",
      image: "/placeholder.svg?height=200&width=300",
      category: "Sağlık",
      publishedAt: "7 saat önce",
    },
  ]

  const displayArticles = articles || defaultArticles
  const mainStory = displayArticles.find((article) => article.isMainStory) || displayArticles[0]
  const sideStories = displayArticles.filter((article) => !article.isMainStory).slice(0, 5)

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-black font-serif">Dünya & Ülke</h2>
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Story */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src={mainStory.image || "/placeholder.svg"} alt={mainStory.title} fill className="object-cover" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-black font-serif leading-tight hover:text-blue-600 cursor-pointer transition-colors">
              {mainStory.title}
            </h3>
            {mainStory.excerpt && <p className="text-gray-600 text-base leading-relaxed">{mainStory.excerpt}</p>}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {mainStory.category}
              </span>
              <span>{mainStory.publishedAt}</span>
            </div>
          </div>
        </div>

        {/* Side Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sideStories.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-black font-serif text-sm leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h4>
                  {article.excerpt && (
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{article.category}</span>
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
