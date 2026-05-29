'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  salonName: string
}

const BookingModal = ({ isOpen, onClose, salonName }: BookingModalProps) => {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
  })

  const services = [
    { id: '1', name: 'Haircut & Styling', duration: '1 hour', price: 1200 },
    { id: '2', name: 'Bridal Makeup', duration: '3 hours', price: 15000 },
    { id: '3', name: 'Manicure & Nail Art', duration: '45 mins', price: 800 },
    { id: '4', name: 'Gold Facial', duration: '1.5 hours', price: 2500 },
  ]

  const dates = [
    '2024-05-15', '2024-05-16', '2024-05-17', '2024-05-18',
    '2024-05-19', '2024-05-20', '2024-05-21', '2024-05-22',
  ]

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ]

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

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      onClose()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-espresso/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-playfair text-2xl font-bold text-warm-black">
                  Book Appointment
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-cream rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      step === stepNum
                        ? 'bg-rose-gold text-cream'
                        : step > stepNum
                        ? 'bg-green-100 text-green-600'
                        : 'bg-cream text-warm-black/40'
                    )}>
                      {step > stepNum ? '✓' : stepNum}
                    </div>
                    {stepNum < 4 && (
                      <div className={cn(
                        'w-8 h-0.5',
                        step > stepNum ? 'bg-green-500' : 'bg-espresso/20'
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="font-semibold text-warm-black mb-2">
                    Select Services
                  </h3>
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={cn(
                        'p-4 rounded-xl border cursor-pointer transition-all',
                        selectedServices.includes(service.id)
                          ? 'border-rose-gold bg-rose-gold/5'
                          : 'border-espresso/10 hover:border-rose-gold/50'
                      )}
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-warm-black/60">
                            {service.duration} • ₹{service.price}
                          </div>
                        </div>
                        <div className={cn(
                          'w-5 h-5 rounded-full border',
                          selectedServices.includes(service.id)
                            ? 'bg-rose-gold border-rose-gold'
                            : 'border-espresso/30'
                        )} />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-semibold text-warm-black mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Choose Date
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {dates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={cn(
                            'p-3 rounded-lg border text-center',
                            selectedDate === date
                              ? 'bg-rose-gold border-rose-gold text-cream'
                              : 'bg-cream border-espresso/10 hover:border-rose-gold'
                          )}
                        >
                          <div className="text-sm font-medium">
                            {formatDate(date)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-warm-black mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Choose Time
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            'p-3 rounded-lg border text-center',
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

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="font-semibold text-warm-black mb-2">
                    Your Details
                  </h3>
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
                      <input
                        type="tel"
                        value={bookingDetails.phone}
                        onChange={(e) => setBookingDetails(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))}
                        className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold"
                        placeholder="9876543210"
                      />
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
                        placeholder="Any special requirements or notes..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl">✓</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-warm-black mb-2">
                      Booking Confirmed!
                    </h3>
                    <p className="text-warm-black/60">
                      Your appointment at {salonName} has been confirmed.
                    </p>
                  </div>

                  <div className="bg-cream rounded-xl p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-warm-black/60">Date & Time</span>
                        <span className="font-medium">
                          {selectedDate && formatDate(selectedDate)} at {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-warm-black/60">Services</span>
                        <span className="font-medium">
                          {selectedServices.length} selected
                        </span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-rose-gold">₹{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-espresso/10 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className={cn(
                    'px-4 py-2 rounded-lg transition-colors',
                    step === 1
                      ? 'text-warm-black/40 cursor-not-allowed'
                      : 'text-warm-black hover:text-rose-gold'
                  )}
                  disabled={step === 1}
                >
                  Back
                </button>

                <div className="text-sm text-warm-black/60">
                  Step {step} of 4
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors"
                >
                  {step === 4 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BookingModal