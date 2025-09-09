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
      const siteName = siteInfo.name
                 return {
             metadataBase: new URL(siteInfo.domain || 'http://localhost:3000'),
             title: siteInfo.settings.seo.meta_title || siteName || "Haber Sitesi - Güncel Haberler",
             description: siteInfo.settings.seo.meta_description || siteInfo.description || "En güncel haberler ve analizler",
             keywords: siteInfo.settings.seo.meta_keywords || undefined,
             generator: "News Website",
                     icons: faviconLinks.map(favicon => ({
          rel: favicon.rel,
          url: favicon.href,
          sizes: favicon.sizes,
          type: favicon.type,
        })),
        openGraph: {
          type: 'website',
          siteName: siteName,
          locale: siteInfo.language === 'tr' ? 'tr_TR' : 'en_US',
        },
        twitter: {
          card: 'summary_large_image',
          site: '@habermerkezi',
          creator: '@habermerkezi',
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
          yandex: process.env.YANDEX_VERIFICATION,
          'msvalidate.01': process.env.BING_SITE_VERIFICATION,
        },
        other: {
          language: siteInfo.language,
          'format-detection': 'telephone=no',
          'theme-color': '#ffffff',
          'msapplication-TileColor': '#da532c',
          'apple-mobile-web-app-capable': 'yes',
          'apple-mobile-web-app-status-bar-style': 'default',
          'mobile-web-app-capable': 'yes',
        }
           }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
  }
  
  // Fallback metadata with local favicons
  const fallbackFavicons = getFaviconLinks()
  
  return {
    metadataBase: new URL('http://localhost:3000'),
    title: "Haber Merkezi - Güncel Haberler ve Analizler",
    description: "En güncel haberler, son dakika gelişmeleri ve derinlemesine analizler. Teknoloji, ekonomi, siyaset ve daha fazlası.",
    keywords: "haber, güncel, son dakika, analiz, teknoloji, ekonomi, siyaset",
    generator: "News Website",
    icons: fallbackFavicons.map(favicon => ({
      rel: favicon.rel,
      url: favicon.href,
      sizes: favicon.sizes,
      type: favicon.type,
    })),
    openGraph: {
      type: 'website',
      siteName: "Haber Merkezi",
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@habermerkezi',
      creator: '@habermerkezi',
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
      yandex: process.env.YANDEX_VERIFICATION,
      'msvalidate.01': process.env.BING_SITE_VERIFICATION,
    },
    other: {
      'format-detection': 'telephone=no',
      'theme-color': '#ffffff',
      'msapplication-TileColor': '#da532c',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'mobile-web-app-capable': 'yes',
    }
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
