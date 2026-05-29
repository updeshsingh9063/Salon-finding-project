'use client'

import { motion } from 'framer-motion'
import { Heart, Star, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Salon } from '@/lib/types'
import { useState } from 'react'

interface SalonCardProps {
  salon: Salon
  index?: number
}

const SalonCard = ({ salon, index = 0 }: SalonCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const priceLevelSymbols: Record<number, string> = {
    1: '₹',
    2: '₹₹',
    3: '₹₹₹',
    4: '₹₹₹₹',
  }

  const priceLevelColors: Record<number, string> = {
    1: 'text-green-600',
    2: 'text-yellow-600',
    3: 'text-orange-600',
    4: 'text-red-600',
  }

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full"
    >
      <Link href={`/salons/${salon.id}`} className="block h-full flex flex-col">
        <div className="relative aspect-[5/4] sm:aspect-[4/3] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cream via-blush/30 to-cream" />
          )}
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
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {salon.badge && (
            <div className="absolute top-5 left-5 z-10">
              <span className="px-4 py-1.5 bg-rose-gold text-cream text-sm md:text-base font-semibold rounded-full">
                {salon.badge}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-5 right-5 z-10 p-2.5 bg-white/25 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
          >
            <Heart
              className={cn(
                'h-6 w-6',
                isFavorite ? 'fill-rose-gold text-rose-gold' : 'text-cream'
              )}
            />
          </button>

          <div className="absolute bottom-5 left-5 right-5 z-10">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-cream mb-2 leading-tight">
              {salon.name}
            </h3>
            <div className="flex items-center gap-2 text-cream/95">
              <MapPin className="h-5 w-5 shrink-0" />
              <span className="text-base md:text-lg">
                {salon.area}, {salon.city}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-warm-black text-lg md:text-xl">{salon.rating}</span>
              <span className="text-warm-black/60 text-base">({salon.reviewCount} reviews)</span>
            </div>
            <span className={cn('font-bold text-lg md:text-xl', priceLevelColors[salon.priceLevel])}>
              {priceLevelSymbols[salon.priceLevel]}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {salon.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="px-4 py-1.5 bg-cream text-warm-black text-sm md:text-base font-medium rounded-full"
              >
                {service}
              </span>
            ))}
          </div>

          <motion.span
            whileTap={{ scale: 0.97 }}
            className="block w-full py-4 text-center text-base md:text-lg bg-rose-gold text-warm-black font-semibold rounded-xl hover:bg-rose-gold/90 transition-colors mt-auto"
          >
            Book Now
          </motion.span>
        </div>
      </Link>
    </motion.div>
  )
}

export default SalonCard
