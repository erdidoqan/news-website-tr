// Laravel Glide image optimization utilities

export interface ImageOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpg' | 'png'
  fit?: 'crop' | 'contain' | 'cover' | 'fill' | 'scale-down'
}

// Generate optimized image URL with Glide parameters
export function getOptimizedImageUrl(
  originalUrl: string, 
  options: ImageOptions = {}
): string {
  if (!originalUrl || !originalUrl.includes('app.bibulten.com')) {
    return originalUrl // Return as-is if not from our CDN
  }

  const {
    width,
    height,
    quality = 85,
    format = 'webp',
    fit = 'crop'
  } = options

  const params = new URLSearchParams()
  
  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  params.append('q', quality.toString())
  params.append('fm', format)
  params.append('fit', fit)

  return `${originalUrl}?${params.toString()}`
}

// Generate responsive image srcSet for different screen sizes
export function generateResponsiveSrcSet(
  originalUrl: string,
  baseWidth: number = 400
): string {
  if (!originalUrl || !originalUrl.includes('app.bibulten.com')) {
    return originalUrl
  }

  const sizes = [1, 1.5, 2, 3] // 1x, 1.5x, 2x, 3x
  
  const srcSetEntries = sizes.map(multiplier => {
    const width = Math.round(baseWidth * multiplier)
    const optimizedUrl = getOptimizedImageUrl(originalUrl, { 
      width, 
      quality: 85, 
      format: 'webp' 
    })
    return `${optimizedUrl} ${multiplier}x`
  })

  return srcSetEntries.join(', ')
}

// Generate sizes attribute for responsive images
export function generateImageSizes(breakpoints?: {
  mobile?: number
  tablet?: number
  desktop?: number
}): string {
  const {
    mobile = 100,
    tablet = 50,
    desktop = 33
  } = breakpoints || {}

  return `(max-width: 768px) ${mobile}vw, (max-width: 1024px) ${tablet}vw, ${desktop}vw`
}

// Next.js Image component props generator
export function getNextImageProps(
  originalUrl: string,
  alt: string,
  options: ImageOptions & {
    priority?: boolean
    className?: string
    sizes?: string
  } = {}
) {
  const {
    width = 400,
    height = 300,
    quality = 85,
    priority = false,
    className = "",
    sizes = generateImageSizes(),
    ...glideOptions
  } = options

  // Base optimized URL
  const src = getOptimizedImageUrl(originalUrl, { 
    width, 
    height, 
    quality, 
    format: 'webp',
    ...glideOptions 
  })

  return {
    src,
    alt,
    width,
    height,
    quality,
    priority,
    className,
    sizes,
    placeholder: 'blur' as const,
    blurDataURL: getOptimizedImageUrl(originalUrl, { 
      width: 10, 
      height: 10, 
      quality: 10,
      format: 'webp'
    }),
  }
}

// Preset configurations for different use cases
export const imagePresets = {
  // Ana sayfa featured image
  hero: {
    width: 800,
    height: 450,
    quality: 90,
    priority: true,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
  },
  
  // Kategori listesi thumbnail
  thumbnail: {
    width: 300,
    height: 200,
    quality: 80,
    sizes: "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
  },
  
  // Haber kartı resmi
  card: {
    width: 400,
    height: 250,
    quality: 85,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
  },
  
  // Haber detay sayfası ana resim
  article: {
    width: 1200,
    height: 630,
    quality: 90,
    priority: true,
    sizes: "(max-width: 768px) 100vw, 1200px"
  },
  
  // Avatar/profil resmi
  avatar: {
    width: 64,
    height: 64,
    quality: 90,
    fit: 'crop' as const,
    sizes: "64px"
  },
  
  // OG image (sosyal medya)
  og: {
    width: 1200,
    height: 630,
    quality: 90,
    format: 'jpg' as const,
    fit: 'crop' as const
  }
} as const
