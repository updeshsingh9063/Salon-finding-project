'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Scissors, Paintbrush, Leaf, Droplets, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp } from '@/lib/motion'
import type { Category } from '@/lib/types'
import { useRouter } from 'next/navigation'

const categoryFilterMap: Record<string, string> = {
  'Bridal Makeup': 'Bridal',
  'Hair Styling': 'Hair',
  'Nail Art': 'Nails',
  'Facial & Skin': 'Facial',
  'Hair Spa': 'Spa',
  'Makeup Studio': 'Makeup',
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

const iconMap = {
  sparkles: Sparkles,
  scissors: Scissors,
  paintbrush: Paintbrush,
  leaf: Leaf,
  droplets: Droplets,
  star: Star,
}

/** Full class names required — Tailwind cannot purge-scan dynamic strings from data */
const gradientById: Record<string, string> = {
  '1': 'bg-gradient-to-br from-rose-gold to-blush',
  '2': 'bg-gradient-to-br from-espresso to-rose-gold',
  '3': 'bg-gradient-to-br from-blush to-rose-gold',
  '4': 'bg-gradient-to-br from-rose-gold to-espresso',
  '5': 'bg-gradient-to-br from-espresso to-blush',
  '6': 'bg-gradient-to-br from-blush to-espresso',
}

const CategorySkeleton = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-gradient-to-r from-cream via-blush/20 to-cream animate-pulse rounded-3xl p-8 md:p-10 min-h-[220px] md:min-h-[260px]"
  />
)

const Categories = () => {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/salons/meta`)
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories ?? [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="categories" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center mb-14 md:mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-warm-black mb-5">
            Browse by Service
          </h2>
          <p className="text-warm-black/60 text-lg md:text-xl max-w-3xl mx-auto">
            Find the perfect beauty service for your needs from our curated categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading
            ? [0, 1, 2, 3, 4, 5].map(i => <CategorySkeleton key={i} delay={i * 0.08} />)
            : categories.map((category, index) => {
                const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Sparkles
                return (
                  <motion.div
                    key={category.id}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                    whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                    onClick={() => {
                      const service = categoryFilterMap[category.name] || 'all'
                      router.push(`/salons?service=${service}`)
                    }}
                    className={cn(
                      'rounded-3xl p-8 md:p-10 min-h-[220px] md:min-h-[260px] flex flex-col cursor-pointer shadow-lg hover:shadow-2xl transition-shadow',
                      gradientById[category.id] || 'bg-gradient-to-br from-rose-gold to-blush'
                    )}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-white/25 rounded-2xl">
                        <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-cream" />
                      </div>
                      <span className="text-cream/90 font-semibold text-base md:text-lg">
                        {category.salonCount} salons
                      </span>
                    </div>
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-cream mb-3">
                      {category.name}
                    </h3>
                    <p className="text-cream/90 text-base md:text-lg leading-relaxed mt-auto">
                      Premium {category.name.toLowerCase()} services from top-rated salons
                    </p>
                  </motion.div>
                )
              })}
        </div>
      </div>
    </section>
  )
}

export default Categories
