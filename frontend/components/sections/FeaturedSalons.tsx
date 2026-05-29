'use client'

import { motion } from 'framer-motion'
import { SALONS } from '@/lib/data'
import SalonCard from '@/components/ui/SalonCard'
import { fadeUp } from '@/lib/motion'

const FeaturedSalons = () => {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14 md:mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-warm-black mb-5">
            Top Rated in Mumbai
          </h2>
          <p className="text-warm-black/60 text-lg md:text-xl max-w-3xl mx-auto">
            Discover the most loved beauty salons across Mumbai, handpicked for exceptional service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {SALONS.map((salon, index) => (
            <SalonCard key={salon.id} salon={salon} index={index} />
          ))}
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-center mt-14 md:mt-16"
        >
          <a
            href="/salons"
            className="inline-flex items-center gap-2 px-10 py-4 text-lg border-2 border-rose-gold text-rose-gold font-semibold rounded-xl hover:bg-rose-gold hover:text-cream transition-colors"
          >
            View All Salons
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedSalons
