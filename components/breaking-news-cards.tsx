import { Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const breakingNewsCards = [
  {
    title: "Merkez Bankası Faiz Kararını Açıkladı: Piyasalar Nasıl Tepki Verdi?",
    excerpt:
      "Merkez Bankası'nın beklenen faiz kararı sonrası döviz kurları ve borsa endekslerinde önemli hareketler yaşandı.",
    time: "10 dakika önce",
    category: "Ekonomi",
    urgent: true,
  },
  {
    title: "İstanbul'da Trafik Kazası: Ana Arterde Uzun Kuyruklar Oluştu",
    excerpt: "TEM Otoyolu'nda meydana gelen zincirleme kaza nedeniyle trafik durma noktasına geldi.",
    time: "15 dakika önce",
    category: "Gündem",
    urgent: false,
  },
  {
    title: "Teknoloji Devinden Türkiye'ye Büyük Yatırım Açıklaması",
    excerpt:
      "Küresel teknoloji şirketi, Türkiye'de yeni Ar-Ge merkezi kuracağını ve binlerce kişi istihdam edeceğini duyurdu.",
    time: "22 dakika önce",
    category: "Teknoloji",
    urgent: false,
  },
]

export function BreakingNewsCards() {
  return (
    <section className="py-6 sm:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">Son Dakika Haberleri</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {breakingNewsCards.map((news, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={news.urgent ? "destructive" : "secondary"} className="text-xs">
                    {news.category}
                  </Badge>
                  {news.urgent && (
                    <div className="flex items-center gap-1 text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">ACIL</span>
                    </div>
                  )}
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 leading-tight hover:text-gray-700">
                  {news.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">{news.excerpt}</p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{news.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
