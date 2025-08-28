import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { siteApi } from "@/lib/site-api"
import { getFaviconLinks } from "@/lib/favicon-utils"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

// Dynamic metadata will be generated using generateMetadata function
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteResponse = await siteApi.getSiteInfo()
    const siteInfo = siteResponse.data
    
    // Favicon'ları local dosyalardan al
    const faviconLinks = getFaviconLinks()
    
    if (siteInfo) {
      return {
        title: siteInfo.settings.seo.meta_title || siteInfo.name || "Haber Sitesi - Güncel Haberler",
        description: siteInfo.settings.seo.meta_description || siteInfo.description || "En güncel haberler ve analizler",
        keywords: siteInfo.settings.seo.meta_keywords || undefined,
        generator: "News Website",
        icons: faviconLinks.map(favicon => ({
          rel: favicon.rel,
          url: favicon.href,
          sizes: favicon.sizes,
          type: favicon.type,
        })),
        other: {
          language: siteInfo.language,
        }
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
  }
  
  // Fallback metadata with local favicons
  const fallbackFavicons = getFaviconLinks()
  
  return {
    title: "Haber Sitesi - Güncel Haberler",
    description: "En güncel haberler ve analizler",
    generator: "News Website",
    icons: fallbackFavicons.map(favicon => ({
      rel: favicon.rel,
      url: favicon.href,
      sizes: favicon.sizes,
      type: favicon.type,
    })),
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
