"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { X } from "lucide-react"

interface MegaMenuColumn {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

interface MegaMenuData {
  [key: string]: MegaMenuColumn
}

interface NewsMegaMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  megaMenuData: MegaMenuData
}

export function NewsMegaMenu({ isOpen, setIsOpen, onMouseEnter, onMouseLeave, megaMenuData }: NewsMegaMenuProps) {
  const columns = Object.values(megaMenuData)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="hidden md:block absolute top-full left-0 right-0 bg-gray-50 shadow-lg border-t border-gray-200 z-50"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => setIsOpen(false)}
          >
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-5 gap-8">
                {columns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={columnIndex < columns.length - 1 ? "border-r border-gray-200 pr-8" : ""}
                  >
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">{column.title}</h3>
                    <ul className="space-y-3">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="text-sm text-gray-700 hover:text-red-600 transition-colors duration-200 block"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Menü</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-8">
                {columns.map((column, columnIndex) => (
                  <div key={columnIndex}>
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-200 pb-2">
                      {column.title}
                    </h3>
                    <ul className="space-y-3 pl-2">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="text-sm text-gray-700 hover:text-red-600 transition-colors duration-200 block py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
