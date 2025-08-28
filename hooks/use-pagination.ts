interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}

interface PaginationData {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
  startIndex: number
  endIndex: number
}

export function usePagination({ totalItems, itemsPerPage, currentPage }: UsePaginationProps): PaginationData {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
  }
}
