import { Smartphone } from "lucide-react"

export function AppDownload() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="bg-blue-600 p-3 rounded-lg">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">Haber Merkezi Uygulaması</h3>
          <p className="text-sm text-gray-600 mb-4">Son dakika haberlerini kaçırmayın. Mobil uygulamamızı indirin.</p>
          <div className="space-y-2">
            <button className="w-full bg-black text-white py-2 px-4 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
              App Store'dan İndir
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-green-700 transition-colors">
              Google Play'den İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
