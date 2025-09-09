import { MainArticle } from "./main-article"

// Mock data - will be replaced with API data
const mockMainStory = {
  title: "Türkiye'de Ekonomik Gelişmeler: Yeni Dönemin Başlangıcı",
  excerpt:
    "Ekonomi uzmanları, son dönemde yaşanan gelişmelerin ülke ekonomisi üzerindeki etkilerini değerlendiriyor. Yeni politikaların hayata geçirilmesiyle birlikte önemli değişiklikler bekleniyor.",
  imageUrl: "/placeholder.svg?height=400&width=600",
  imageAlt: "Ekonomik gelişmeler hakkında haber görseli",
  category: "Ekonomi",
  publishedAt: new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
  bulletPoints: [
    "Merkez Bankası'ndan faiz kararı açıklaması bekleniyor",
    "İstanbul Borsası'nda yükseliş trendi devam ediyor",
    "Döviz kurlarında istikrar sağlanması hedefleniyor",
  ],
}

export function TopStoriesSection() {
  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Öne Çıkan Haberler</h2>
        <div className="w-16 h-1 bg-primary"></div>
      </div>

      <MainArticle {...mockMainStory} />
    </section>
  )
}
