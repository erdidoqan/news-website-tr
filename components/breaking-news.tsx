import { AlertCircle, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const breakingNewsItems = [
  {
    title: "Son Dakika: Ankara'da önemli ekonomi toplantısı başladı",
    time: "5 dk önce",
    urgent: true,
  },
  {
    title: "İstanbul Borsası rekor seviyeye ulaştı, uzmanlar değerlendiriyor",
    time: "12 dk önce",
    urgent: false,
  },
  {
    title: "Teknoloji sektöründe büyük birleşme açıklandı",
    time: "18 dk önce",
    urgent: false,
  },
  {
    title: "Spor: Milli takım kadrosu açıklandı, sürpriz isimler var",
    time: "25 dk önce",
    urgent: false,
  },
]

export function BreakingNews() {
  return (
    <section className="bg-red-600 text-white py-3 sm:py-4 mb-6 sm:mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Breaking News Label */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span className="font-bold text-sm sm:text-lg">SON DAKİKA</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-4 sm:gap-8 animate-scroll">
              {breakingNewsItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                  {item.urgent && (
                    <Badge variant="secondary" className="bg-yellow-400 text-red-600 text-xs hidden sm:inline-flex">
                      ACIL
                    </Badge>
                  )}
                  <span className="font-medium text-sm sm:text-base">{item.title}</span>
                  <span className="text-red-200 text-xs sm:text-sm hidden sm:inline">({item.time})</span>
                  {index < breakingNewsItems.length - 1 && <div className="w-1 h-1 bg-red-300 rounded-full"></div>}
                </div>
              ))}
            </div>
          </div>

          <button className="flex items-center gap-1 bg-red-700 hover:bg-red-800 px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors flex-shrink-0">
            <span className="hidden sm:inline">Tümü</span>
            <span className="sm:hidden">+</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
