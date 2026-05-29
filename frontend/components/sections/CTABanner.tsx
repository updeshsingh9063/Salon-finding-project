'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const CTABanner = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-rose-gold to-blush">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <Sparkles className="h-12 w-12 text-cream mx-auto mb-4" />
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4">
              Ready to Glow?
            </h2>
            <p className="text-cream/90 text-lg md:text-xl mb-8">
              Book your first appointment today and experience Mumbai&apos;s most loved beauty services
            </p>
            <a
              href="/salons"
              className="inline-block px-8 py-4 bg-cream text-warm-black font-semibold rounded-lg hover:bg-cream/90 transition-colors shadow-lg"
            >
              Explore Salons
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
