"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  )
}

