import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { CategoryBreadcrumb } from "@/components/category-breadcrumb"
import { CategoryHeader } from "@/components/category-header"
import { NewsListing } from "@/components/news-listing"
import { CategorySidebar } from "@/components/category-sidebar"
import { Pagination } from "@/components/pagination"
import { getCategoryBySlug, getCategoryArticles, getRelatedCategories } from "@/lib/categories"
import { SiteProvider } from "@/components/site-provider"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    sayfa?: string
  }>
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { sayfa } = await searchParams
  const currentPage = Number.parseInt(sayfa || "1", 10)
  const itemsPerPage = 12

  // Get category information
  const category = await getCategoryBySlug(slug)
  if (!category) {
    notFound()
  }

  // Get articles for this category
  const { articles, totalCount } = await getCategoryArticles(slug, currentPage, itemsPerPage)
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // Get related categories from API
  const relatedCategories = await getRelatedCategories(slug, 4)

  const popularTags = ["Son Dakika", "Ankara", "İstanbul", "Seçim", "Ekonomi", "Teknoloji"]

  return (
    <SiteProvider>
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
    </SiteProvider>
  )
}

export async function generateMetadata({ params, searchParams }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const { sayfa } = await searchParams
  const currentPage = Number.parseInt(sayfa || "1", 10)
  
  const category = await getCategoryBySlug(slug)
  const { articles, totalCount } = await getCategoryArticles(slug, currentPage, 12)

  if (!category) {
    return {
      title: "Kategori Bulunamadı - Haber Merkezi",
      description: "Aradığınız kategori bulunamadı.",
      robots: {
        index: false,
        follow: false,
      }
    }
  }

  const pageTitle = currentPage > 1 
    ? `${category.name} Haberleri - Sayfa ${currentPage} | Haber Merkezi`
    : `${category.name} Haberleri | Haber Merkezi`
  
  const pageDescription = currentPage > 1
    ? `${category.name} kategorisindeki haberler - Sayfa ${currentPage}. ${category.description || ''} Toplam ${totalCount} haber.`
    : `${category.name} kategorisindeki en güncel haberler. ${category.description || ''} ${totalCount} haber bulundu.`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: `${category.name.toLowerCase()}, ${slug}, haberler, güncel, ${category.name} haberleri`,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `http://localhost:3000/kategori/${slug}${currentPage > 1 ? `?sayfa=${currentPage}` : ''}`,
      siteName: "Haber Merkezi",
      locale: 'tr_TR',
      type: 'website',
      images: articles.length > 0 && articles[0].imageUrl ? [{
        url: articles[0].imageUrl,
        width: 1200,
        height: 630,
        alt: `${category.name} haberleri`
      }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: articles.length > 0 && articles[0].imageUrl ? [articles[0].imageUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `http://localhost:3000/kategori/${slug}${currentPage > 1 ? `?sayfa=${currentPage}` : ''}`,
    },
    other: {
      'article:section': category.name,
      'article:tag': category.name.toLowerCase(),
    }
  }
}
