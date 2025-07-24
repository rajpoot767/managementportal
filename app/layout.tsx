import type React from "react"
import type { Metadata } from "next"
import { Inter, SF_Pro_Display } from "next/font/google"
import "./globals.css"

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Load SF Pro Display font (using Inter as a fallback since SF Pro Display is not available on Google Fonts)
const sfPro = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "MediCare Plus - Hospital Management System",
  description: "Secure, HIPAA-compliant hospital management platform for healthcare professionals and administrators",
  keywords: "hospital management, healthcare, HIPAA compliant, medical software, patient management",
  authors: [{ name: "MediCare Plus Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "noindex, nofollow", // For demo purposes
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sfPro.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
