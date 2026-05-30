'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'

const stats = [
  { value: 200, suffix: '+', label: 'Premium Salons', icon: '💅' },
  { value: 50000, suffix: '+', label: 'Happy Clients', icon: '🌟' },
  { value: 4.8, suffix: '★', label: 'Average Rating', icon: '⭐', decimals: 1 },
  { value: 15, suffix: '+', label: 'Mumbai Areas', icon: '📍' },
]

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
  inView,
}: {
  value: number
  suffix: string
  decimals?: number
  inView: boolean
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => v.toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    })
    return controls.stop
  }, [inView, value, count])

  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const StatsBar = () => {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-16 md:py-24 bg-espresso overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-rose-gold/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center px-6 py-10 group"
            >
              {/* Vertical divider (not on last) */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-cream/10" />
              )}

              {/* Icon */}
              <motion.div
                animate={inView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
                className="text-2xl mb-3"
              >
                {stat.icon}
              </motion.div>

              {/* Number */}
              <div className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-rose-gold mb-2 tabular-nums">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  inView={inView}
                />
              </div>

              {/* Label */}
              <p className="text-cream/60 font-medium text-sm md:text-base tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
