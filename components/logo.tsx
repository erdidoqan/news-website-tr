'use client'

import { useSiteContext } from './site-provider'
import { getLogoSrc, isLogoAvailable } from '@/lib/logo-utils'
import { OptimizedImage } from '@/components/optimized-image'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const { siteInfo } = useSiteContext()
  
  // Önce local logo'yu kontrol et, sonra API'den gelen logo'yu, son olarak fallback
  const logoSrc = isLogoAvailable() ? getLogoSrc() : (siteInfo?.logo?.url || '/placeholder-logo.svg')
  
  // API'den gelen site adını kullan
  const siteName = siteInfo?.name || 'Haber Merkezi'
  
  // Eğer logo varsa göster
  if (logoSrc !== '/placeholder-logo.svg' || siteInfo?.logo?.url) {
    return (
      <div className={className}>
        <OptimizedImage
          src={logoSrc}
          alt={`${siteName} Logo`}
          options={{
            width: 120,
            height: 40,
            quality: 90,
            priority: true,
            fetchPriority: 'high',
            className: "h-full w-auto object-contain"
          }}
        />
      </div>
    )
  }

  // Fallback: Site name as text logo
  return (
    <div className={className}>
      <h1 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
        {siteName}
      </h1>
    </div>
  )
}
