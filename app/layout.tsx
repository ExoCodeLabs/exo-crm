import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import { Providers } from "@/providers/providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Professional CRM | Exo Code Lab",
  description: "A professional CRM template with Redux and reusable components",
  generator: "Exo CRM",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

import "./globals.css"
