"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  )
}

