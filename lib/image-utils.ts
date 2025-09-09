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

  // More conservative multipliers to reduce file sizes
  const sizes = [1, 1.5, 2] // 1x, 1.5x, 2x (removed 3x to save bandwidth)
  
  const srcSetEntries = sizes.map(multiplier => {
    const width = Math.round(baseWidth * multiplier)
    const optimizedUrl = getOptimizedImageUrl(originalUrl, { 
      width, 
      quality: 80, // Reduced from 85 to 80 for better compression
      format: 'webp' 
    })
    return `${optimizedUrl} ${width}w`
  })

  return srcSetEntries.join(', ')
}

// Generate sizes attribute for responsive images - daha conservative
export function generateImageSizes(breakpoints?: {
  mobile?: number
  tablet?: number
  desktop?: number
}): string {
  const {
    mobile = 90, // 100'den 90'a düşürüldü
    tablet = 45, // 50'den 45'e düşürüldü
    desktop = 30 // 33'den 30'a düşürüldü
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
    fetchPriority?: 'high' | 'low' | 'auto'
  } = {}
) {
  const {
    width = 320, // 400'den 320'ye düşürüldü
    height = 200, // 300'den 200'e düşürüldü
    quality = 75, // 85'den 75'e düşürüldü
    priority = false,
    className = "",
    sizes = generateImageSizes(),
    fetchPriority = priority ? 'high' : 'auto',
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

  const baseProps = {
    src,
    alt,
    quality,
    priority,
    className,
    sizes,
    placeholder: 'blur' as const,
    blurDataURL: getOptimizedImageUrl(originalUrl, { 
      width: 8, // 10'dan 8'e düşürüldü
      height: 8, 
      quality: 5, // 10'dan 5'e düşürüldü
      format: 'webp'
    }),
  }

  // Add fetchPriority for modern browsers
  const imageProps: any = {
    ...baseProps,
    fetchPriority,
  }

  // Add width/height only if not using fill
  if (width && height) {
    imageProps.width = width
    imageProps.height = height
  }

  return imageProps
}

// Preset configurations for different use cases
export const imagePresets = {
  // Ana sayfa featured image - daha küçük boyutlar
  hero: {
    width: 600, // 800'den 600'e düşürüldü
    height: 338, // 16:9 aspect ratio
    quality: 80, // 90'dan 80'e düşürüldü
    priority: true,
    fetchPriority: 'high' as const,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 600px"
  },
  
  // Kategori listesi thumbnail - çok daha küçük
  thumbnail: {
    width: 240, // 300'den 240'a düşürüldü
    height: 160,
    quality: 75, // 80'den 75'e düşürüldü
    fetchPriority: 'low' as const,
    sizes: "(max-width: 768px) 40vw, (max-width: 1024px) 25vw, 240px"
  },
  
  // Haber kartı resmi - optimize edildi
  card: {
    width: 320, // 400'den 320'ye düşürüldü
    height: 200, // 250'den 200'e düşürüldü
    quality: 75, // 85'den 75'e düşürüldü
    fetchPriority: 'auto' as const,
    sizes: "(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 320px"
  },
  
  // Haber detay sayfası ana resim - mobile için optimize
  article: {
    width: 800, // 1200'den 800'e düşürüldü
    height: 450,
    quality: 85, // 90'dan 85'e düşürüldü
    priority: true,
    fetchPriority: 'high' as const,
    sizes: "(max-width: 768px) 100vw, 800px"
  },
  
  // Avatar/profil resmi
  avatar: {
    width: 48, // 64'den 48'e düşürüldü
    height: 48,
    quality: 80, // 90'dan 80'e düşürüldü
    fit: 'crop' as const,
    fetchPriority: 'low' as const,
    sizes: "48px"
  },
  
  // OG image (sosyal medya) - kalite düşürüldü
  og: {
    width: 1200,
    height: 630,
    quality: 80, // 90'dan 80'e düşürüldü
    format: 'jpg' as const,
    fit: 'crop' as const,
    fetchPriority: 'high' as const
  }
} as const
