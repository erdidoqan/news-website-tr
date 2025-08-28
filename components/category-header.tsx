import { Badge } from "@/components/ui/badge"

interface CategoryHeaderProps {
  title: string
  description: string
  articleCount: number
}

export function CategoryHeader({ title, description, articleCount }: CategoryHeaderProps) {
  return (
    <div className="border-b border-gray-200 pb-8 mb-8">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-4xl font-serif font-bold text-gray-900">{title}</h1>
        <Badge variant="secondary" className="text-sm">
          {articleCount} haber
        </Badge>
      </div>
      <p className="text-lg text-gray-600 max-w-3xl">{description}</p>
    </div>
  )
}
