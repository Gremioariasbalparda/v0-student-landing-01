import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  title: "CEU - Coordinadora de Estudiantes | Universidad del Trabajo del Uruguay",
  description:
    "Representamos y defendemos los derechos de miles de estudiantes de la Universidad del Trabajo del Uruguay. Conoce nuestros objetivos, eventos y cómo formar parte del cambio.",
  keywords: "CEU, estudiantes, Universidad del Trabajo, Uruguay, gremio estudiantil, representación estudiantil",
  authors: [{ name: "CEU - Coordinadora de Estudiantes" }],
  creator: "CEU",
  publisher: "CEU",
  openGraph: {
    title: "CEU - Coordinadora de Estudiantes",
    description:
      "Representamos y defendemos los derechos de miles de estudiantes de la Universidad del Trabajo del Uruguay.",
    type: "website",
    locale: "es_UY",
  },
  twitter: {
    card: "summary_large_image",
    title: "CEU - Coordinadora de Estudiantes",
    description:
      "Representamos y defendemos los derechos de miles de estudiantes de la Universidad del Trabajo del Uruguay.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
