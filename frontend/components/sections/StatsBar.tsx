'use client'

import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'

const stats = [
  { value: '200+', label: 'Premium Salons' },
  { value: '50,000+', label: 'Happy Clients' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '15+', label: 'Mumbai Areas' },
]

const StatsBar = () => {
  return (
    <section className="bg-cream py-14 md:py-20 border-y border-espresso/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className="text-center"
            >
              <div className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-rose-gold mb-3">
                {stat.value}
              </div>
              <p className="text-warm-black/70 font-medium text-base md:text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
