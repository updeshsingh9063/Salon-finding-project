'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const locations = ['Bandra', 'Juhu', 'Andheri', 'Colaba', 'Worli', 'Powai']
const services  = ['Hair', 'Makeup', 'Nails', 'Facial', 'Bridal', 'Waxing', 'Spa']

const Hero = () => {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [service,  setService]  = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('area',    location)
    if (service)  params.set('service', service)
    router.push(`/salons${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/salon-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/75 via-espresso/35 to-espresso/75" />
      </div>

      {/* Animated floating orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          { cx: '15%', cy: '25%', r: 180, delay: 0 },
          { cx: '80%', cy: '60%', r: 140, delay: 1.5 },
          { cx: '50%', cy: '80%', r: 100, delay: 0.8 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-gold/10 blur-3xl"
            style={{ left: orb.cx, top: orb.cy, width: orb.r * 2, height: orb.r * 2, translateX: '-50%', translateY: '-50%' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-2 md:mb-3 leading-tight"
          >
            Mumbai&apos;s Most Loved
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-rose-gold mb-5 md:mb-7 leading-tight"
          >
            Beauty Experience
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-cream/85 max-w-2xl mx-auto mb-8"
          >
            Discover 200+ premium salons, book appointments instantly, and experience luxury beauty across Mumbai.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10 md:mb-12"
          >
            <motion.a
              href="/salons"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-rose-gold text-warm-black font-semibold rounded-xl hover:bg-rose-gold/90 transition-colors shadow-lg shadow-rose-gold/30"
            >
              Explore Salons
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border-2 border-cream/70 text-cream font-semibold rounded-xl hover:bg-cream hover:text-warm-black transition-colors backdrop-blur-sm"
            >
              How it works
            </motion.a>
          </motion.div>

          {/* Search bar — functional, navigates with query params */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="glass-card rounded-2xl p-4 md:p-5 max-w-3xl mx-auto shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <select
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold transition-all"
              >
                <option value="" className="text-warm-black bg-white">📍 Location</option>
                {locations.map(l => (
                  <option key={l} value={l} className="text-warm-black bg-white">{l}</option>
                ))}
              </select>

              <select
                value={service}
                onChange={e => setService(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold transition-all"
              >
                <option value="" className="text-warm-black bg-white">💅 Service</option>
                {services.map(s => (
                  <option key={s} value={s} className="text-warm-black bg-white">{s}</option>
                ))}
              </select>

              <input
                type="date"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold [color-scheme:dark] transition-all"
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSearch}
                className="w-full bg-rose-gold text-warm-black font-semibold rounded-xl px-4 py-3 hover:bg-rose-gold/90 transition-colors flex items-center justify-center gap-2 sm:col-span-2 lg:col-span-1 shadow-lg shadow-rose-gold/20"
              >
                <Search className="h-5 w-5" />
                Search
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-8 w-8 text-cream/70" />
      </motion.div>
    </section>
  )
}

export default Hero
