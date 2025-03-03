"use client"

import type * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useEffect } from "react"
import { borderRadiusValues, animationSpeedValues } from "@/lib/theme-config"

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  const themeSettings = useSelector((state: RootState) => state.ui.themeSettings)

  // Apply CSS variables based on theme settings
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement

      // Set border radius
      root.style.setProperty("--radius", borderRadiusValues[themeSettings.borderRadius])

      // Set animation speed
      root.style.setProperty("--animation-duration", animationSpeedValues[themeSettings.animation])

      // Apply primary color (would need more complex logic for full color scheme changes)
      // This is a simplified version - a complete implementation would update all color variables
    }
  }, [themeSettings])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={themeSettings.mode}
      enableSystem={themeSettings.mode === "system"}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

