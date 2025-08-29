export interface Logo {
  path: string | null
  url: string | null
}

export interface Favicon {
  url: string
  name: string
  path: string
  size: string
  filename: string
}

export interface Theme {
  id: number
  name: string
  slug: string
  description: string
  preview_image: string
  color_palette: {
    primary: string
    secondary: string
  }
  features: string[]
}

export interface SocialMedia {
  facebook: string | null
  twitter: string | null
  instagram: string | null
  linkedin: string | null
  youtube: string | null
  github: string | null
  telegram: string | null
  whatsapp: string | null
}

export interface MenuItem {
  id: number
  name: string
  label: string
  url: string | null
  type: string
  target: string
  icon: string | null
  sort_order: number
  description: string | null
  css_classes: string | null
  is_active: boolean
  children?: MenuItem[]
}

export interface Menus {
  [key: string]: MenuItem[]
}

export interface SeoSettings {
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
}

export interface AnalyticsSettings {
  google_analytics_id: string | null
  google_tag_manager_id: string | null
  facebook_pixel_id: string | null
}

export interface ContactSettings {
  email: string | null
  phone: string | null
  address: string | null
}

export interface SiteSettings {
  seo: SeoSettings
  analytics: AnalyticsSettings
  contact: ContactSettings
  maintenance_mode: boolean
  comments_enabled: boolean
  registration_enabled: boolean
}

export interface SiteInfo {
  id: number
  name: string
  domain: string | null
  description: string
  status: string
  language: string
  created_at: string
  updated_at: string
  logo: Logo
  favicons: Favicon[]
  theme: Theme | null
  social_media: SocialMedia
  menus: Menus
  settings: SiteSettings
}

export interface SiteApiResponse {
  success: boolean
  data: SiteInfo | null
  error?: string
}
