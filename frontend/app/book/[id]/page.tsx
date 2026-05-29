'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Phone, Mail, MessageSquare, Shield, CheckCircle } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/SocialIcons'
import { SALONS, SERVICES } from '@/lib/data'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'

type BookingStep = 'services' | 'datetime' | 'details' | 'confirm'

export default function BookingPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState<BookingStep>('services')
  const [selectedServices, setSelectedServices] = useState<string[]>(['1', '3'])
  const [selectedDate, setSelectedDate] = useState<string>('2024-05-15')
  const [selectedTime, setSelectedTime] = useState<string>('14:00')
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
  })

  const salon = SALONS.find(s => s.id === params.id)

  if (!salon) {
    notFound()
  }

  const steps: { id: BookingStep; title: string; description: string }[] = [
    { id: 'services', title: 'Services', description: 'Choose your services' },
    { id: 'datetime', title: 'Date & Time', description: 'Pick your slot' },
    { id: 'details', title: 'Details', description: 'Your information' },
    { id: 'confirm', title: 'Confirm', description: 'Review & book' },
  ]

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const totalPrice = selectedServices.reduce((total, serviceId) => {
    const service = SERVICES.find(s => s.id === serviceId)
    return total + (service?.price || 0)
  }, 0)

  const availableDates = [
    '2024-05-15', '2024-05-16', '2024-05-17', '2024-05-18',
    '2024-05-19', '2024-05-20', '2024-05-21', '2024-05-22',
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ]

  const handleNext = () => {
    const stepOrder: BookingStep[] = ['services', 'datetime', 'details', 'confirm']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const stepOrder: BookingStep[] = ['services', 'datetime', 'details', 'confirm']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handleSubmit = () => {
    window.location.href = '/confirm'
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <div className="min-h-screen bg-cream pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-warm-black mb-2">
              Book Appointment
            </h1>
            <p className="text-warm-black/60">
              Complete your booking in 4 simple steps
            </p>
          </div>

          <div className="mb-8 sm:mb-12 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center justify-between min-w-[320px] sm:min-w-0">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center w-full">
                    <div className={cn(
                      'w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-colors shrink-0',
                      currentStep === step.id
                        ? 'bg-rose-gold border-rose-gold text-cream'
                        : index < steps.findIndex(s => s.id === currentStep)
                        ? 'bg-green-100 border-green-500 text-green-600'
                        : 'bg-cream border-espresso/20 text-warm-black/40'
                    )}>
                      {index < steps.findIndex(s => s.id === currentStep) ? (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                      ) : (
                        <span className="font-bold text-sm sm:text-base">{index + 1}</span>
                      )}
                    </div>
                    <div className="mt-1 sm:mt-2 text-center w-full px-0.5">
                      <div className={cn(
                        'font-medium text-[10px] sm:text-sm truncate',
                        currentStep === step.id
                          ? 'text-rose-gold'
                          : index < steps.findIndex(s => s.id === currentStep)
                          ? 'text-green-600'
                          : 'text-warm-black/40'
                      )}>
                        {step.title}
                      </div>
                      <div className="text-xs text-warm-black/40 hidden md:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'flex-1 min-w-[8px] max-w-12 sm:max-w-24 h-0.5 mx-0.5 sm:mx-1',
                      index < steps.findIndex(s => s.id === currentStep)
                        ? 'bg-green-500'
                        : 'bg-espresso/20'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <AnimatePresence mode="wait">
                {currentStep === 'services' && (
                  <motion.div
                    key="services"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">
                      Select Services
                    </h2>
                    <div className="space-y-4">
                      {SERVICES.map((service) => (
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
                  </motion.div>
                )}

                {currentStep === 'datetime' && (
                  <motion.div
                    key="datetime"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">
                      Select Date & Time
                    </h2>
                    <div>
                      <h3 className="font-semibold text-warm-black mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Choose Date
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                        {availableDates.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={cn(
                              'p-3 rounded-lg border text-center transition-colors',
                              selectedDate === date
                                ? 'bg-rose-gold border-rose-gold text-cream'
                                : 'bg-cream border-espresso/10 hover:border-rose-gold'
                            )}
                          >
                            <div className="font-bold">{formatDate(date)}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-warm-black mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Choose Time Slot
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              'p-3 rounded-lg border text-center transition-colors',
                              selectedTime === time
                                ? 'bg-rose-gold border-rose-gold text-cream'
                                : 'bg-cream border-espresso/10 hover:border-rose-gold'
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">
                      Your Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={bookingDetails.name}
                          onChange={(e) => setBookingDetails(prev => ({
                            ...prev,
                            name: e.target.value
                          }))}
                          className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </label>
                        <div className="flex">
                          <div className="px-4 py-3 bg-cream border border-espresso/10 border-r-0 rounded-l-lg">
                            +91
                          </div>
                          <input
                            type="tel"
                            value={bookingDetails.phone}
                            onChange={(e) => setBookingDetails(prev => ({
                              ...prev,
                              phone: e.target.value
                            }))}
                            className="flex-1 px-4 py-3 bg-cream border border-espresso/10 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={bookingDetails.email}
                          onChange={(e) => setBookingDetails(prev => ({
                            ...prev,
                            email: e.target.value
                          }))}
                          className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-warm-black mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Special Requests
                        </label>
                        <textarea
                          value={bookingDetails.specialRequests}
                          onChange={(e) => setBookingDetails(prev => ({
                            ...prev,
                            specialRequests: e.target.value
                          }))}
                          className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold h-32"
                          placeholder="Any special requirements or notes for your appointment..."
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div className="text-sm text-green-700">
                        Your information is safe with us. We use encryption to protect your personal data.
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'confirm' && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h2 className="font-playfair text-2xl font-bold text-warm-black">
                      Confirm Booking
                    </h2>
                    <div className="bg-cream rounded-xl p-6 space-y-6">
                      <div>
                        <h3 className="font-bold text-warm-black mb-3">
                          Salon Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-warm-black/60">Salon</span>
                            <span className="font-medium">{salon.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-warm-black/60">Location</span>
                            <span className="font-medium">{salon.area}, {salon.city}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-warm-black mb-3">
                          Selected Services
                        </h3>
                        <div className="space-y-3">
                          {selectedServices.map((serviceId) => {
                            const service = SERVICES.find(s => s.id === serviceId)
                            if (!service) return null
                            return (
                              <div key={serviceId} className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">{service.name}</div>
                                  <div className="text-sm text-warm-black/60">
                                    {service.duration}
                                  </div>
                                </div>
                                <div className="font-bold text-rose-gold">
                                  ₹{service.price}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-warm-black mb-3">
                          Appointment Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-warm-black/60">Date</span>
                            <span className="font-medium">{formatDate(selectedDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-warm-black/60">Time</span>
                            <span className="font-medium">{selectedTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-espresso/10 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-warm-black">Total</span>
                          <span className="text-2xl font-bold text-rose-gold">₹{totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 sm:mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  className={cn(
                    'flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-3 rounded-lg transition-colors',
                    currentStep === 'services'
                      ? 'text-warm-black/40 cursor-not-allowed'
                      : 'text-warm-black hover:text-rose-gold'
                  )}
                  disabled={currentStep === 'services'}
                >
                  <ChevronLeft className="h-5 w-5" />
                  Back
                </button>

                {currentStep === 'confirm' ? (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    <a
                      href={`https://wa.me/919999999999?text=Hi!+I+want+to+book+an+appointment+at+${encodeURIComponent(salon.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-green-600 text-cream font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                    >
                      <WhatsAppIcon className="h-5 w-5 shrink-0" />
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-6 sm:px-8 py-3 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-24">
                <h3 className="font-playfair text-xl font-bold text-warm-black mb-6">
                  Booking Summary
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-warm-black mb-3">
                      Selected Services
                    </h4>
                    <div className="space-y-3">
                      {selectedServices.map((serviceId) => {
                        const service = SERVICES.find(s => s.id === serviceId)
                        if (!service) return null
                        return (
                          <div key={serviceId} className="flex justify-between">
                            <span className="text-sm text-warm-black/70">
                              {service.name}
                            </span>
                            <span className="text-sm font-medium">
                              ₹{service.price}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="border-t border-espresso/10 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-warm-black/60">Subtotal</span>
                      <span className="font-medium">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-warm-black/60">GST (18%)</span>
                      <span className="font-medium">₹{Math.round(totalPrice * 0.18)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-espresso/10">
                      <span>Total</span>
                      <span className="text-rose-gold">
                        ₹{totalPrice + Math.round(totalPrice * 0.18)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-espresso/10">
                    <div className="text-sm text-warm-black/60 mb-2">
                      Appointment Time
                    </div>
                    <div className="font-medium">
                      {formatDate(selectedDate)} at {selectedTime}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-espresso/10">
                    <div className="text-sm text-warm-black/60 mb-2">
                      Salon Contact
                    </div>
                    <div className="font-medium">
                      {salon.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}