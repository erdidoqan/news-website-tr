import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { CategoryBreadcrumb } from "@/components/category-breadcrumb"
import { CategoryHeader } from "@/components/category-header"
import { NewsListing } from "@/components/news-listing"
import { CategorySidebar } from "@/components/category-sidebar"
import { Pagination } from "@/components/pagination"
import { getCategoryBySlug, getCategoryArticles } from "@/lib/categories"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    sayfa?: string
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = params
  const currentPage = Number.parseInt(searchParams.sayfa || "1", 10)
  const itemsPerPage = 12

  // Get category information
  const category = getCategoryBySlug(slug)
  if (!category) {
    notFound()
  }

  // Get articles for this category
  const { articles, totalCount } = await getCategoryArticles(slug, currentPage, itemsPerPage)
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // Mock related categories and popular tags
  const relatedCategories = [
    { name: "Türkiye Siyaseti", slug: "turkiye-siyaseti", count: 45 },
    { name: "Ekonomi", slug: "ekonomi", count: 32 },
    { name: "Teknoloji", slug: "teknoloji", count: 28 },
    { name: "Spor", slug: "spor", count: 24 },
  ]

  const popularTags = ["Son Dakika", "Ankara", "İstanbul", "Seçim", "Ekonomi", "Teknoloji"]

  return (
    <div className="min-h-screen bg-white">
      <ModernHeader />

      <div className="container mx-auto px-4 py-8">
        <CategoryBreadcrumb categoryTitle={category.name} />

        <CategoryHeader title={category.name} description={category.description} articleCount={totalCount} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Suspense fallback={<NewsListing articles={[]} loading={true} />}>
              <NewsListing articles={articles} />
            </Suspense>

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/kategori/${slug}`} />
            )}
          </div>

          <div className="lg:col-span-1">
            <CategorySidebar relatedCategories={relatedCategories} popularTags={popularTags} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Kategori Bulunamadı",
    }
  }

  return {
    title: `${category.name} - Haber Merkezi`,
    description: category.description,
  }
}
