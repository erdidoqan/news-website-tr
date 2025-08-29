import { Suspense } from "react"
import type { Metadata } from "next"
import { ModernHeader } from "@/components/modern-header"
import { Footer } from "@/components/footer"
import { SiteProvider } from "@/components/site-provider"
import { getRelatedCategories } from "@/lib/categories"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Kategorileri grid şeklinde gösteren component
async function CategoriesGrid() {
  // Tüm kategorileri getir (limit yüksek tutarak hepsini al)
  const categories = await getRelatedCategories("", 50)

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Henüz kategori bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.slug} href={`/kategori/${category.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
                  {category.name}
                </CardTitle>
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-600">
                {category.count} makale mevcut
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

// Loading skeleton component
function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-8"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function CategoriesPage() {
  return (
    <SiteProvider>
      <div className="min-h-screen bg-white">
        <ModernHeader />

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tüm Kategoriler
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İlgilendiğiniz konulara göre kategorileri keşfedin ve en güncel haberleri takip edin.
            </p>
          </div>

          {/* Categories Grid */}
          <Suspense fallback={<CategoriesGridSkeleton />}>
            <CategoriesGrid />
          </Suspense>
        </div>

        <Footer />
      </div>
    </SiteProvider>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  // Kategorileri getir
  const categories = await getRelatedCategories("", 50)
  const totalCategories = categories.length
  const totalArticles = categories.reduce((sum, cat) => sum + cat.count, 0)

  return {
    title: "Tüm Kategoriler - Haber Merkezi",
    description: `Haber Merkezi'ndeki ${totalCategories} kategoride toplam ${totalArticles} haber bulunuyor. Teknoloji, yazılım, donanım, mobil ve daha fazlası. İlgilendiğiniz kategorileri keşfedin.`,
    keywords: "kategoriler, haber kategorileri, teknoloji, yazılım, donanım, mobil, AI, blockchain, IoT, güncel haberler",
    openGraph: {
      title: "Tüm Kategoriler - Haber Merkezi",
      description: `${totalCategories} kategoride ${totalArticles} güncel haber. İlgilendiğiniz konulara göre kategorileri keşfedin.`,
      url: "http://localhost:3000/kategori",
      siteName: "Haber Merkezi",
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: "Tüm Kategoriler - Haber Merkezi",
      description: `${totalCategories} kategoride ${totalArticles} güncel haber. İlgilendiğiniz konulara göre kategorileri keşfedin.`,
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
      canonical: "http://localhost:3000/kategori",
    },
    other: {
      'og:type': 'website',
      'article:section': 'Kategoriler',
    }
  }
}
