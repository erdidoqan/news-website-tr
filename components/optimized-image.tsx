"use client"

import Image from 'next/image'
import { getNextImageProps, imagePresets, type ImageOptions } from '@/lib/image-utils'

interface OptimizedImageProps {
  src: string
  alt: string
  preset?: keyof typeof imagePresets
  options?: ImageOptions & {
    priority?: boolean
    className?: string
    sizes?: string
    fetchPriority?: 'high' | 'low' | 'auto'
  }
  fill?: boolean
  onClick?: () => void
}

export function OptimizedImage({
  src,
  alt,
  preset,
  options = {},
  fill = false,
  onClick
}: OptimizedImageProps) {
  // Use preset if provided, otherwise use custom options
  const imageConfig = preset ? { ...imagePresets[preset], ...options } : options
  
  // Get Next.js Image props
  const imageProps = getNextImageProps(src, alt, imageConfig)

  if (fill) {
    // Fill mode için width/height'ı kaldır
    const { width, height, ...fillProps } = imageProps
    return (
      <Image
        {...fillProps}
        fill
        className={fillProps.className}
        onClick={onClick}
        style={{ objectFit: 'cover' }}
      />
    )
  }

  return (
    <Image
      {...imageProps}
      onClick={onClick}
    />
  )
}

// Specialized components for common use cases
export function HeroImage({ src, alt, className = "", onClick }: {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      preset="hero"
      options={{ className }}
      onClick={onClick}
    />
  )
}

export function ThumbnailImage({ src, alt, className = "", onClick }: {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      preset="thumbnail"
      options={{ className }}
      onClick={onClick}
    />
  )
}

export function CardImage({ src, alt, className = "", onClick }: {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      preset="card"
      options={{ className }}
      onClick={onClick}
    />
  )
}

export function ArticleImage({ src, alt, className = "", onClick }: {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      preset="article"
      options={{ className }}
      onClick={onClick}
    />
  )
}

export function AvatarImage({ src, alt, className = "", onClick }: {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      preset="avatar"
      options={{ className }}
      onClick={onClick}
    />
  )
}
