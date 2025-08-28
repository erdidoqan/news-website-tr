import { Play } from "lucide-react"

interface ArtsArticle {
  id: string
  title: string
  image: string
  category: string
  hasVideo?: boolean
}

interface ArtsLifestyleProps {
  articles?: ArtsArticle[]
}

export function ArtsLifestyle({ articles }: ArtsLifestyleProps) {
  // Mock data - replace with API data
  const defaultArticles: ArtsArticle[] = [
    {
      id: "1",
      title: "'Matlock'tan önce: Kathy Bates kariyerinin 'kuruduğu' konusunda endişeliydi",
      image: "/placeholder.svg?height=200&width=300",
      category: "Sanat & Yaşam",
      hasVideo: true,
    },
    {
      id: "2",
      title: "Danielle Brooks 'Minecraft' ile büyük bir hit yakaladı: 'Peacemaker'ın dönüşü süper yılına ekleniyor",
      image: "/placeholder.svg?height=200&width=300",
      category: "Sanat & Yaşam",
    },
    {
      id: "3",
      title: "Nostaljik bir plak fuarı Cumartesi günü Sunset Strip'i ele geçiriyor. İşte bilmeniz gereken 5 şey",
      image: "/placeholder.svg?height=200&width=300",
      category: "Sanat & Yaşam",
    },
  ]

  const displayArticles = articles || defaultArticles

  return (
    <section className="w-full py-8 mb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold font-serif">Sanat & Yaşam</h2>
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
                  {article.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-60 rounded-full p-3">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
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
