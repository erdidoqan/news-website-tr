"use client"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

const navigationItems = [
  {
    name: "Türkiye",
    items: ["Gündem", "Siyaset", "Yerel Haberler"],
  },
  {
    name: "Dünya",
    items: ["Uluslararası", "Avrupa", "Amerika", "Asya"],
  },
  {
    name: "Spor",
    items: ["Futbol", "Basketbol", "Tenis", "Diğer Sporlar"],
  },
  {
    name: "Ekonomi",
    items: ["Borsa", "Döviz", "Kripto", "İş Dünyası"],
  },
  {
    name: "Teknoloji",
    items: ["Yapay Zeka", "Mobil", "Oyun", "Bilim"],
  },
  {
    name: "Kültür",
    items: ["Sanat", "Müzik", "Sinema", "Kitap"],
  },
  {
    name: "Yaşam",
    items: ["Sağlık", "Moda", "Yemek", "Seyahat"],
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-200">
      {/* Top bar with date and live stream */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm text-gray-600">
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

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between lg:justify-center">
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menüyü aç">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 tracking-tight">
            Haber Merkezi
          </h1>

          <div className="w-10 lg:hidden"></div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="border-t border-gray-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-3">
            {navigationItems.map((item) => (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  {item.items.map((subItem) => (
                    <DropdownMenuItem key={subItem} className="cursor-pointer">
                      {subItem}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                  <div className="grid grid-cols-2 gap-2 pl-4">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem}
                        className="text-left text-gray-600 hover:text-gray-900 py-2 text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
