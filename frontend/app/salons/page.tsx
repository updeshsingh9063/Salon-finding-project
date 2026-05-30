'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, MapPin, Star, X, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { AREAS, SERVICE_TYPES } from '@/lib/data'
import SalonCard from '@/components/ui/SalonCard'
import { cn } from '@/lib/utils'
import type { Salon } from '@/lib/types'

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com').replace(/\/+$/, '')

type FilterState = {
  areas: string[]
  services: string[]
  minRating: number | null
  priceLevels: number[]
  sortBy: 'rating' | 'reviews' | 'price-low' | 'price-high'
}

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
    <div className="aspect-[5/4] sm:aspect-[4/3] bg-gradient-to-r from-cream via-blush/20 to-cream animate-pulse" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-cream rounded-full animate-pulse w-2/3" />
      <div className="h-4 bg-cream rounded-full animate-pulse w-1/2" />
      <div className="flex gap-2 pt-2">
        <div className="h-7 w-20 bg-cream rounded-full animate-pulse" />
        <div className="h-7 w-16 bg-cream rounded-full animate-pulse" />
      </div>
      <div className="h-12 bg-rose-gold/20 rounded-xl animate-pulse mt-4" />
    </div>
  </div>
)

function SalonsPageContent() {
  const searchParams = useSearchParams()
  const initialArea    = searchParams.get('area')    ?? ''
  const initialService = searchParams.get('service') ?? ''

  const [salons, setSalons] = useState<Salon[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    areas:       initialArea    ? [initialArea]    : [],
    services:    initialService ? [initialService] : [],
    minRating:   null,
    priceLevels: [],
    sortBy:      'rating',
  })

  const fetchSalons = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.areas.length > 0) params.set('area', filters.areas.join(','))
      if (filters.services.length > 0) params.set('service', filters.services.join(','))
      if (filters.minRating) params.set('minRating', String(filters.minRating))
      if (filters.priceLevels.length > 0) params.set('priceLevel', filters.priceLevels.join(','))
      params.set('sort', filters.sortBy)

      const res = await fetch(`${API_URL}/api/salons?${params.toString()}`)
      const data = await res.json()
      setSalons(data.salons ?? [])
    } catch {
      setSalons([])
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchSalons()
  }, [fetchSalons])

  useEffect(() => {
    document.body.style.overflow = showFilters ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showFilters])

  const toggleArea = (area: string) =>
    setFilters(prev => ({
      ...prev,
      areas: prev.areas.includes(area) ? prev.areas.filter(a => a !== area) : [...prev.areas, area],
    }))

  const toggleService = (service: string) =>
    setFilters(prev => ({
      ...prev,
      services: prev.services.includes(service) ? prev.services.filter(s => s !== service) : [...prev.services, service],
    }))

  const togglePriceLevel = (level: number) =>
    setFilters(prev => ({
      ...prev,
      priceLevels: prev.priceLevels.includes(level) ? prev.priceLevels.filter(l => l !== level) : [...prev.priceLevels, level],
    }))

  const clearFilters = () =>
    setFilters({ areas: [], services: [], minRating: null, priceLevels: [], sortBy: 'rating' })

  const activeFilterCount = [
    filters.areas.length,
    filters.services.length,
    filters.minRating ? 1 : 0,
    filters.priceLevels.length,
  ].reduce((a, b) => a + b, 0)

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-warm-black mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-rose-gold" /> Area
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          {AREAS.map(area => (
            <button
              key={area} type="button" onClick={() => toggleArea(area)}
              className={cn(
                'text-left px-3 py-2 rounded-lg transition-all text-sm font-medium',
                filters.areas.includes(area)
                  ? 'bg-rose-gold text-cream shadow-sm'
                  : 'bg-cream hover:bg-rose-gold/10 text-warm-black'
              )}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-warm-black mb-3">Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          {SERVICE_TYPES.map(service => (
            <button
              key={service} type="button" onClick={() => toggleService(service)}
              className={cn(
                'text-left px-3 py-2 rounded-lg transition-all text-sm font-medium',
                filters.services.includes(service)
                  ? 'bg-rose-gold text-cream shadow-sm'
                  : 'bg-cream hover:bg-rose-gold/10 text-warm-black'
              )}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-warm-black mb-3 flex items-center gap-2">
          <Star className="h-4 w-4 text-rose-gold" /> Minimum Rating
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          {[4, 4.5].map(rating => (
            <button
              key={rating} type="button"
              onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? null : rating }))}
              className={cn(
                'text-left px-3 py-2 rounded-lg transition-all text-sm font-medium',
                filters.minRating === rating ? 'bg-rose-gold text-cream' : 'bg-cream hover:bg-rose-gold/10 text-warm-black'
              )}
            >
              {rating}★ & above
            </button>
          ))}
          <button
            type="button"
            onClick={() => setFilters(prev => ({ ...prev, minRating: null }))}
            className={cn(
              'text-left px-3 py-2 rounded-lg transition-all text-sm col-span-2 sm:col-span-1 font-medium',
              !filters.minRating ? 'bg-rose-gold text-cream' : 'bg-cream hover:bg-rose-gold/10 text-warm-black'
            )}
          >
            Any rating
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-warm-black mb-3">Price Level</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map(level => (
            <button
              key={level} type="button" onClick={() => togglePriceLevel(level)}
              className={cn(
                'px-4 py-2 rounded-lg transition-all text-sm font-medium',
                filters.priceLevels.includes(level) ? 'bg-rose-gold text-cream shadow-sm' : 'bg-cream hover:bg-rose-gold/10 text-warm-black'
              )}
            >
              {['₹', '₹₹', '₹₹₹', '₹₹₹₹'][level - 1]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cream pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-10"
        >
          <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl font-bold text-warm-black mb-2 sm:mb-4">
            Discover Mumbai&apos;s Best Salons
          </h1>
          <p className="text-warm-black/60 text-base sm:text-lg">
            Browse through our curated selection of premium beauty salons
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 max-h-[calc(100vh-7rem)] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair text-xl font-bold text-warm-black flex items-center gap-2">
                  <Filter className="h-5 w-5 text-rose-gold" />
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <button type="button" onClick={clearFilters} className="text-sm text-rose-gold hover:underline">
                    Clear all
                  </button>
                )}
              </div>
              <FilterContent />
            </motion.div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <motion.p
                  key={salons.length}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-warm-black/60 text-sm sm:text-base"
                >
                  {loading ? 'Finding salons...' : (
                    <>Showing <span className="font-bold text-warm-black">{salons.length}</span> salons in Mumbai</>
                  )}
                </motion.p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <select
                    value={filters.sortBy}
                    onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
                    className="w-full sm:w-auto bg-white border border-espresso/10 rounded-lg px-4 py-2.5 text-sm text-warm-black focus:outline-none focus:ring-2 focus:ring-rose-gold"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <button
                    type="button" onClick={() => setShowMap(!showMap)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-espresso/10 rounded-lg hover:bg-cream transition-colors text-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    {showMap ? 'Hide Map' : 'Map View'}
                  </button>
                </div>
              </div>

              {/* Mobile filter button */}
              <button
                type="button" onClick={() => setShowFilters(true)}
                className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl shadow-md font-semibold hover:bg-cream transition-colors"
              >
                <Filter className="h-5 w-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 bg-rose-gold text-cream text-xs rounded-full">{activeFilterCount}</span>
                )}
              </button>
            </div>

            {/* Map embed */}
            <AnimatePresence>
              {showMap && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 rounded-xl overflow-hidden shadow-lg"
                >
                  <iframe
                    title="Mumbai salons map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109855!3d19.0821977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f20d6fb83!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin"
                    className="w-full h-64 md:h-80 border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active filter chips */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {filters.areas.map(area => (
                    <button key={area} type="button" onClick={() => toggleArea(area)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-rose-gold text-cream rounded-full text-xs sm:text-sm font-medium hover:bg-rose-gold/80 transition-colors">
                      {area} <X className="h-3 w-3" />
                    </button>
                  ))}
                  {filters.services.map(service => (
                    <button key={service} type="button" onClick={() => toggleService(service)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-rose-gold text-cream rounded-full text-xs sm:text-sm font-medium hover:bg-rose-gold/80 transition-colors">
                      {service} <X className="h-3 w-3" />
                    </button>
                  ))}
                  {filters.minRating && (
                    <button type="button" onClick={() => setFilters(prev => ({ ...prev, minRating: null }))}
                      className="flex items-center gap-1 px-3 py-1.5 bg-rose-gold text-cream rounded-full text-xs sm:text-sm font-medium hover:bg-rose-gold/80 transition-colors">
                      {filters.minRating}★ & above <X className="h-3 w-3" />
                    </button>
                  )}
                  {filters.priceLevels.map(level => (
                    <button key={level} type="button" onClick={() => togglePriceLevel(level)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-rose-gold text-cream rounded-full text-xs sm:text-sm font-medium hover:bg-rose-gold/80 transition-colors">
                      {['₹', '₹₹', '₹₹₹', '₹₹₹₹'][level - 1]} <X className="h-3 w-3" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cards grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(filters) + loading}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : salons.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {salons.map((salon, index) => (
                      <motion.div
                        key={salon.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.06 }}
                      >
                        <SalonCard salon={salon} index={index} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 sm:py-16 px-4"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Search className="h-10 w-10 sm:h-12 sm:w-12 text-warm-black/30" />
                    </div>
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-warm-black mb-3">No salons found</h3>
                    <p className="text-warm-black/60 mb-6 text-sm sm:text-base">Try adjusting your filters to find more salons</p>
                    <button
                      type="button" onClick={clearFilters}
                      className="px-6 py-3 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85dvh] flex flex-col shadow-2xl"
            >
              <div className="w-12 h-1 bg-espresso/20 rounded-full mx-auto mt-3 mb-2 shrink-0" />
              <div className="flex items-center justify-between px-5 py-3 border-b border-espresso/10 shrink-0">
                <h2 className="font-playfair text-xl font-bold text-warm-black">Filters</h2>
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button type="button" onClick={clearFilters} className="text-sm text-rose-gold font-medium">Clear all</button>
                  )}
                  <button type="button" onClick={() => setShowFilters(false)} aria-label="Close">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-espresso/10 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <button
                  type="button" onClick={() => setShowFilters(false)}
                  className="w-full py-3.5 bg-rose-gold text-warm-black font-semibold rounded-xl"
                >
                  Show {salons.length} salons
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SalonsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream pt-20 flex items-center justify-center"><div className="w-16 h-16 border-4 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin mx-auto mb-4" /></div>}>
      <SalonsPageContent />
    </Suspense>
  )
}
