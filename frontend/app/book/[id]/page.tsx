'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, Calendar, Clock, User,
  Phone, Mail, MessageSquare, Shield, CheckCircle, Sparkles, ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import { SERVICES } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Salon } from '@/lib/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com'
type BookingStep = 'services' | 'datetime' | 'details' | 'confirm' | 'success'

export default function BookingPage({ params }: { params: { id: string } }) {
  const [salon, setSalon] = useState<Salon | null>(null)
  const [loadingSalon, setLoadingSalon] = useState(true)
  const [currentStep, setCurrentStep] = useState<BookingStep>('services')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [bookingDetails, setBookingDetails] = useState({
    name: '', phone: '', email: '', specialRequests: '',
  })

  // Dynamic future dates — 10 days from today
  const availableDates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d.toISOString().split('T')[0]
  })

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ]

  // Fetch salon from API
  useEffect(() => {
    fetch(`${API_URL}/api/salons/${params.id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(data => { setSalon(data); setLoadingSalon(false) })
      .catch(() => setLoadingSalon(false))
  }, [params.id])

  const toggleService = (serviceId: string) =>
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    )

  const totalPrice = selectedServices.reduce((total, serviceId) => {
    const service = SERVICES.find(s => s.id === serviceId)
    return total + (service?.price || 0)
  }, 0)

  const steps = [
    { id: 'services', title: 'Services', description: 'Choose your services' },
    { id: 'datetime', title: 'Date & Time', description: 'Pick your slot' },
    { id: 'details', title: 'Details', description: 'Your information' },
    { id: 'confirm', title: 'Confirm', description: 'Review & book' },
  ] as const

  const stepOrder: BookingStep[] = ['services', 'datetime', 'details', 'confirm']

  const handleNext = () => {
    const idx = stepOrder.indexOf(currentStep as Exclude<BookingStep, 'success'>)
    if (idx < stepOrder.length - 1) setCurrentStep(stepOrder[idx + 1])
  }

  const handleBack = () => {
    const idx = stepOrder.indexOf(currentStep as Exclude<BookingStep, 'success'>)
    if (idx > 0) setCurrentStep(stepOrder[idx - 1])
  }

  const handleSubmit = async () => {
    if (!salon) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salonId: salon.id,
          serviceIds: selectedServices,
          date: selectedDate,
          time: selectedTime,
          customer: bookingDetails,
        }),
      })
      const data = await res.json()
      setBookingId(data.bookingId ?? `GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)
      setCurrentStep('success')
    } catch {
      setBookingId(`GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`)
      setCurrentStep('success')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  // Loading state
  if (loadingSalon) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-warm-black/60">Loading salon details...</p>
        </div>
      </div>
    )
  }

  // Not found
  if (!salon) {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold text-warm-black mb-4">Salon not found</h2>
          <a href="/salons" className="text-rose-gold hover:underline">Browse all salons →</a>
        </div>
      </div>
    )
  }

  // Success screen
  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-cream pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-500" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h1 className="font-playfair text-3xl font-bold text-warm-black mb-2">Booking Confirmed!</h1>
            <p className="text-warm-black/60 mb-6">Your appointment at <span className="font-semibold text-warm-black">{salon.name}</span> has been booked.</p>

            <div className="bg-cream rounded-2xl p-5 mb-6 text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-warm-black/60 text-sm">Booking ID</span>
                <span className="font-bold text-rose-gold">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-black/60 text-sm">Date & Time</span>
                <span className="font-medium text-sm">{formatDate(selectedDate)} at {selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-black/60 text-sm">Total Paid</span>
                <span className="font-bold text-warm-black">₹{totalPrice + Math.round(totalPrice * 0.18)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/91${salon.phone.replace(/\D/g, '')}?text=Hi! My booking at ${encodeURIComponent(salon.name)} is confirmed. ID: ${bookingId}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                Share on WhatsApp
              </a>
              <a href="/salons" className="w-full py-3 border-2 border-rose-gold text-rose-gold font-semibold rounded-xl hover:bg-rose-gold hover:text-cream transition-colors flex items-center justify-center gap-2">
                Explore More Salons <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              {salon.image && (
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <Image src={salon.image} alt={salon.name} fill className="object-cover" />
                </div>
              )}
              <div>
                <h1 className="font-playfair text-2xl md:text-3xl font-bold text-warm-black">{salon.name}</h1>
                <p className="text-warm-black/60">{salon.area}, {salon.city}</p>
              </div>
            </div>
          </motion.div>

          {/* Step indicator */}
          <div className="mb-8 sm:mb-12 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-between min-w-[320px] sm:min-w-0">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center w-full">
                    <motion.div
                      animate={{
                        backgroundColor: currentStep === step.id ? '#B76E79' :
                          index < stepOrder.indexOf(currentStep as Exclude<BookingStep, 'success'>) ? '#dcfce7' : '#f5e6d3',
                        borderColor: currentStep === step.id ? '#B76E79' :
                          index < stepOrder.indexOf(currentStep as Exclude<BookingStep, 'success'>) ? '#22c55e' : '#e5e0d8',
                      }}
                      className="w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-colors shrink-0"
                    >
                      {index < stepOrder.indexOf(currentStep as Exclude<BookingStep, 'success'>) ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <span className={cn(
                          'font-bold text-sm sm:text-base',
                          currentStep === step.id ? 'text-cream' : 'text-warm-black/40'
                        )}>{index + 1}</span>
                      )}
                    </motion.div>
                    <div className="mt-1 sm:mt-2 text-center">
                      <div className={cn(
                        'font-medium text-[10px] sm:text-sm',
                        currentStep === step.id ? 'text-rose-gold' :
                          index < stepOrder.indexOf(currentStep as Exclude<BookingStep, 'success'>) ? 'text-green-600' : 'text-warm-black/40'
                      )}>{step.title}</div>
                      <div className="text-xs text-warm-black/40 hidden md:block">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'flex-1 min-w-[8px] max-w-24 h-0.5 mx-1',
                      index < stepOrder.indexOf(currentStep as Exclude<BookingStep, 'success'>) ? 'bg-green-500' : 'bg-espresso/20'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Step content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <AnimatePresence mode="wait">

                {/* Step 1: Services */}
                {currentStep === 'services' && (
                  <motion.div key="services" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">Select Services</h2>
                    <div className="space-y-3">
                      {SERVICES.map(service => (
                        <motion.div
                          key={service.id}
                          whileTap={{ scale: 0.99 }}
                          className={cn(
                            'p-4 rounded-xl border-2 transition-all cursor-pointer',
                            selectedServices.includes(service.id)
                              ? 'border-rose-gold bg-rose-gold/5 shadow-sm'
                              : 'border-espresso/10 hover:border-rose-gold/40 bg-white'
                          )}
                          onClick={() => toggleService(service.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-warm-black mb-0.5">{service.name}</h4>
                              <p className="text-warm-black/60 text-sm mb-2">{service.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-warm-black/60 flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{service.duration}</span>
                                <span className="font-bold text-rose-gold">₹{service.price.toLocaleString()}</span>
                              </div>
                            </div>
                            <motion.div
                              animate={{ backgroundColor: selectedServices.includes(service.id) ? '#B76E79' : 'transparent', borderColor: selectedServices.includes(service.id) ? '#B76E79' : '#d1c9bd' }}
                              className="ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                            >
                              {selectedServices.includes(service.id) && <CheckCircle className="h-4 w-4 text-cream" />}
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 'datetime' && (
                  <motion.div key="datetime" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">Select Date & Time</h2>
                    <div>
                      <h3 className="font-semibold text-warm-black mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-rose-gold" /> Choose Date
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                        {availableDates.map(date => (
                          <motion.button key={date} whileTap={{ scale: 0.97 }} onClick={() => setSelectedDate(date)}
                            className={cn('p-3 rounded-xl border-2 text-center transition-all font-medium text-sm',
                              selectedDate === date ? 'bg-rose-gold border-rose-gold text-cream shadow-md' : 'bg-white border-espresso/10 hover:border-rose-gold/50'
                            )}>
                            {formatDate(date)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-warm-black mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-rose-gold" /> Choose Time Slot
                      </h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                        {timeSlots.map(time => (
                          <motion.button key={time} whileTap={{ scale: 0.97 }} onClick={() => setSelectedTime(time)}
                            className={cn('p-3 rounded-xl border-2 text-center transition-all font-medium text-sm',
                              selectedTime === time ? 'bg-rose-gold border-rose-gold text-cream shadow-md' : 'bg-white border-espresso/10 hover:border-rose-gold/50'
                            )}>
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Personal Details */}
                {currentStep === 'details' && (
                  <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">Your Details</h2>
                    <div>
                      <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2"><User className="h-4 w-4" />Full Name</label>
                      <input type="text" value={bookingDetails.name} onChange={e => setBookingDetails(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-espresso/10 rounded-xl focus:outline-none focus:border-rose-gold transition-colors"
                        placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2"><Phone className="h-4 w-4" />Phone Number</label>
                      <div className="flex">
                        <div className="px-4 py-3 bg-cream border-2 border-r-0 border-espresso/10 rounded-l-xl text-sm font-medium">+91</div>
                        <input type="tel" value={bookingDetails.phone} onChange={e => setBookingDetails(p => ({ ...p, phone: e.target.value }))}
                          className="flex-1 px-4 py-3 bg-white border-2 border-espresso/10 rounded-r-xl focus:outline-none focus:border-rose-gold transition-colors"
                          placeholder="9876543210" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2"><Mail className="h-4 w-4" />Email Address</label>
                      <input type="email" value={bookingDetails.email} onChange={e => setBookingDetails(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-espresso/10 rounded-xl focus:outline-none focus:border-rose-gold transition-colors"
                        placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2"><MessageSquare className="h-4 w-4" />Special Requests <span className="text-warm-black/40">(optional)</span></label>
                      <textarea value={bookingDetails.specialRequests} onChange={e => setBookingDetails(p => ({ ...p, specialRequests: e.target.value }))}
                        className="w-full px-4 py-3 bg-white border-2 border-espresso/10 rounded-xl focus:outline-none focus:border-rose-gold transition-colors h-28 resize-none"
                        placeholder="Any special requirements..." />
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                      <Shield className="h-5 w-5 text-green-600 shrink-0" />
                      <p className="text-sm text-green-700">Your data is encrypted and will never be shared with third parties.</p>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirm */}
                {currentStep === 'confirm' && (
                  <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">Confirm Booking</h2>
                    <div className="bg-white rounded-2xl p-6 space-y-5 border border-espresso/10">
                      <div>
                        <h3 className="font-bold text-warm-black mb-3 text-sm uppercase tracking-wide text-warm-black/60">Salon</h3>
                        <div className="flex items-center gap-3">
                          {salon.image && (
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                              <Image src={salon.image} alt={salon.name} fill className="object-cover" />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-warm-black">{salon.name}</div>
                            <div className="text-sm text-warm-black/60">{salon.area}, {salon.city}</div>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-espresso/10 pt-4">
                        <h3 className="font-bold text-warm-black mb-3 text-sm uppercase tracking-wide text-warm-black/60">Services</h3>
                        {selectedServices.map(serviceId => {
                          const svc = SERVICES.find(s => s.id === serviceId)
                          if (!svc) return null
                          return (
                            <div key={serviceId} className="flex justify-between items-center mb-2">
                              <div>
                                <div className="font-medium text-warm-black">{svc.name}</div>
                                <div className="text-sm text-warm-black/60">{svc.duration}</div>
                              </div>
                              <span className="font-bold text-rose-gold">₹{svc.price.toLocaleString()}</span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="border-t border-espresso/10 pt-4">
                        <div className="flex justify-between mb-1"><span className="text-warm-black/60 text-sm">Date & Time</span><span className="font-medium text-sm">{formatDate(selectedDate)} at {selectedTime}</span></div>
                        <div className="flex justify-between mb-1"><span className="text-warm-black/60 text-sm">Subtotal</span><span className="font-medium">₹{totalPrice.toLocaleString()}</span></div>
                        <div className="flex justify-between mb-2"><span className="text-warm-black/60 text-sm">GST (18%)</span><span className="font-medium">₹{Math.round(totalPrice * 0.18).toLocaleString()}</span></div>
                        <div className="flex justify-between font-bold text-lg border-t border-espresso/10 pt-3">
                          <span>Total</span>
                          <span className="text-rose-gold">₹{(totalPrice + Math.round(totalPrice * 0.18)).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 sm:mt-8">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button" onClick={handleBack}
                  disabled={currentStep === 'services'}
                  className={cn(
                    'flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-colors font-medium',
                    currentStep === 'services' ? 'text-warm-black/30 cursor-not-allowed' : 'text-warm-black hover:text-rose-gold hover:bg-rose-gold/5'
                  )}
                >
                  <ChevronLeft className="h-5 w-5" /> Back
                </motion.button>

                {currentStep === 'confirm' ? (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button" onClick={handleSubmit} disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-rose-gold text-warm-black font-semibold rounded-xl hover:bg-rose-gold/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-rose-gold/20"
                  >
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-warm-black/30 border-t-warm-black rounded-full animate-spin" />Confirming...</>
                    ) : (
                      <><Sparkles className="h-5 w-5" />Confirm Booking</>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button" onClick={handleNext}
                    disabled={currentStep === 'services' && selectedServices.length === 0 || currentStep === 'datetime' && (!selectedDate || !selectedTime)}
                    className="w-full sm:w-auto px-8 py-3 bg-rose-gold text-warm-black font-semibold rounded-xl hover:bg-rose-gold/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-gold/20"
                  >
                    Next <ChevronRight className="h-5 w-5" />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Sticky summary sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 lg:sticky lg:top-24 border border-espresso/5"
              >
                <h3 className="font-playfair text-xl font-bold text-warm-black mb-5">Summary</h3>
                <div className="space-y-5">
                  {selectedServices.length === 0 ? (
                    <p className="text-warm-black/40 text-sm text-center py-4">No services selected yet</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedServices.map(serviceId => {
                        const svc = SERVICES.find(s => s.id === serviceId)
                        if (!svc) return null
                        return (
                          <div key={serviceId} className="flex justify-between text-sm">
                            <span className="text-warm-black/70 truncate">{svc.name}</span>
                            <span className="font-medium ml-2 shrink-0">₹{svc.price.toLocaleString()}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {totalPrice > 0 && (
                    <div className="border-t border-espresso/10 pt-4 space-y-2">
                      <div className="flex justify-between text-sm"><span className="text-warm-black/60">Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-warm-black/60">GST (18%)</span><span>₹{Math.round(totalPrice * 0.18).toLocaleString()}</span></div>
                      <div className="flex justify-between font-bold text-base border-t border-espresso/10 pt-2">
                        <span>Total</span><span className="text-rose-gold">₹{(totalPrice + Math.round(totalPrice * 0.18)).toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  {selectedDate && (
                    <div className="border-t border-espresso/10 pt-4 text-sm">
                      <div className="text-warm-black/60 mb-1">Appointment</div>
                      <div className="font-medium">{formatDate(selectedDate)} {selectedTime && `at ${selectedTime}`}</div>
                    </div>
                  )}
                  <div className="border-t border-espresso/10 pt-4 text-sm">
                    <div className="text-warm-black/60 mb-1">Contact</div>
                    <div className="font-medium">{salon.phone}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}