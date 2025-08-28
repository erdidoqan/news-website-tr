'use client'

import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"
import { useSiteContext } from './site-provider'

export function Footer() {
  const { siteInfo } = useSiteContext()
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">
                {siteInfo?.name || 'Haber Merkezi'}
              </h3>
              <p className="text-gray-300 text-sm">
                {siteInfo?.description || 'Bir Türkiye Medya Yayını'}
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/subscribe" className="block text-sm hover:text-gray-300 transition-colors">
                Sınırsız erişim için abone olun
              </Link>
              <Link href="/sitemap" className="block text-sm hover:text-gray-300 transition-colors">
                Site Haritası
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Bizi Takip Edin</p>
              <div className="flex gap-3">
                {siteInfo?.social_media?.twitter && (
                  <Link
                    href={siteInfo.social_media.twitter}
                    className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </Link>
                )}
                {siteInfo?.social_media?.instagram && (
                  <Link
                    href={siteInfo.social_media.instagram}
                    className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </Link>
                )}
                {siteInfo?.social_media?.youtube && (
                  <Link
                    href={siteInfo.social_media.youtube}
                    className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </Link>
                )}
                {siteInfo?.social_media?.facebook && (
                  <Link
                    href={siteInfo.social_media.facebook}
                    className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </Link>
                )}
                {/* Show fallback social links if no site social media data */}
                {(!siteInfo?.social_media || Object.values(siteInfo.social_media).every(v => !v)) && (
                  <>
                    <Link
                      href="#"
                      className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <span className="text-xs font-bold">X</span>
                    </Link>
                    <Link
                      href="#"
                      className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </Link>
                    <Link
                      href="#"
                      className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                    </Link>
                    <Link
                      href="#"
                      className="w-8 h-8 border border-gray-600 rounded flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Link href="/enewspaper" className="block text-sm hover:text-gray-300 transition-colors">
                e-Gazete
              </Link>
              <Link href="/jobs" className="block text-sm hover:text-gray-300 transition-colors">
                İş İlanları Bul/Yayınla
              </Link>
              <Link href="/advertise" className="block text-sm hover:text-gray-300 transition-colors">
                Reklam Ver
              </Link>
              <Link href="/media-kit" className="block text-sm hover:text-gray-300 transition-colors">
                Medya Kiti: Neden Haber Merkezi?
              </Link>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Link href="/crossword" className="block text-sm hover:text-gray-300 transition-colors">
                Bulmaca
              </Link>
              <Link href="/obituaries" className="block text-sm hover:text-gray-300 transition-colors">
                Vefat İlanları
              </Link>
              <Link href="/recipes" className="block text-sm hover:text-gray-300 transition-colors">
                Tarifler
              </Link>
              <Link href="/guides" className="block text-sm hover:text-gray-300 transition-colors">
                Rehberler
              </Link>
              <Link href="/store" className="block text-sm hover:text-gray-300 transition-colors">
                Haber Merkezi Mağaza
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Link href="/about" className="block text-sm hover:text-gray-300 transition-colors">
                Hakkımızda/İletişim
              </Link>
              <Link href="/for-the-record" className="block text-sm hover:text-gray-300 transition-colors">
                Kayıtlar İçin
              </Link>
              <Link href="/careers" className="block text-sm hover:text-gray-300 transition-colors">
                Haber Merkezi Kariyer
              </Link>
              <Link href="/manage-subscription" className="block text-sm hover:text-gray-300 transition-colors">
                Aboneliği Yönet
              </Link>
              <Link href="/reprints" className="block text-sm hover:text-gray-300 transition-colors">
                Yeniden Basım ve İzinler
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-xs text-gray-400">
              <p>
                Telif Hakkı © 2025, {siteInfo?.name || 'Haber Merkezi'} |{" "}
                <Link href="/terms" className="hover:text-gray-300 transition-colors">
                  Hizmet Şartları
                </Link>{" "}
                |{" "}
                <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                  Gizlilik Politikası
                </Link>{" "}
                |{" "}
                <Link href="/ca-notice" className="hover:text-gray-300 transition-colors">
                  Kişisel Bilgi Toplama Bildirimi
                </Link>{" "}
                |{" "}
                <Link href="/do-not-sell" className="hover:text-gray-300 transition-colors">
                  Kişisel Bilgilerimi Satmayın veya Paylaşmayın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
