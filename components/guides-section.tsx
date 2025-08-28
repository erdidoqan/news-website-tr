interface Guide {
  id: string
  title: string
  image: string
  category?: string
  color: string
}

interface GuidesSectionProps {
  guides?: Guide[]
}

export function GuidesSection({ guides }: GuidesSectionProps) {
  // Mock data - replace with API data
  const defaultGuides: Guide[] = [
    {
      id: "1",
      title: "İstanbul'da en iyi İtalyan sandviçlerini nerede bulabilirsiniz",
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-pink-100",
    },
    {
      id: "2",
      title: "İstanbul çevresinde araba mesafesinde en sevdiğimiz 'ruh sağlığı kaçışları'",
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-blue-100",
    },
    {
      id: "3",
      title: "İstanbul ve çevresindeki en iyi 8 klasik ton balığı sandviçi",
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-amber-100",
    },
    {
      id: "4",
      title: "Haydarpaşa Garı'ndan trenle yapabileceğiniz 7 muhteşem günübirlik gezi",
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-gray-100",
    },
    {
      id: "5",
      title: "En iyi vintage, sıfır atık tatil hediyeleri bulabileceğiniz 34 İstanbul bit pazarı",
      image: "/placeholder.svg?height=200&width=300",
      color: "bg-purple-100",
      category: "ABONELERİMİZ İÇİN",
    },
  ]

  const displayGuides = guides || defaultGuides

  return (
    <section className="w-full py-8 mb-8 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold font-serif">Rehberler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayGuides.map((guide) => (
            <article key={guide.id} className="group cursor-pointer">
              <div className={`${guide.color} rounded-lg p-4 h-full`}>
                <div className="space-y-3">
                  {guide.category && (
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{guide.category}</div>
                  )}

                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-serif font-bold text-sm leading-tight group-hover:text-blue-600 transition-colors">
                    {guide.title}
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
