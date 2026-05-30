'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, MapPin, Scissors, CalendarDays } from 'lucide-react'
import { useRouter } from 'next/navigation'

const locations = ['Bandra', 'Juhu', 'Andheri', 'Colaba', 'Worli', 'Powai']
const services  = ['Hair', 'Makeup', 'Nails', 'Facial', 'Bridal', 'Waxing', 'Spa']

const ROTATING_WORDS = ['Bridal Makeup', 'Hair Styling', 'Luxury Spa', 'Nail Art', 'Gold Facial']

const Hero = () => {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [service,  setService]  = useState('')
  const [wordIndex, setWordIndex] = useState(0)

  // Rotate words every 2.5s
  useEffect(() => {
    const id = setInterval(() => setWordIndex(prev => (prev + 1) % ROTATING_WORDS.length), 2500)
    return () => clearInterval(id)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('area',    location)
    if (service)  params.set('service', service)
    router.push(`/salons${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/salon-hero.mp4" type="video/mp4" />
        </video>
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/40 to-espresso/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/30 via-transparent to-espresso/30" />
      </div>

      {/* Animated floating orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          { cx: '12%', cy: '20%', r: 220, delay: 0, color: 'bg-rose-gold/12' },
          { cx: '82%', cy: '65%', r: 160, delay: 1.5, color: 'bg-blush/10' },
          { cx: '45%', cy: '85%', r: 120, delay: 0.8, color: 'bg-rose-gold/8' },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${orb.color} blur-3xl`}
            style={{ left: orb.cx, top: orb.cy, width: orb.r * 2, height: orb.r * 2, translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 7 + i * 1.5, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 w-full pt-16">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-gold/20 border border-rose-gold/40 text-rose-gold rounded-full text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-rose-gold rounded-full animate-pulse" />
            200+ Premium Salons · Mumbai
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-3 leading-tight"
          >
            Mumbai&apos;s Most Loved
          </motion.h1>

          {/* Animated rotating word */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight h-[1.2em] flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="gradient-text block"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-8"
          >
            Discover 200+ premium salons, book appointments instantly, and experience luxury beauty across Mumbai.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10 md:mb-12"
          >
            <motion.a
              href="/salons"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-rose-gold text-warm-black font-bold rounded-xl hover:bg-rose-gold/90 transition-colors shadow-lg shadow-rose-gold/30"
            >
              Explore Salons
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border-2 border-cream/60 text-cream font-bold rounded-xl hover:bg-cream/10 transition-colors backdrop-blur-sm"
            >
              How it Works
            </motion.a>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card rounded-2xl p-3 md:p-4 max-w-3xl mx-auto shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/60 pointer-events-none z-10" />
                <select
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold transition-all appearance-none cursor-pointer text-sm md:text-base"
                >
                  <option value="" className="text-warm-black bg-white">Location</option>
                  {locations.map(l => (
                    <option key={l} value={l} className="text-warm-black bg-white">{l}</option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div className="relative">
                <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cream/60 pointer-events-none z-10" />
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold transition-all appearance-none cursor-pointer text-sm md:text-base"
                >
                  <option value="" className="text-warm-black bg-white">Service</option>
                  {services.map(s => (
                    <option key={s} value={s} className="text-warm-black bg-white">{s}</option>
                  ))}
                </select>
              </div>

              {/* Search button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSearch}
                className="w-full bg-rose-gold text-warm-black font-bold rounded-xl px-4 py-3 hover:bg-rose-gold/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-gold/20 text-sm md:text-base"
              >
                <Search className="h-5 w-5" />
                Search Salons
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-cream/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-6 w-6 text-cream/60" />
      </motion.div>
    </section>
  )
}

export default Hero
