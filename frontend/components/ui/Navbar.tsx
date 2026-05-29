'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const onHero = isHome && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { label: 'Salons', href: '/salons' },
    { label: 'Services', href: '/salons?service=all' },
    { label: 'Areas', href: '/salons?area=all' },
    { label: 'About', href: '/about' },
  ]

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          onHero ? 'bg-transparent py-5' : 'bg-cream/95 backdrop-blur-md shadow-lg py-3'
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-rose-gold" />
              <span className="font-playfair text-2xl font-bold text-rose-gold">GlowCity</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'font-medium transition-colors hover:text-rose-gold',
                    onHero ? 'text-cream' : 'text-warm-black'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                type="button"
                className={cn(
                  'px-4 py-2 border rounded-lg font-medium transition-colors',
                  onHero
                    ? 'border-cream text-cream hover:bg-cream hover:text-warm-black'
                    : 'border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream'
                )}
              >
                List Your Salon
              </button>
              <button
                type="button"
                className={cn(
                  'px-4 py-2 font-medium transition-colors',
                  onHero ? 'text-cream hover:text-rose-gold' : 'text-warm-black hover:text-rose-gold'
                )}
              >
                Sign In
              </button>
            </div>

            <button
              type="button"
              className={cn('md:hidden p-2', onHero ? 'text-cream' : 'text-warm-black')}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-cream shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-playfair text-xl font-bold text-rose-gold">GlowCity</span>
                  <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                    <X className="h-6 w-6 text-warm-black" />
                  </button>
                </div>
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-lg font-medium text-warm-black hover:text-rose-gold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="mt-8 space-y-3">
                  <button
                    type="button"
                    className="w-full px-4 py-3 border border-rose-gold text-rose-gold rounded-lg font-medium"
                  >
                    List Your Salon
                  </button>
                  <button type="button" className="w-full px-4 py-3 text-warm-black font-medium">
                    Sign In
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
