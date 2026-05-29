'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp } from '@/lib/motion'
import type { Testimonial } from '@/lib/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

const TestimonialSkeleton = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-3xl p-8 md:p-10 min-h-[280px] md:min-h-[320px] shadow-lg flex flex-col justify-between"
  >
    <div className="h-6 bg-cream rounded animate-pulse w-1/3 mb-4" />
    <div className="space-y-2 flex-1">
      <div className="h-4 bg-cream rounded animate-pulse w-full" />
      <div className="h-4 bg-cream rounded animate-pulse w-5/6" />
      <div className="h-4 bg-cream rounded animate-pulse w-4/5" />
    </div>
    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-espresso/5">
      <div className="w-14 h-14 rounded-full bg-cream animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-cream rounded animate-pulse w-1/2" />
        <div className="h-3 bg-cream rounded animate-pulse w-1/3" />
      </div>
    </div>
  </motion.div>
)

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/salons/testimonials`)
      .then(res => res.json())
      .then(data => {
        setTestimonials(data ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14 md:mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-warm-black mb-5">
            What Mumbai Says
          </h2>
          <p className="text-warm-black/60 text-lg md:text-xl max-w-3xl mx-auto">
            Hear from our satisfied clients who have experienced luxury beauty services through GlowCity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {loading
            ? [0, 1, 2].map(i => <TestimonialSkeleton key={i} delay={i * 0.12} />)
            : testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.12 }}
                  className="bg-white rounded-3xl p-8 md:p-10 min-h-[280px] md:min-h-[320px] flex flex-col shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <Quote className="h-10 w-10 md:h-12 md:w-12 text-rose-gold/35 mb-6 shrink-0" />
                  <p className="text-warm-black/80 mb-8 italic text-base md:text-lg leading-relaxed flex-1">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-espresso/5">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-rose-gold to-blush rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold text-cream text-lg">{testimonial.avatarInitials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-warm-black text-lg md:text-xl">{testimonial.name}</h4>
                      <p className="text-warm-black/60 text-base">{testimonial.location}</p>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5 md:h-6 md:w-6',
                            i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
