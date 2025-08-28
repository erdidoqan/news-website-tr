// Haber API tipleri

export interface Category {
  id: number
  name: string
  slug: string
  color: string
}

export interface Author {
  id: number
  first_name: string
  last_name: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface FeaturedMedia {
  id: number
  filename: string
  original_filename: string | null
  url: string
  mime_type: string
  size: number | null
}

export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  created_at: string
  updated_at: string
  category: Category
  author: Author
  tags: Tag[]
  featured_media: FeaturedMedia | null
}

export interface ArticlesPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface ArticlesResponse {
  data: Article[]
  pagination: ArticlesPagination
}
