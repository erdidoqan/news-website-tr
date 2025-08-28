import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface FooterSectionItem {
  id: string
  title: string
  excerpt?: string
  publishedAt?: string
}

interface FooterSectionProps {
  title: string
  featuredImage: string
  featuredTitle: string
  featuredExcerpt?: string
  items: FooterSectionItem[]
  subscriberOnly?: boolean
}

function FooterSection({
  title,
  featuredImage,
  featuredTitle,
  featuredExcerpt,
  items,
  subscriberOnly,
}: FooterSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <h3 className="text-xl font-bold text-black font-serif">{title}</h3>
        <ChevronRight className="w-4 h-4 text-gray-600" />
      </div>

      {/* Featured Item */}
      <div className="space-y-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt={featuredTitle}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-black font-serif text-base leading-tight hover:text-blue-600 cursor-pointer transition-colors">
            {featuredTitle}
          </h4>
          {featuredExcerpt && <p className="text-gray-600 text-sm leading-relaxed">{featuredExcerpt}</p>}
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-3 pt-2">
        {subscriberOnly && (
          <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">Abone İçeriği</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <h5 className="text-sm font-medium text-black group-hover:text-blue-600 transition-colors leading-tight">
              {item.title}
            </h5>
            {item.excerpt && <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.excerpt}</p>}
            {item.publishedAt && <span className="text-xs text-gray-500 mt-1 block">{item.publishedAt}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function FooterSections() {
  const sections = [
    {
      title: "Yapılacaklar",
      featuredImage: "/placeholder.svg?height=300&width=400",
      featuredTitle: "İstanbul'da en iyi Pazar nasıl geçirilir, Manny Jacinto'ya göre",
      featuredExcerpt: "Ünlü oyuncunun şehirdeki favori mekanları ve aktiviteleri",
      items: [
        {
          id: "1",
          title: "Kitap Severler Günü'nü kutlamak için İstanbul'daki 8 romantik mekan",
        },
        {
          id: "2",
          title: "İstanbul'da en iyi Pazar nasıl geçirilir, Alan Tudyk'a göre",
        },
        {
          id: "3",
          title: "Ankara geri dönüş döneminde mi? İşte şehirde yapılacak 12 yeni şey",
        },
      ],
    },
    {
      title: "Yaşam Hikayeleri",
      featuredImage: "/placeholder.svg?height=300&width=400",
      featuredTitle:
        "Yaşam Hikayeleri: Hayatımı zenginleştirmek ve tatlandırmak için ne istediğimi biliyordum. Etik olmayan tek eşlilik arıyordum",
      items: [
        {
          id: "1",
          title: "Yaşam Hikayeleri: O nazik ve zengindi. Pahalı hediyeleri daha karanlık bir şeye işaret ediyordu",
        },
        {
          id: "2",
          title: "Yaşam Hikayeleri: Köpeğim randevuma ısırdı. Ondan tekrar haber alır mıyım?",
        },
        {
          id: "3",
          title:
            "Yaşam Hikayeleri: Eğlenceli, gizemli bir adama cesurca numaramı verdim. Daha sonra onu Google'da aramamalı mıydım?",
        },
      ],
    },
    {
      title: "Araştırmalar",
      featuredImage: "/placeholder.svg?height=300&width=400",
      featuredTitle: "Kirlilik korkuları devlet esrar ajansını yeniden yapılandırma baskısını artırıyor",
      featuredExcerpt: "Kaliforniya milletvekilleri köpek brokerlarından satışları yasaklamayı öneriyor",
      subscriberOnly: true,
      items: [
        {
          id: "1",
          title: "Palisades'ten kaçış: İkinci karar vermeyi kafa karıştırıcı yanıtlar böldü",
        },
        {
          id: "2",
          title: "Eski NBA oyuncusunun 5 milyar dolarlık Las Vegas arenası planı boş bir çukur. Ne yanlış gitti?",
        },
      ],
    },
    {
      title: "Vefat İlanları",
      featuredImage: "/placeholder.svg?height=300&width=400",
      featuredTitle: "Art Fein, Los Angeles rock sahnesinin rönesans adamı, 79 yaşında öldü",
      featuredExcerpt:
        "1970'lerde 'What's Happening!!' dizisinde Dee rolünü oynayan eski çocuk oyuncu Danielle Spencer 60 yaşında öldü",
      items: [
        {
          id: "1",
          title: "Brandon Blackstock'un ölüm nedeni açıklandı, kanser savaşı hakkında ayrıntılar doğrulandı",
        },
        {
          id: "2",
          title: "Malcolm-Jamal Warner'ın ölümünden sonra düşünceli anma yazısında, annesi 'onun zamanıydı' diyor",
        },
      ],
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {sections.map((section, index) => (
          <FooterSection key={index} {...section} />
        ))}
      </div>
    </section>
  )
}
