"use client"
import * as React from "react"
import Link from "next/link"
import { Search, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { NewsMegaMenu } from "./news-mega-menu"
import { AnimatedHamburger } from "./animated-hamburger"
import { useSiteContext } from "./site-provider"
import type { MenuItem } from "@/types/site"



export function ModernHeader() {
  const { siteInfo, loading } = useSiteContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Generate navigation items from site info
  const getNavigationItems = () => {
    if (!siteInfo?.menus?.header) return []
    
    return siteInfo.menus.header
      .filter(item => item.is_active)
      .sort((a, b) => a.sort_order - b.sort_order)
  }

  // Generate mega menu data for a specific menu item
  const generateMegaMenuData = (menuItem: MenuItem) => {
    if (!menuItem.children) return {}
    
    const megaMenuData: Record<string, { title: string; links: { label: string; href: string }[] }> = {}
    
    menuItem.children.forEach((child, index) => {
      const sectionKey = `section_${index}`
      megaMenuData[sectionKey] = {
        title: child.label || child.name,
        links: child.children 
          ? child.children
              .filter((subItem) => subItem.is_active)
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((subItem) => ({
                label: subItem.label || subItem.name,
                href: subItem.url || `/${subItem.name.toLowerCase().replace(/\s+/g, '-')}`
              }))
          : []
      }
    })
    
    return megaMenuData
  }

  const navigationItems = getNavigationItems()
  
  // State for managing which mega menu is open
  const [openMegaMenuId, setOpenMegaMenuId] = React.useState<number | null>(null)
  const [mobileOpenMenuId, setMobileOpenMenuId] = React.useState<number | null>(null)
  const megaMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMegaMenuToggle = (menuId: number) => {
    setOpenMegaMenuId((prev) => prev === menuId ? null : menuId)
  }

  const handleMegaMenuMouseEnter = (menuId: number) => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
      megaMenuTimeoutRef.current = null
    }
    setOpenMegaMenuId(menuId)
  }

  const handleMegaMenuMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setOpenMegaMenuId(null)
    }, 200)
  }

  const handleMobileMegaMenuToggle = (menuId: number) => {
    setMobileOpenMenuId((prev) => prev === menuId ? null : menuId)
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (openMegaMenuId !== null) {
        setOpenMegaMenuId(null)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (openMegaMenuId !== null && !target.closest("[data-mega-menu]")) {
        setOpenMegaMenuId(null)
      }
    }

    if (openMegaMenuId !== null) {
      window.addEventListener("scroll", handleScroll)
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("click", handleClickOutside)
    }
  }, [openMegaMenuId])

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
              {navigationItems.map((item) => {
                const isOpen = openMegaMenuId === item.id
                const hasMegaMenu = item.type === 'mega' && item.children && item.children.length > 0

                if (hasMegaMenu) {
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => handleMegaMenuMouseEnter(item.id)}
                      onMouseLeave={handleMegaMenuMouseLeave}
                className="h-full flex items-center relative"
                data-mega-menu
              >
                <button
                        onClick={() => handleMegaMenuToggle(item.id)}
                  className={`relative text-black text-sm font-medium h-full flex items-center hover:text-red-600 transition-colors ${
                          isOpen ? "text-red-600" : ""
                  }`}
                >
                        {item.label}
                  <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 block h-px w-full bg-red-600 transition-transform duration-300 ease-out ${
                            isOpen ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </div>
                  )
                } else {
                  return (
                <Link
                      key={item.id}
                      href={item.url || `/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      target={item.target}
                  className="group relative text-black text-sm font-medium h-full flex items-center hover:text-red-600 transition-colors"
                >
                      {item.label}
                  <span className="absolute bottom-0 left-0 block h-px w-full bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </Link>
                  )
                }
              })}
            </nav>

            {/* Sağ İkonlar & Mobil Menü */}
            <div className="flex items-center gap-x-5">
              <div className="hidden md:flex items-center gap-x-5">
                <Link
                  href="/kategori"
                  className="text-black text-sm font-medium hover:text-red-600 transition-colors"
                >
                  Kategoriler
                </Link>
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
              {navigationItems.map((item) => {
                const isMobileOpen = mobileOpenMenuId === item.id
                const hasMegaMenu = item.type === 'mega' && item.children && item.children.length > 0

                if (hasMegaMenu) {
                  const megaMenuData = generateMegaMenuData(item)
                  
                  return (
                    <div key={item.id} className="border-b border-gray-100">
                <button
                        onClick={() => handleMobileMegaMenuToggle(item.id)}
                  className="w-full flex items-center justify-between text-lg font-semibold hover:text-red-600 transition-colors py-4"
                >
                        {item.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${isMobileOpen ? "rotate-180" : ""}`} />
                </button>
                      {isMobileOpen && (
                  <div className="pb-6 space-y-6 pl-4">
                          {Object.entries(megaMenuData).map(([key, section]) => (
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
                  )
                } else {
                  return (
                    <div key={item.id} className="border-b border-gray-100">
                    <Link
                        href={item.url || `/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        target={item.target}
                      className="block text-lg font-semibold hover:text-red-600 transition-colors py-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.label}
                    </Link>
                  </div>
                  )
                }
              })}
              
              {/* Kategoriler Link for Mobile */}
              <div className="border-b border-gray-100">
                <Link
                  href="/kategori"
                  className="block text-lg font-semibold hover:text-red-600 transition-colors py-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tüm Kategoriler
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Mega Menu */}
        <div data-mega-menu className="absolute top-full left-0 right-0 z-40">
          {navigationItems
            .filter(item => item.type === 'mega' && item.children && item.children.length > 0)
            .map((item) => (
          <NewsMegaMenu
                key={item.id}
                isOpen={openMegaMenuId === item.id}
                setIsOpen={() => setOpenMegaMenuId(null)}
                onMouseEnter={() => handleMegaMenuMouseEnter(item.id)}
                onMouseLeave={handleMegaMenuMouseLeave}
                megaMenuData={generateMegaMenuData(item)}
              />
            ))}
        </div>
      </header>
    </>
  )
}
