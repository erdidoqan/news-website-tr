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

export default function HomePage() {
  return (
    <SiteProvider>
      <div className="min-h-screen bg-white">
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
