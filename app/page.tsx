import type { Metadata } from "next"
import { ModernHeader } from "@/components/modern-header"
import { BreakingNews } from "@/components/breaking-news"
import { Sidebar } from "@/components/sidebar"
import { FooterSections } from "@/components/footer-sections"
import { Footer } from "@/components/footer"
import { TrendingStories } from "@/components/trending-stories"
import { SiteProvider } from "@/components/site-provider"
import { HomepageNewsList } from "@/components/homepage-news-list"
import { StructuredData } from "@/components/structured-data"
import { siteApi } from "@/lib/site-api"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteResponse = await siteApi.getSiteInfo()
    const siteInfo = siteResponse.data
    
    if (siteInfo) {
      const siteName = siteInfo.name
      return {
        title: siteInfo.settings?.seo?.meta_title || `${siteName} - Güncel Haberler ve Analizler`,
        description: siteInfo.settings?.seo?.meta_description || siteInfo.description || "En güncel haberler, son dakika gelişmeleri ve derinlemesine analizler. Teknoloji, ekonomi, siyaset ve daha fazlası.",
        keywords: siteInfo.settings?.seo?.meta_keywords || "haber, güncel, son dakika, analiz, teknoloji, ekonomi, siyaset",
        openGraph: {
          title: siteName,
          description: siteInfo.description || "En güncel haberler ve analizler",
          url: siteInfo.domain || "http://localhost:3000",
          siteName: siteName,
          locale: siteInfo.language === 'tr' ? 'tr_TR' : 'en_US',
          type: 'website',
          images: siteInfo.logo?.url ? [{
            url: siteInfo.logo.url,
            width: 1200,
            height: 630,
            alt: `${siteInfo.name} Logo`
          }] : []
        },
        twitter: {
          card: 'summary_large_image',
          title: siteName,
          description: siteInfo.description || "En güncel haberler ve analizler",
          images: siteInfo.logo?.url ? [siteInfo.logo.url] : [],
          creator: '@habermerkezi',
          site: '@habermerkezi'
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
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
        alternates: {
          canonical: siteInfo.domain || "http://localhost:3000",
        }
      }
    }
  } catch (error) {
    console.error('Error generating homepage metadata:', error)
  }
  
  // Fallback metadata
  return {
    title: "Haber Merkezi - Güncel Haberler ve Analizler",
    description: "En güncel haberler, son dakika gelişmeleri ve derinlemesine analizler. Teknoloji, ekonomi, siyaset ve daha fazlası.",
    keywords: "haber, güncel, son dakika, analiz, teknoloji, ekonomi, siyaset",
    openGraph: {
      title: "Haber Merkezi",
      description: "En güncel haberler ve analizler",
      url: "http://localhost:3000",
      siteName: "Haber Merkezi",
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Haber Merkezi",
      description: "En güncel haberler ve analizler",
      creator: '@habermerkezi',
      site: '@habermerkezi'
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default async function HomePage() {
  // Site bilgilerini al
  const siteResponse = await siteApi.getSiteInfo()
  const siteInfo = siteResponse.data

  return (
    <SiteProvider>
      <div className="min-h-screen bg-white">
        {/* Structured Data */}
        {siteInfo && (
          <>
            <StructuredData
              type="website"
              data={{
                name: siteInfo.name,
                description: siteInfo.description,
                url: siteInfo.domain || "http://localhost:3000",
                logo: siteInfo.logo?.url
              }}
            />
            <StructuredData
              type="organization"
              data={{
                name: siteInfo.name,
                description: siteInfo.description,
                url: siteInfo.domain || "http://localhost:3000",
                logo: siteInfo.logo?.url,
                socialMedia: siteInfo.social_media,
                contact: siteInfo.settings?.contact
              }}
            />
          </>
        )}
        
        <ModernHeader />

        <BreakingNews />

        <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          {/* Ana haber listesi - tam genişlik, daha yoğun */}
          <div className="mb-8">
            <HomepageNewsList 
              title="Son Haberler"
              limit={24}
              showLoadMore={true}
              className=""
            />
          </div>

          {/* İki sütun layout - kategoriler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <HomepageNewsList 
              title="Teknoloji"
              categorySlug="yazilim-gelisim"
              limit={6}
              showLoadMore={false}
              compact={true}
              className="border border-gray-200 rounded-lg p-6"
            />
            
            <HomepageNewsList 
              title="Donanım"
              categorySlug="donanim-yenilikler"
              limit={6}
              showLoadMore={false}
              compact={true}
              className="border border-gray-200 rounded-lg p-6"
            />
          </div>

          {/* Üç sütun layout - daha fazla kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <HomepageNewsList 
              title="Mobil"
              categorySlug="mobil-uygulamalar"
              limit={4}
              showLoadMore={false}
              compact={true}
              className="border border-gray-200 rounded-lg p-4"
            />
            
            <HomepageNewsList 
              title="AI & Blockchain"
              categorySlug="ai"
              limit={4}
              showLoadMore={false}
              compact={true}
              className="border border-gray-200 rounded-lg p-4"
            />
            
            <HomepageNewsList 
              title="İncelemeler"
              categorySlug="incelemeler"
              limit={4}
              showLoadMore={false}
              compact={true}
              className="border border-gray-200 rounded-lg p-4"
            />
          </div>

          {/* Mobile trending */}
          <div className="lg:hidden">
            <TrendingStories />
          </div>
        </main>

        <FooterSections />

        <Footer />
      </div>
    </SiteProvider>
  )
}
