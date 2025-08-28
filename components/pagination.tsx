import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const showPages = 5 // Show 5 page numbers at most

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    const endPage = Math.min(totalPages, startPage + showPages - 1)

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Button variant="outline" size="sm" asChild>
          <Link href={`${baseUrl}?sayfa=${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Önceki
          </Link>
        </Button>
      )}

      {/* First page if not visible */}
      {pageNumbers[0] > 1 && (
        <>
          <Button variant="outline" size="sm" asChild>
            <Link href={`${baseUrl}?sayfa=1`}>1</Link>
          </Button>
          {pageNumbers[0] > 2 && <span className="px-2 text-gray-500">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" asChild>
          <Link href={`${baseUrl}?sayfa=${page}`}>{page}</Link>
        </Button>
      ))}

      {/* Last page if not visible */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
          <Button variant="outline" size="sm" asChild>
            <Link href={`${baseUrl}?sayfa=${totalPages}`}>{totalPages}</Link>
          </Button>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Button variant="outline" size="sm" asChild>
          <Link href={`${baseUrl}?sayfa=${currentPage + 1}`}>
            Sonraki
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      )}
    </div>
  )
}
