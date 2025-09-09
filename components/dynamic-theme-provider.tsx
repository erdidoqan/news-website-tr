"use client"

import React, { useEffect } from 'react'
import { useSiteContext } from './site-provider'

export function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
  const { siteInfo } = useSiteContext()

  useEffect(() => {
    if (siteInfo?.theme?.color_palette) {
      const { primary, secondary } = siteInfo.theme.color_palette
      
      // CSS custom properties'leri set et
      document.documentElement.style.setProperty('--color-primary', primary)
      document.documentElement.style.setProperty('--color-secondary', secondary)
      
      // Tailwind CSS variable'ları için de set et
      document.documentElement.style.setProperty('--tw-color-primary', primary)
      document.documentElement.style.setProperty('--tw-color-secondary', secondary)
      
      // RGB versiyonları (opacity için)
      const primaryRgb = hexToRgb(primary)
      const secondaryRgb = hexToRgb(secondary)
      
      if (primaryRgb) {
        document.documentElement.style.setProperty('--color-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`)
      }
      
      if (secondaryRgb) {
        document.documentElement.style.setProperty('--color-secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`)
      }

      console.log('🎨 Dynamic theme colors applied:', { primary, secondary })
    } else {
      // Fallback colors
      const fallbackPrimary = '#dc2626' // red-600
      const fallbackSecondary = '#6b7280' // gray-500
      
      document.documentElement.style.setProperty('--color-primary', fallbackPrimary)
      document.documentElement.style.setProperty('--color-secondary', fallbackSecondary)
      document.documentElement.style.setProperty('--tw-color-primary', fallbackPrimary)
      document.documentElement.style.setProperty('--tw-color-secondary', fallbackSecondary)
      document.documentElement.style.setProperty('--color-primary-rgb', '220, 38, 38')
      document.documentElement.style.setProperty('--color-secondary-rgb', '107, 114, 128')
      
      console.log('🎨 Fallback theme colors applied')
    }
  }, [siteInfo])

  return <>{children}</>
}

// Hex to RGB converter
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// Hook to get current theme colors
export function useThemeColors() {
  const { siteInfo } = useSiteContext()
  
  return {
    primary: siteInfo?.theme?.color_palette?.primary || '#dc2626',
    secondary: siteInfo?.theme?.color_palette?.secondary || '#6b7280',
    primaryRgb: siteInfo?.theme?.color_palette?.primary 
      ? hexToRgb(siteInfo.theme.color_palette.primary) 
      : { r: 220, g: 38, b: 38 },
    secondaryRgb: siteInfo?.theme?.color_palette?.secondary 
      ? hexToRgb(siteInfo.theme.color_palette.secondary) 
      : { r: 107, g: 114, b: 128 }
  }
}
