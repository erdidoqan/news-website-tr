import { TrendingUp } from "lucide-react"

const trendingStories = [
  {
    title: "Ekonomide son gelişmeler ve piyasa analizi",
    readTime: "3 dk",
  },
  {
    title: "Teknoloji sektöründe yeni yatırımlar",
    readTime: "5 dk",
  },
  {
    title: "Spor dünyasından transfer haberleri",
    readTime: "2 dk",
  },
  {
    title: "Sağlık alanında çığır açan araştırma",
    readTime: "4 dk",
  },
  {
    title: "Çevre politikalarında yeni düzenlemeler",
    readTime: "6 dk",
  },
]

export function TrendingStories() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-red-600" />
        <h3 className="font-serif text-lg font-bold text-gray-900">Trend Haberler</h3>
      </div>

      <div className="space-y-4">
        {trendingStories.map((story, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded min-w-[24px] text-center">
              {index + 1}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 leading-tight mb-1 hover:text-gray-700 cursor-pointer">
                {story.title}
              </h4>
              <span className="text-xs text-gray-500">{story.readTime} okuma</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
