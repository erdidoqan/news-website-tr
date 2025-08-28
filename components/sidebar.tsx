import { NewspaperPreview } from "./newspaper-preview"
import { AppDownload } from "./app-download"
import { TrendingStories } from "./trending-stories"
import { NewsletterSignup } from "./newsletter-signup"

export function Sidebar() {
  return (
    <aside className="space-y-6">
      <NewspaperPreview />
      <AppDownload />
      <TrendingStories />
      <NewsletterSignup />
    </aside>
  )
}
