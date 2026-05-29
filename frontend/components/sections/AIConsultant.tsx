'use client'

import { motion } from 'framer-motion'
import { Sparkles, MessageSquare } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const AIConsultant = () => {
  return (
    <section className="py-16 md:py-24 bg-espresso relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-rose-gold/30 rounded-full"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-rose-gold" />
              <span className="text-rose-gold font-semibold text-lg">AI Beauty Consultant</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-6">
              Meet Your AI Beauty Consultant
            </h2>
            <p className="text-cream/80 text-lg mb-8">
              Tell us your occasion, vibe and area — our AI recommends the perfect salon just for you.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              Try AI Consultant
            </motion.button>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="bg-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-cream/10"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center shrink-0">
                  <span className="text-cream font-bold text-sm">U</span>
                </div>
                <div className="bg-cream/10 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                  <p className="text-cream">I need bridal makeup in Bandra</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-gold to-blush rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-cream" />
                </div>
                <div className="bg-gradient-to-r from-rose-gold/20 to-blush/20 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                  <p className="text-cream font-medium mb-2">I found 3 perfect salons for you!</p>
                  <p className="text-cream/80 text-sm">
                    Lavelle Beauty has 4.9★ and specializes in Indian bridal looks...
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Bridal makeup in Bandra', 'Best nail salon near me', 'Hair spa under ₹1000'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="px-4 py-2 bg-cream/10 text-cream rounded-lg hover:bg-cream/20 transition-colors text-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AIConsultant
