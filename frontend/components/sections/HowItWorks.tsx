'use client'

import { motion } from 'framer-motion'
import { Search, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import { BOOKING_STEPS } from '@/lib/data'
import { fadeUp } from '@/lib/motion'

const stepIcons = [Search, Calendar, Sparkles]
const stepColors = [
  'from-rose-gold to-blush',
  'from-espresso to-rose-gold',
  'from-blush to-rose-gold',
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      {/* Subtle background dots */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1A0A00 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div {...fadeUp} className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-gold/10 text-rose-gold rounded-full text-sm font-semibold mb-4"
          >
            <Sparkles className="h-4 w-4" />
            Simple &amp; Fast
          </motion.div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-warm-black mb-5">
            Book in 3 Simple Steps
          </h2>
          <p className="text-warm-black/60 text-lg md:text-xl max-w-3xl mx-auto">
            Experience luxury beauty services with our seamless booking process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated connector — desktop */}
          <div className="hidden lg:flex absolute top-[3.75rem] left-[20%] right-[20%] items-center z-0">
            {[0, 1].map((i) => (
              <div key={i} className="flex-1 flex items-center gap-1 mx-2">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 h-[2px] bg-gradient-to-r from-rose-gold/40 to-rose-gold origin-left"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.2 }}
                  className="text-rose-gold/60"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {BOOKING_STEPS.map((step, index) => {
              const IconComponent = stepIcons[index]
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  <motion.div
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="bg-white rounded-3xl p-8 md:p-10 text-center card-shadow hover:card-shadow-hover transition-shadow"
                  >
                    {/* Circle icon stack */}
                    <div className="relative w-28 h-28 mx-auto mb-8">
                      {/* Outer glow ring */}
                      <motion.div
                        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${stepColors[index]} blur-xl opacity-40`}
                      />
                      {/* Main circle */}
                      <div className={`relative w-full h-full bg-gradient-to-br ${stepColors[index]} rounded-full flex items-center justify-center shadow-lg`}>
                        <span className="font-playfair text-5xl font-bold text-cream">
                          {step.number}
                        </span>
                      </div>
                      {/* Icon badge */}
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-rose-gold/20">
                        <IconComponent className="h-6 w-6 text-rose-gold" />
                      </div>
                    </div>

                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-warm-black mb-4">
                      {step.title}
                    </h3>
                    <p className="text-warm-black/60 text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
