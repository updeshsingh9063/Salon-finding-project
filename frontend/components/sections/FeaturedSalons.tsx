'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import SalonCard from '@/components/ui/SalonCard'
import { fadeUp } from '@/lib/motion'
import type { Salon } from '@/lib/types'

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com').replace(/\/+$/, '')

// Skeleton loader for a salon card
const SalonCardSkeleton = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-3xl overflow-hidden shadow-lg h-full"
  >
    <div className="aspect-[5/4] sm:aspect-[4/3] bg-gradient-to-r from-cream via-blush/20 to-cream animate-pulse" />
    <div className="p-6 md:p-8 space-y-4">
      <div className="h-4 bg-cream rounded-full animate-pulse w-2/3" />
      <div className="h-4 bg-cream rounded-full animate-pulse w-1/2" />
      <div className="flex gap-2">
        <div className="h-7 w-20 bg-cream rounded-full animate-pulse" />
        <div className="h-7 w-20 bg-cream rounded-full animate-pulse" />
      </div>
      <div className="h-12 bg-rose-gold/20 rounded-xl animate-pulse mt-4" />
    </div>
  </motion.div>
)

const FeaturedSalons = () => {
  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/salons?sort=rating&limit=3`)
      .then(res => res.json())
      .then(data => {
        setSalons(data.salons ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section className="py-20 md:py-28 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-gold/10 text-rose-gold rounded-full text-sm font-semibold mb-4"
          >
            <Sparkles className="h-4 w-4" />
            Handpicked for You
          </motion.div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-warm-black mb-5">
            Top Rated in Mumbai
          </h2>
          <p className="text-warm-black/60 text-lg md:text-xl max-w-3xl mx-auto">
            Discover the most loved beauty salons across Mumbai, handpicked for exceptional service
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {loading
            ? [0, 1, 2].map(i => <SalonCardSkeleton key={i} delay={i * 0.1} />)
            : salons.map((salon, index) => (
                <motion.div
                  key={salon.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                >
                  <SalonCard salon={salon} index={index} />
                </motion.div>
              ))}
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.3 }}
          className="text-center mt-14 md:mt-16"
        >
          <a
            href="/salons"
            className="inline-flex items-center gap-3 px-10 py-4 text-lg border-2 border-rose-gold text-rose-gold font-semibold rounded-xl hover:bg-rose-gold hover:text-cream transition-all duration-300 group"
          >
            View All Salons
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedSalons
