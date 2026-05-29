'use client'

import { motion } from 'framer-motion'
import { Search, Calendar, Sparkles } from 'lucide-react'
import { BOOKING_STEPS } from '@/lib/data'
import { fadeUp } from '@/lib/motion'

const stepIcons = [Search, Calendar, Sparkles]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-warm-black mb-5">
            Book in 3 Simple Steps
          </h2>
          <p className="text-warm-black/60 text-lg md:text-xl max-w-3xl mx-auto">
            Experience luxury beauty services with our seamless booking process
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-1 bg-rose-gold/25 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {BOOKING_STEPS.map((step, index) => {
              const IconComponent = stepIcons[index]
              return (
                <motion.div
                  key={step.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center px-4">
                    <div className="relative mb-8 md:mb-10">
                      <div className="absolute inset-0 bg-rose-gold/15 rounded-full blur-2xl scale-150" />
                      <div className="relative w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-rose-gold to-blush rounded-full flex items-center justify-center shadow-lg">
                        <span className="font-playfair text-4xl md:text-5xl font-bold text-cream">
                          {step.number}
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-14 h-14 md:w-16 md:h-16 bg-cream rounded-full flex items-center justify-center shadow-xl border-2 border-rose-gold/20">
                        <IconComponent className="h-7 w-7 md:h-8 md:w-8 text-rose-gold" />
                      </div>
                    </div>
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-warm-black mb-4">
                      {step.title}
                    </h3>
                    <p className="text-warm-black/65 text-base md:text-lg leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
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
