import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
// import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Datail.ai - Own Data = Own AI-Powered Business",
  description: "Turn your dataset into a ChatGPT-native App — instantly accessible to billions of AI users.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-black" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-black text-white`}
      >
        <Suspense fallback={null}>
          {children}
          {/* <Analytics /> */}
        </Suspense>
      </body>
    </html>
  )
}
