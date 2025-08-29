import type { Metadata } from "next"
import { ModernHeader } from "@/components/modern-header"
import { BreakingNews } from "@/components/breaking-news"
import { TopStoriesSection } from "@/components/top-stories-section"
import { SecondaryStoriesGrid } from "@/components/secondary-stories-grid"
import { BreakingNewsCards } from "@/components/breaking-news-cards"
import { Sidebar } from "@/components/sidebar"
import { EditorsPick } from "@/components/editors-pick"
import { OpinionVoices } from "@/components/opinion-voices"
import { GuidesSection } from "@/components/guides-section"
import { ArtsLifestyle } from "@/components/arts-lifestyle"
import { TrendingSection } from "@/components/trending-section"
import { WorldNation } from "@/components/world-nation"
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
      return {
        title: siteInfo.settings?.seo?.meta_title || `${siteInfo.name} - Güncel Haberler ve Analizler`,
        description: siteInfo.settings?.seo?.meta_description || siteInfo.description || "En güncel haberler, son dakika gelişmeleri ve derinlemesine analizler. Teknoloji, ekonomi, siyaset ve daha fazlası.",
        keywords: siteInfo.settings?.seo?.meta_keywords || "haber, güncel, son dakika, analiz, teknoloji, ekonomi, siyaset",
        openGraph: {
          title: siteInfo.name || "Haber Merkezi",
          description: siteInfo.description || "En güncel haberler ve analizler",
          url: siteInfo.domain || "http://localhost:3000",
          siteName: siteInfo.name || "Haber Merkezi",
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
          title: siteInfo.name || "Haber Merkezi",
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

        <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Main content area */}
            <div className="lg:col-span-3 space-y-8">
              <TopStoriesSection />
              <SecondaryStoriesGrid />
              
              {/* Homepage News List */}
              <HomepageNewsList 
                title="Son Haberler"
                limit={12}
                showLoadMore={true}
                className="pt-8 border-t border-gray-200"
              />
            </div>

            {/* Sidebar - hidden on mobile, shown on desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <Sidebar />
            </div>
          </div>

          {/* Mobile sidebar content - only show newspaper preview and trending on mobile */}
          <div className="lg:hidden mt-8 space-y-6">
            <TrendingStories />
          </div>
        </main>

        <BreakingNewsCards />

        <EditorsPick />
        <OpinionVoices />
        <GuidesSection />
        <ArtsLifestyle />
        <TrendingSection />

        <WorldNation />

        <FooterSections />

        <Footer />
      </div>
    </SiteProvider>
  )
}
