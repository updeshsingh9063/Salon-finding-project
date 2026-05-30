'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { fadeUp } from '@/lib/motion'
import type { Testimonial } from '@/lib/types'

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com').replace(/\/+$/, '')

const FALLBACK: Testimonial[] = [
  { id: '1', name: 'Priya Sharma', location: 'Bandra', rating: 5, text: 'Booked my bridal makeup through GlowCity and it was absolutely perfect. The AI recommendation was spot on!', avatarInitials: 'PS' },
  { id: '2', name: 'Ananya Mehta', location: 'Juhu', rating: 5, text: 'Found my go-to nail studio in 2 minutes. The search filters are amazing and so easy to use.', avatarInitials: 'AM' },
  { id: '3', name: 'Riya Kapoor', location: 'Andheri', rating: 4, text: 'Best salon discovery app in Mumbai. My blowout was everything I dreamed of!', avatarInitials: 'RK' },
  { id: '4', name: 'Sneha Verma', location: 'Worli', rating: 5, text: 'The booking experience was seamless. My hair spa at The Glow Room was divine!', avatarInitials: 'SV' },
  { id: '5', name: 'Kavita Nair', location: 'Powai', rating: 5, text: 'GlowCity made finding a luxury facial in my area so effortless. Will always use this.', avatarInitials: 'KN' },
]

const gradients = [
  'from-rose-gold to-blush',
  'from-espresso to-rose-gold',
  'from-blush to-espresso',
  'from-rose-gold to-espresso',
  'from-espresso to-blush',
]

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div className="w-[340px] md:w-[380px] shrink-0 bg-white/8 backdrop-blur-md border border-white/10 rounded-3xl p-7 md:p-8 flex flex-col gap-5">
      <Quote className="h-8 w-8 text-rose-gold/50 shrink-0" />
      <p className="text-cream/85 italic text-base md:text-lg leading-relaxed flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full flex items-center justify-center shrink-0`}>
          <span className="font-bold text-cream">{testimonial.avatarInitials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-cream">{testimonial.name}</h4>
          <p className="text-cream/50 text-sm">{testimonial.location}</p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/salons/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data?.length ? data : FALLBACK))
      .catch(() => setTestimonials(FALLBACK))
  }, [])

  const items = testimonials.length ? testimonials : FALLBACK
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <section className="py-20 md:py-28 bg-espresso relative overflow-hidden">
      {/* Soft glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-gold/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-16">
        <motion.div {...fadeUp} className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-gold/20 text-rose-gold rounded-full text-sm font-semibold mb-4 border border-rose-gold/30"
          >
            <Star className="h-4 w-4 fill-rose-gold" />
            Client Love
          </motion.div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-5">
            What Mumbai Says
          </h2>
          <p className="text-cream/60 text-lg md:text-xl max-w-3xl mx-auto">
            Hear from our satisfied clients who have experienced luxury beauty services through GlowCity
          </p>
        </motion.div>
      </div>

      {/* Marquee carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-espresso to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-espresso to-transparent z-10 pointer-events-none" />

        <div className="flex gap-5 md:gap-6 animate-marquee will-change-transform px-4">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
