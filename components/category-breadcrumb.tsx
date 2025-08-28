import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface CategoryBreadcrumbProps {
  categoryTitle: string
}

export function CategoryBreadcrumb({ categoryTitle }: CategoryBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      <Link href="/" className="hover:text-red-600 transition-colors">
        Ana Sayfa
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/kategori" className="hover:text-red-600 transition-colors">
        Kategoriler
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 font-medium">{categoryTitle}</span>
    </nav>
  )
}
