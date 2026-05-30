import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import AIChat from '@/components/ui/AIChat'
import ScrollToTop from '@/components/ui/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'GlowCity | Mumbai\'s Most Loved Beauty Experience',
  description: 'Discover 200+ premium beauty salons in Mumbai. Book bridal makeup, hair styling, nail art, facials and more.',
  keywords: 'salon Mumbai, beauty salon, bridal makeup, hair styling, nail art, GlowCity',
  openGraph: {
    title: 'GlowCity | Mumbai\'s Most Loved Beauty Experience',
    description: 'Discover 200+ premium beauty salons in Mumbai.',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.className} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow w-full min-w-0">
          {children}
        </main>
        <Footer />
        <AIChat />
        <ScrollToTop />
      </body>
    </html>
  )
}