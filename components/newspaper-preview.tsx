import Image from "next/image"

export function NewspaperPreview() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Bugünün Gazetesi</h3>
        <p className="text-sm text-gray-600">Dijital gazete deneyimini yaşayın</p>
      </div>

      <div className="relative mb-4">
        <Image
          src="/placeholder.svg?height=300&width=200"
          alt="Bugünün gazete ön sayfası"
          width={200}
          height={300}
          className="w-full h-auto rounded border shadow-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded"></div>
      </div>

      <button className="w-full bg-gray-900 text-white py-2 px-4 rounded font-medium hover:bg-gray-800 transition-colors">
        Gazeteyi Oku
      </button>
    </div>
  )
}
