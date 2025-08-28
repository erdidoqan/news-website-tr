'use client'

import { useSiteContext } from './site-provider'
import Image from 'next/image'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const { siteInfo } = useSiteContext()
  
  // Use site logo if available, otherwise fallback to text
  if (siteInfo?.logo?.url) {
    return (
      <div className={className}>
        <Image
          src={siteInfo.logo.url}
          alt={siteInfo.name || 'Site Logo'}
          width={120}
          height={40}
          className="h-full w-auto object-contain"
        />
      </div>
    )
  }

  // Fallback to site name or default text
  const siteName = siteInfo?.name || 'Haber Merkezi'
  
  return (
    <div className={className}>
      <h1 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
        {siteName}
      </h1>
    </div>
  )
}
