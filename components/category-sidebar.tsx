import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface CategorySidebarProps {
  relatedCategories: Array<{
    name: string
    slug: string
    count: number
  }>
  popularTags: string[]
}

export function CategorySidebar({ relatedCategories, popularTags }: CategorySidebarProps) {
  return (
    <div className="space-y-8">
      {/* Related Categories */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">İlgili Kategoriler</h3>
        <div className="space-y-3">
          {relatedCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/kategori/${category.slug}`}
              className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Popüler Etiketler</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-red-50 hover:border-red-200 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
