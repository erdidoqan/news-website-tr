import { StoryCard } from "./story-card"

// Mock data - will be replaced with API data
const mockSecondaryStories = [
  {
    title: "Putin'in Yeni Stratejisi: Küresel Siyasette Değişen Dengeler",
    excerpt:
      "Rusya lideri Putin'in son açıklamaları uluslararası ilişkilerde yeni bir dönemin başlangıcını işaret ediyor.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    imageAlt: "Putin siyasi toplantıda",
    category: "Dünya",
    publishedAt: "2 saat önce",
  },
  {
    title: "Kaliforniya'da Orman Yangınları: İklim Değişikliğinin Etkisi",
    excerpt: "Kaliforniya'da devam eden orman yangınları, iklim değişikliğinin somut etkilerini gözler önüne seriyor.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    imageAlt: "Kaliforniya orman yangını",
    category: "Çevre",
    publishedAt: "4 saat önce",
  },
  {
    title: "Teknoloji Devlerinin Yapay Zeka Yarışı Kızışıyor",
    excerpt: "Google, Microsoft ve OpenAI arasındaki yapay zeka rekabeti yeni boyutlara ulaşıyor.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    imageAlt: "Yapay zeka teknolojisi",
    category: "Teknoloji",
    publishedAt: "6 saat önce",
  },
  {
    title: "Spor Dünyasında Büyük Transfer: Yıldız Oyuncu Anlaşması",
    excerpt: "Futbol dünyasını sarsan transfer haberi, kulüpler arasında yeni dengelerin oluşmasına neden oluyor.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    imageAlt: "Futbol transfer haberi",
    category: "Spor",
    publishedAt: "8 saat önce",
  },
  {
    title: "Ekonomide Yeni Dönem: Merkez Bankası Kararları",
    excerpt: "Merkez Bankası'nın faiz kararı piyasalarda olumlu karşılandı, borsa yükselişe geçti.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    imageAlt: "Merkez Bankası ekonomi",
    category: "Ekonomi",
    publishedAt: "10 saat önce",
  },
  {
    title: "Sağlık Alanında Çığır Açan Keşif",
    excerpt: "Türk bilim insanlarının yaptığı araştırma, kanser tedavisinde yeni umutlar yaratıyor.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    imageAlt: "Tıbbi araştırma laboratuvarı",
    category: "Sağlık",
    publishedAt: "12 saat önce",
  },
]

export function SecondaryStoriesGrid() {
  return (
    <section className="py-12 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Diğer Haberler</h2>
        <div className="w-12 h-1 bg-gray-400"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockSecondaryStories.map((story, index) => (
          <StoryCard key={index} {...story} size={index < 3 ? "medium" : "small"} />
        ))}
      </div>
    </section>
  )
}
