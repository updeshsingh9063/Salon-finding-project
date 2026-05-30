'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, MapPin, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Salon } from '@/lib/types'
import { useState, useCallback } from 'react'

interface SalonCardProps {
  salon: Salon
  index?: number
}

const priceLevelSymbols: Record<number, string> = { 1: '₹', 2: '₹₹', 3: '₹₹₹', 4: '₹₹₹₹' }
const priceLevelColors: Record<number, string> = {
  1: 'text-green-500',
  2: 'text-amber-500',
  3: 'text-orange-500',
  4: 'text-red-500',
}

function isOpen(salon: Salon): boolean {
  if (!salon.hours) return true
  const now = new Date()
  const [oh, om] = salon.hours.open.split(':').map(Number)
  const [ch, cm] = salon.hours.close.split(':').map(Number)
  const current = now.getHours() * 60 + now.getMinutes()
  return current >= oh * 60 + om && current <= ch * 60 + cm
}

const SalonCard = ({ salon, index = 0 }: SalonCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const open = isOpen(salon)

  const toggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(prev => !prev)
  }, [])

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
      className="bg-white rounded-3xl overflow-hidden h-full flex flex-col card-shadow hover:card-shadow-hover transition-shadow group"
    >
      <Link href={`/salons/${salon.id}`} className="flex flex-col flex-1">
        {/* Image area */}
        <div className="relative aspect-[5/4] sm:aspect-[4/3] overflow-hidden">
          {/* Skeleton shimmer */}
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer bg-gradient-to-r from-cream via-blush/20 to-cream" />
          )}

          {/* Image with zoom on hover */}
          {!imageError && (
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={salon.image}
                alt={salon.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={cn(
                  'object-cover transition-opacity duration-500',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
                loading={index < 3 ? 'eager' : 'lazy'}
                onLoad={() => setImageLoaded(true)}
                onError={() => { setImageError(true); setImageLoaded(true) }}
              />
            </motion.div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Badge */}
          {salon.badge && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4 z-10"
            >
              <span className="px-3 py-1.5 bg-rose-gold text-cream text-xs md:text-sm font-bold rounded-full shadow-lg">
                {salon.badge}
              </span>
            </motion.div>
          )}

          {/* Open/Closed indicator */}
          <div className="absolute top-4 right-14 z-10">
            <span className={cn(
              'px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-sm border',
              open
                ? 'bg-green-500/20 text-green-300 border-green-400/30'
                : 'bg-red-500/20 text-red-300 border-red-400/30'
            )}>
              {open ? '● Open' : '● Closed'}
            </span>
          </div>

          {/* Favorite button */}
          <motion.button
            type="button"
            onClick={toggleFavorite}
            whileTap={{ scale: 0.85 }}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/35 transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={String(isFavorite)}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                <Heart
                  className={cn('h-5 w-5', isFavorite ? 'fill-rose-500 text-rose-500' : 'text-cream')}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Bottom info overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h3 className="font-playfair text-xl md:text-2xl font-bold text-cream mb-1 leading-tight">
              {salon.name}
            </h3>
            <div className="flex items-center gap-1.5 text-cream/90">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="text-sm md:text-base">{salon.area}, {salon.city}</span>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 md:p-6 flex flex-col flex-1 gap-4">
          {/* Rating + Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-warm-black">{salon.rating}</span>
              <span className="text-warm-black/50 text-sm">({salon.reviewCount})</span>
            </div>
            <div className="flex items-center gap-2">
              {salon.hours && (
                <div className="flex items-center gap-1 text-warm-black/50 text-xs">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{salon.hours.open}–{salon.hours.close}</span>
                </div>
              )}
              <span className={cn('font-bold text-base', priceLevelColors[salon.priceLevel])}>
                {priceLevelSymbols[salon.priceLevel]}
              </span>
            </div>
          </div>

          {/* Service tags */}
          <div className="flex flex-wrap gap-1.5">
            {salon.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="px-3 py-1 bg-rose-gold/8 text-rose-gold text-xs md:text-sm font-medium rounded-full border border-rose-gold/15"
              >
                {service}
              </span>
            ))}
            {salon.services.length > 3 && (
              <span className="px-3 py-1 bg-cream text-warm-black/50 text-xs font-medium rounded-full">
                +{salon.services.length - 3} more
              </span>
            )}
          </div>

          {/* Book Now CTA */}
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="mt-auto flex items-center justify-between py-3 px-4 bg-rose-gold/8 hover:bg-rose-gold/15 border border-rose-gold/20 hover:border-rose-gold/40 rounded-xl transition-all group/btn"
          >
            <span className="font-semibold text-rose-gold text-sm md:text-base">Book Now</span>
            <ArrowRight className="h-4 w-4 text-rose-gold transition-transform group-hover/btn:translate-x-1" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}

export default SalonCard
