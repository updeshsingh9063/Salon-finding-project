'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, Phone, Wifi, Car, Wind, CreditCard, Heart, Share2, Calendar, Users, Sparkles } from 'lucide-react'
import { SALONS, SERVICES } from '@/lib/data'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'
import BookingModal from '@/components/ui/BookingModal'
import type { Salon, Service } from '@/lib/types'

type TabType = 'overview' | 'services' | 'reviews' | 'location'

export default function SalonDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [salon, setSalon] = useState<Salon | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch fresh salon data from API
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com'
    setLoading(true)
    Promise.all([
      fetch(`${apiUrl}/api/salons/${params.id}`).then(res => { if (!res.ok) throw new Error(); return res.json() }),
      fetch(`${apiUrl}/api/salons/services`).then(res => { if (!res.ok) throw new Error(); return res.json() })
    ])
      .then(([salonData, servicesData]) => {
        setSalon(salonData)
        setServices(servicesData)
        setLoading(false)
      })
      .catch(() => {
        // Fallback to static data on error
        setSalon(SALONS.find(s => s.id === params.id) ?? null)
        setServices(SERVICES)
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-black/60">Loading salon details...</p>
        </div>
      </div>
    )
  }

  if (!salon) {
    notFound()
  }

  const priceLevelSymbols = {
    1: '₹',
    2: '₹₹',
    3: '₹₹₹',
    4: '₹₹₹₹',
  }

  const priceLevelColors = {
    1: 'text-green-600',
    2: 'text-yellow-600',
    3: 'text-orange-600',
    4: 'text-red-600',
  }

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const totalPrice = selectedServices.reduce((total, serviceId) => {
    const service = services.find(s => s.id === serviceId)
    return total + (service?.price || 0)
  }, 0)

  const reviews = [
    { id: '1', name: 'Priya Sharma', rating: 5, date: '2 days ago', text: 'Amazing bridal makeup service! The artists are so talented and professional.' },
    { id: '2', name: 'Ananya Mehta', rating: 5, date: '1 week ago', text: 'Best hair spa in Mumbai. My hair feels so healthy and shiny now.' },
    { id: '3', name: 'Riya Kapoor', rating: 4, date: '2 weeks ago', text: 'Great service but parking was a bit difficult to find.' },
    { id: '4', name: 'Sneha Patel', rating: 5, date: '3 weeks ago', text: 'Perfect for my engagement makeup. Everyone complimented me!' },
    { id: '5', name: 'Neha Singh', rating: 5, date: '1 month ago', text: 'Professional staff and hygienic environment. Highly recommended.' },
    { id: '6', name: 'Maya Reddy', rating: 4, date: '1 month ago', text: 'Good service but a bit pricey. Quality is excellent though.' },
  ]

  const ratingDistribution = {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1,
  }

  return (
    <>
      <div className="min-h-screen bg-cream pt-20 pb-28 lg:pb-12">
      <div className="relative">
        <div className="h-48 sm:h-64 md:h-96 bg-gradient-to-r from-rose-gold to-blush" />
        
        <div className="container mx-auto px-4 md:px-6 -mt-12 sm:-mt-16 md:-mt-24 relative">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  {salon.badge && (
                    <span className="px-3 py-1 bg-rose-gold text-cream text-sm font-semibold rounded-full">
                      {salon.badge}
                    </span>
                  )}
                  <span className={cn('font-bold text-lg', priceLevelColors[salon.priceLevel])}>
                    {priceLevelSymbols[salon.priceLevel]}
                  </span>
                </div>

                <h1 className="font-playfair text-3xl md:text-4xl font-bold text-warm-black mb-3">
                  {salon.name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-warm-black/60 mb-4 text-sm sm:text-base">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span>{salon.area}, {salon.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 shrink-0" />
                    <span className="font-bold">{salon.rating}</span>
                    <span>({salon.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span>{salon.hours.open} - {salon.hours.close}</span>
                  </div>
                </div>

                <p className="text-warm-black/70">
                  {salon.description}
                </p>
              </div>

              <div className="flex md:flex-col gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    'p-3 rounded-full border transition-colors',
                    isFavorite
                      ? 'bg-rose-gold/10 border-rose-gold text-rose-gold'
                      : 'bg-cream border-espresso/10 hover:border-rose-gold'
                  )}
                >
                  <Heart className={cn(
                    'h-5 w-5',
                    isFavorite && 'fill-rose-gold'
                  )} />
                </button>
                <button className="p-3 rounded-full bg-cream border border-espresso/10 hover:border-rose-gold transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="border-b border-espresso/10 mb-6 sm:mb-8 -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="flex overflow-x-auto hide-scrollbar -mb-px gap-1">
                {(['overview', 'services', 'reviews', 'location'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'px-4 sm:px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors shrink-0',
                      activeTab === tab
                        ? 'border-rose-gold text-rose-gold'
                        : 'border-transparent text-warm-black/60 hover:text-warm-black'
                    )}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-warm-black mb-4">
                      About
                    </h3>
                    <p className="text-warm-black/70">
                      {salon.description} We pride ourselves on providing exceptional service with attention to detail. Our team of experienced professionals is dedicated to making your beauty experience memorable.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-warm-black mb-4">
                      Highlights
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                      {salon.highlights.map((highlight, index) => {
                        const icons = {
                          'AC': Wind,
                          'Parking': Car,
                          'WiFi': Wifi,
                          'Card Accepted': CreditCard,
                          'Valet Parking': Car,
                          'Refreshments': Sparkles,
                          'Private Rooms': Users,
                        }
                        const IconComponent = icons[highlight as keyof typeof icons] || Sparkles
                        return (
                          <div key={index} className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                            <IconComponent className="h-5 w-5 text-rose-gold" />
                            <span className="font-medium">{highlight}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-playfair text-2xl font-bold text-warm-black mb-4">
                      Opening Hours
                    </h3>
                    <div className="bg-cream rounded-xl p-4">
                      <div className="flex justify-between items-center py-3 border-b border-espresso/10 last:border-b-0">
                        <span className="font-medium">Monday - Friday</span>
                        <span>{salon.hours.open} - {salon.hours.close}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-espresso/10 last:border-b-0">
                        <span className="font-medium">Saturday</span>
                        <span>{salon.hours.open} - {salon.hours.close}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="font-medium">Sunday</span>
                        <span className="text-rose-gold font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                    <h3 className="font-playfair text-xl sm:text-2xl font-bold text-warm-black">
                      Services
                    </h3>
                    {selectedServices.length > 0 && (
                      <div className="text-sm text-warm-black/60">
                        {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected • ₹{totalPrice}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={cn(
                          'p-4 rounded-xl border transition-all cursor-pointer',
                          selectedServices.includes(service.id)
                            ? 'border-rose-gold bg-rose-gold/5'
                            : 'border-espresso/10 hover:border-rose-gold/50'
                        )}
                        onClick={() => toggleService(service.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-warm-black mb-1">
                              {service.name}
                            </h4>
                            <p className="text-warm-black/60 text-sm mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-warm-black/70">
                                {service.duration}
                              </span>
                              <span className="font-bold text-rose-gold">
                                ₹{service.price}
                              </span>
                            </div>
                          </div>
                          <button className="ml-4 p-2">
                            <div className={cn(
                              'w-5 h-5 rounded-full border transition-colors',
                              selectedServices.includes(service.id)
                                ? 'bg-rose-gold border-rose-gold'
                                : 'border-espresso/30'
                            )} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedServices.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="sticky bottom-20 lg:bottom-6 bg-white border border-espresso/10 rounded-xl p-4 shadow-lg z-30"
                    >
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-warm-black text-lg">₹{totalPrice}</div>
                          <div className="text-sm text-warm-black/60">
                            {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        <button
                          onClick={() => setShowBooking(true)}
                          className="px-6 py-3 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors text-center"
                        >
                          Continue to Booking
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="bg-gradient-to-r from-rose-gold/5 to-blush/5 rounded-2xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Sparkles className="h-6 w-6 text-rose-gold mt-1" />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-warm-black">AI Summary</h4>
                          <span className="px-2 py-0.5 bg-rose-gold/20 text-rose-gold text-xs font-medium rounded-full">
                            AI Generated
                          </span>
                        </div>
                        <p className="text-warm-black/70">
                          Customers love the bridal packages and professional staff. The salon maintains excellent hygiene standards and offers comfortable waiting areas. Parking can be limited on weekends, so consider booking in advance or using public transport.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="bg-cream rounded-xl p-6">
                        <div className="text-center mb-6">
                          <div className="font-playfair text-5xl font-bold text-warm-black mb-2">
                            {salon.rating}
                          </div>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'h-5 w-5',
                                  i < Math.floor(salon.rating)
                                    ? 'text-yellow-500 fill-yellow-500'
                                    : 'text-gray-300'
                                )}
                              />
                            ))}
                          </div>
                          <div className="text-warm-black/60">
                            {salon.reviewCount} reviews
                          </div>
                        </div>

                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div key={stars} className="flex items-center gap-3">
                              <div className="text-sm font-medium w-8">
                                {stars}★
                              </div>
                              <div className="flex-1 h-2 bg-espresso/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-rose-gold rounded-full"
                                  style={{ width: `${ratingDistribution[stars as keyof typeof ratingDistribution]}%` }}
                                />
                              </div>
                              <div className="text-sm text-warm-black/60 w-8 text-right">
                                {ratingDistribution[stars as keyof typeof ratingDistribution]}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="bg-cream rounded-xl p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-rose-gold to-blush rounded-full flex items-center justify-center">
                                  <span className="font-bold text-cream">
                                    {review.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <h5 className="font-bold text-warm-black">
                                    {review.name}
                                  </h5>
                                  <div className="flex items-center gap-2 text-sm text-warm-black/60">
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={cn(
                                            'h-3 w-3',
                                            i < review.rating
                                              ? 'text-yellow-500 fill-yellow-500'
                                              : 'text-gray-300'
                                          )}
                                        />
                                      ))}
                                    </div>
                                    <span>•</span>
                                    <span>{review.date}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-warm-black/70">
                              {review.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'location' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="bg-cream rounded-2xl overflow-hidden shadow-lg">
                    <div className="h-64 md:h-96 bg-gradient-to-r from-rose-gold/20 to-blush/20 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-rose-gold mx-auto mb-4" />
                        <p className="text-warm-black/60">
                          Google Maps integration would show here
                        </p>
                        <p className="text-sm text-warm-black/40 mt-2">
                          (Mumbai, India)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-playfair text-xl font-bold text-warm-black">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-rose-gold" />
                          <div>
                            <div className="font-medium">{salon.address}</div>
                            <div className="text-sm text-warm-black/60">
                              {salon.area}, {salon.city}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-rose-gold" />
                          <div>
                            <div className="font-medium">{salon.phone}</div>
                            <div className="text-sm text-warm-black/60">
                              Call for appointments
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-playfair text-xl font-bold text-warm-black">
                        Get Directions
                      </h4>
                      <div className="space-y-3">
                        <a
                          href={`https://maps.google.com/?q=${salon.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors"
                        >
                          <MapPin className="h-5 w-5" />
                          Open in Google Maps
                        </a>
                        <p className="text-sm text-warm-black/60">
                          Opens navigation to {salon.name} in your preferred maps app
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-cream/95 backdrop-blur-md border-t border-espresso/10">
              <button
                onClick={() => setShowBooking(true)}
                className="block w-full py-3.5 sm:py-4 bg-rose-gold text-warm-black font-semibold rounded-xl text-center shadow-lg hover:bg-rose-gold/90 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      {salon && (
        <BookingModal
          isOpen={showBooking}
          onClose={() => setShowBooking(false)}
          salonId={salon.id}
          salonName={salon.name}
        />
      )}
    </>
  )
}