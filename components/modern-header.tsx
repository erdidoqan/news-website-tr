"use client"
import * as React from "react"
import Link from "next/link"
import { Search, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { NewsMegaMenu } from "./news-mega-menu"
import { AnimatedHamburger } from "./animated-hamburger"
import { useSiteContext } from "./site-provider"

const newsMenuData = {
  topics: {
    title: "Konular",
    links: [
      { label: "Türkiye Siyaseti", href: "/kategori/turkiye-siyaseti" },
      { label: "Konut & Evsizlik", href: "/kategori/konut-evsizlik" },
      { label: "Depremler", href: "/kategori/depremler" },
      { label: "Eğitim", href: "/kategori/egitim" },
      { label: "İstanbul", href: "/kategori/istanbul" },
      { label: "Tüm Türkiye Haberleri", href: "/kategori/turkiye" },
    ],
  },
  lifestyle: {
    title: "Yaşam Tarzı",
    links: [
      { label: "Kültür Sanat", href: "/kategori/kultur-sanat" },
      { label: "Türk Mutfağı", href: "/kategori/turk-mutfagi" },
      { label: "Haber Merkezi Türkçe", href: "/kategori/haber-merkezi-turkce" },
      { label: "Dijital Platform", href: "/kategori/dijital-platform" },
    ],
  },
  voices: {
    title: "Köşe Yazarları",
    links: [
      { label: "Ahmet Hakan", href: "/kategori/ahmet-hakan" },
      { label: "Fatih Altaylı", href: "/kategori/fatih-altayli" },
      { label: "Mehmet Barlas", href: "/kategori/mehmet-barlas" },
      { label: "Nazlı Ilıcak", href: "/kategori/nazli-ilicak" },
      { label: "Yılmaz Özdil", href: "/kategori/yilmaz-ozdil" },
    ],
  },
  newsletters: {
    title: "Bültenler",
    links: [
      { label: "Günün Özeti", href: "/kategori/gunun-ozeti" },
      { label: "Bu Akşamın Önemli Haberleri", href: "/kategori/bu-aksamın-haberleri" },
      { label: "Haber Merkezi Siyaset", href: "/kategori/haber-merkezi-siyaset" },
      { label: "Ekonomi Bülteni", href: "/kategori/ekonomi-bulteni" },
      { label: "Haber Uyarıları", href: "/kategori/haber-uyarilari" },
    ],
  },
  more: {
    title: "Daha Fazla",
    links: [
      { label: "Etkili İsimler", href: "/kategori/etkili-isimler" },
      { label: "Haber Merkezi Bugün", href: "/kategori/haber-merkezi-bugun" },
      { label: "Fotoğrafçılık", href: "/kategori/fotografcilik" },
      { label: "Podcast'ler", href: "/kategori/podcastler" },
      { label: "Video", href: "/kategori/video" },
    ],
  },
}

const economyMenuData = {
  markets: {
    title: "Piyasalar",
    links: [
      { label: "Borsa İstanbul", href: "/kategori/borsa-istanbul" },
      { label: "Döviz Kurları", href: "/kategori/doviz-kurlari" },
      { label: "Altın Fiyatları", href: "/kategori/altin-fiyatlari" },
      { label: "Kripto Paralar", href: "/kategori/kripto-paralar" },
      { label: "Emtia Piyasaları", href: "/kategori/emtia-piyasalari" },
    ],
  },
  companies: {
    title: "Şirketler",
    links: [
      { label: "Halka Açık Şirketler", href: "/kategori/halka-acik-sirketler" },
      { label: "Şirket Haberleri", href: "/kategori/sirket-haberleri" },
      { label: "Mali Tablolar", href: "/kategori/mali-tablolar" },
      { label: "Yönetim Kurulu", href: "/kategori/yonetim-kurulu" },
    ],
  },
  policies: {
    title: "Ekonomi Politikaları",
    links: [
      { label: "Merkez Bankası", href: "/kategori/merkez-bankasi" },
      { label: "Maliye Politikaları", href: "/kategori/maliye-politikalari" },
      { label: "Vergi Düzenlemeleri", href: "/kategori/vergi-duzenlemeleri" },
      { label: "Teşvik Paketleri", href: "/kategori/tesvik-paketleri" },
      { label: "Ekonomik Göstergeler", href: "/kategori/ekonomik-gostergeler" },
    ],
  },
  sectors: {
    title: "Sektörler",
    links: [
      { label: "Bankacılık", href: "/kategori/bankacilik" },
      { label: "Enerji", href: "/kategori/enerji" },
      { label: "Turizm", href: "/kategori/turizm" },
      { label: "İnşaat", href: "/kategori/insaat" },
      { label: "Teknoloji", href: "/kategori/teknoloji-sektoru" },
    ],
  },
  analysis: {
    title: "Analizler",
    links: [
      { label: "Piyasa Analizleri", href: "/kategori/piyasa-analizleri" },
      { label: "Ekonomist Görüşleri", href: "/kategori/ekonomist-gorusleri" },
      { label: "Teknik Analiz", href: "/kategori/teknik-analiz" },
      { label: "Sektör Raporları", href: "/kategori/sektor-raporlari" },
      { label: "Yatırım Tavsiyeleri", href: "/kategori/yatirim-tavsiyeleri" },
    ],
  },
}

const navLinks = [
  { href: "/kategori/teknoloji", label: "Teknoloji" },
  { href: "/kategori/kultur", label: "Kültür" },
  { href: "/kategori/yasam", label: "Yaşam" },
]

export function ModernHeader() {
  const { siteInfo, loading } = useSiteContext()
  const [isNewsMenuOpen, setIsNewsMenuOpen] = React.useState(false)
  const [isEconomyMenuOpen, setIsEconomyMenuOpen] = React.useState(false)
  const [mobileNewsOpen, setMobileNewsOpen] = React.useState(false)
  const [mobileEconomyOpen, setMobileEconomyOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const newsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const economyTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Generate menu data from site info
  const generateMenuData = () => {
    if (!siteInfo?.menus) return { newsMenuData, economyMenuData }
    
    // Transform site menus to component format
    const transformedMenus: any = {}
    
    Object.entries(siteInfo.menus).forEach(([menuKey, menuItems]) => {
      if (menuItems.length > 0) {
        transformedMenus[menuKey] = {
          title: menuKey.charAt(0).toUpperCase() + menuKey.slice(1),
          links: menuItems.map(item => ({
            label: item.label || item.name,
            href: item.url || `/${item.name.toLowerCase().replace(/\s+/g, '-')}`
          }))
        }
      }
    })
    
    return {
      newsMenuData: Object.keys(transformedMenus).length > 0 ? transformedMenus : newsMenuData,
      economyMenuData
    }
  }

  const { newsMenuData: dynamicNewsMenuData, economyMenuData: dynamicEconomyMenuData } = generateMenuData()

  const handleNewsMenuToggle = () => {
    setIsNewsMenuOpen((prev) => !prev)
    setIsEconomyMenuOpen(false)
  }

  const handleEconomyMenuToggle = () => {
    setIsEconomyMenuOpen((prev) => !prev)
    setIsNewsMenuOpen(false)
  }

  const handleNewsMouseEnter = () => {
    if (newsTimeoutRef.current) {
      clearTimeout(newsTimeoutRef.current)
      newsTimeoutRef.current = null
    }
    setIsNewsMenuOpen(true)
    setIsEconomyMenuOpen(false)
  }

  const handleNewsMouseLeave = () => {
    newsTimeoutRef.current = setTimeout(() => {
      setIsNewsMenuOpen(false)
    }, 200)
  }

  const handleEconomyMouseEnter = () => {
    if (economyTimeoutRef.current) {
      clearTimeout(economyTimeoutRef.current)
      economyTimeoutRef.current = null
    }
    setIsEconomyMenuOpen(true)
    setIsNewsMenuOpen(false)
  }

  const handleEconomyMouseLeave = () => {
    economyTimeoutRef.current = setTimeout(() => {
      setIsEconomyMenuOpen(false)
    }, 200)
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (isNewsMenuOpen || isEconomyMenuOpen) {
        setIsNewsMenuOpen(false)
        setIsEconomyMenuOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if ((isNewsMenuOpen || isEconomyMenuOpen) && !target.closest("[data-mega-menu]")) {
        setIsNewsMenuOpen(false)
        setIsEconomyMenuOpen(false)
      }
    }

    if (isNewsMenuOpen || isEconomyMenuOpen) {
      window.addEventListener("scroll", handleScroll)
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isNewsMenuOpen, isEconomyMenuOpen])

  return (
    <>
      <div className="bg-gray-50 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-600">
          <div className="hidden sm:block">
            {new Date().toLocaleDateString("tr-TR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="sm:hidden">
            {new Date().toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "short",
            })}
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="hidden sm:inline">Canlı Yayın</span>
              <span className="sm:hidden">Canlı</span>
            </span>
            <span className="hidden sm:inline">Oyunlar</span>
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6 flex justify-center">
          <Link href="/" className="">
            <Logo className="h-12 w-auto" />
          </Link>
        </div>
      </div>

      <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-center">
          <div className="w-full max-w-6xl flex items-center justify-between">
            <Link href="/" className="md:hidden">
              <Logo className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-x-8 h-full mx-auto">
              <div
                onMouseEnter={handleNewsMouseEnter}
                onMouseLeave={handleNewsMouseLeave}
                className="h-full flex items-center relative"
                data-mega-menu
              >
                <button
                  onClick={handleNewsMenuToggle}
                  className={`relative text-black text-sm font-medium h-full flex items-center hover:text-red-600 transition-colors ${
                    isNewsMenuOpen ? "text-red-600" : ""
                  }`}
                >
                  Haberler
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${isNewsMenuOpen ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 block h-px w-full bg-red-600 transition-transform duration-300 ease-out ${
                      isNewsMenuOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </div>

              <div
                onMouseEnter={handleEconomyMouseEnter}
                onMouseLeave={handleEconomyMouseLeave}
                className="h-full flex items-center relative"
                data-mega-menu
              >
                <button
                  onClick={handleEconomyMenuToggle}
                  className={`relative text-black text-sm font-medium h-full flex items-center hover:text-red-600 transition-colors ${
                    isEconomyMenuOpen ? "text-red-600" : ""
                  }`}
                >
                  Ekonomi
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${isEconomyMenuOpen ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 block h-px w-full bg-red-600 transition-transform duration-300 ease-out ${
                      isEconomyMenuOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-black text-sm font-medium h-full flex items-center hover:text-red-600 transition-colors"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 block h-px w-full bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </Link>
              ))}
            </nav>

            {/* Sağ İkonlar & Mobil Menü */}
            <div className="flex items-center gap-x-5">
              <div className="hidden md:flex items-center gap-x-5">
                <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 hover:text-red-600">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 hover:text-red-600">
                  <User className="w-5 h-5" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-black hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatedHamburger isOpen={isMobileMenuOpen} />
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4 overflow-y-auto max-h-[32rem]">
              {/* Haberler Section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setMobileNewsOpen(!mobileNewsOpen)}
                  className="w-full flex items-center justify-between text-lg font-semibold hover:text-red-600 transition-colors py-4"
                >
                  Haberler
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileNewsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileNewsOpen && (
                  <div className="pb-6 space-y-6 pl-4">
                    {Object.entries(dynamicNewsMenuData).map(([key, section]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-base text-gray-900 mb-3">{section.title}</h4>
                        <div className="space-y-3">
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block text-base text-gray-600 hover:text-red-600 transition-colors py-2"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ekonomi Section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setMobileEconomyOpen(!mobileEconomyOpen)}
                  className="w-full flex items-center justify-between text-lg font-semibold hover:text-red-600 transition-colors py-4"
                >
                  Ekonomi
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileEconomyOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileEconomyOpen && (
                  <div className="pb-6 space-y-6 pl-4">
                    {Object.entries(dynamicEconomyMenuData).map(([key, section]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-base text-gray-900 mb-3">{section.title}</h4>
                        <div className="space-y-3">
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block text-base text-gray-600 hover:text-red-600 transition-colors py-2"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              <div className="space-y-0">
                {navLinks.map((link) => (
                  <div key={link.href} className="border-b border-gray-100">
                    <Link
                      href={link.href}
                      className="block text-lg font-semibold hover:text-red-600 transition-colors py-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                      <ChevronDown className="w-5 h-5 float-right mt-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Mega Menu */}
        <div data-mega-menu className="absolute top-full left-0 right-0 z-40">
          <NewsMegaMenu
            isOpen={isNewsMenuOpen}
            setIsOpen={setIsNewsMenuOpen}
            onMouseEnter={handleNewsMouseEnter}
            onMouseLeave={handleNewsMouseLeave}
            megaMenuData={dynamicNewsMenuData}
          />
          <NewsMegaMenu
            isOpen={isEconomyMenuOpen}
            setIsOpen={setIsEconomyMenuOpen}
            onMouseEnter={handleEconomyMouseEnter}
            onMouseLeave={handleEconomyMouseLeave}
            megaMenuData={dynamicEconomyMenuData}
          />
        </div>
      </header>
    </>
  )
}
