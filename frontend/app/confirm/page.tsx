'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Calendar, MapPin, Clock, Share2, Sparkles } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/SocialIcons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ConfirmationPage() {
  const router = useRouter()
  const [bookingId, setBookingId] = useState('')

  useEffect(() => {
    const id = `GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    setBookingId(id)
  }, [])

  const bookingDetails = {
    salon: 'Lavelle Beauty Mumbai',
    location: 'Bandra West, Mumbai',
    date: 'May 15, 2024',
    time: '2:00 PM',
    services: [
      { name: 'Bridal Makeup Package', price: 15000 },
      { name: 'Hair Styling', price: 1200 },
    ],
    total: 16200,
    gst: 2916,
    finalTotal: 19116,
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'GlowCity Booking Confirmation',
        text: `I've booked an appointment at ${bookingDetails.salon} through GlowCity!`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-rose-gold/10 pt-20 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <CheckCircle className="h-24 w-24 text-green-600 mx-auto" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="absolute inset-0 bg-green-600/20 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-warm-black mb-4">
              You&apos;re all set to Glow!
            </h1>
            <p className="text-warm-black/60 text-lg mb-6">
              Your appointment has been confirmed. We&apos;ve sent the details to your email.
            </p>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-gold/10 text-rose-gold rounded-full">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-bold">Booking Reference</span>
                </div>
                <div className="font-mono text-2xl font-bold text-warm-black mt-2">
                  {bookingId}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-cream/50 rounded-xl">
                  <Calendar className="h-5 w-5 text-rose-gold" />
                  <div>
                    <div className="font-medium">{bookingDetails.date}</div>
                    <div className="text-sm text-warm-black/60">{bookingDetails.time}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-cream/50 rounded-xl">
                  <MapPin className="h-5 w-5 text-rose-gold" />
                  <div>
                    <div className="font-medium">{bookingDetails.salon}</div>
                    <div className="text-sm text-warm-black/60">{bookingDetails.location}</div>
                  </div>
                </div>

                <div className="border-t border-espresso/10 pt-4">
                  <h4 className="font-bold text-warm-black mb-3">Services Booked</h4>
                  <div className="space-y-2">
                    {bookingDetails.services.map((service, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-warm-black/70">{service.name}</span>
                        <span className="font-medium">₹{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-espresso/10 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-warm-black/60">Subtotal</span>
                      <span className="font-medium">₹{bookingDetails.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-black/60">GST (18%)</span>
                      <span className="font-medium">₹{bookingDetails.gst}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-espresso/10">
                      <span>Total Amount</span>
                      <span className="text-rose-gold">₹{bookingDetails.finalTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-8">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/salons')}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-rose-gold text-rose-gold font-semibold rounded-lg hover:bg-rose-gold hover:text-cream transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Calendar className="h-5 w-5 shrink-0" />
                Add to Calendar
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-espresso/10 text-warm-black font-semibold rounded-lg hover:bg-espresso hover:text-cream transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Share2 className="h-5 w-5 shrink-0" />
                Share Booking
              </motion.button>

              <motion.a
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/919999999999?text=Hi!+I+have+booked+an+appointment+at+${encodeURIComponent(bookingDetails.salon)}+with+reference+${bookingId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-green-600 text-cream font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                Share on WhatsApp
              </motion.a>
            </div>

            <div className="text-center">
              <p className="text-warm-black/60 mb-4">
                Need to make changes to your booking?
              </p>
              <button
                onClick={() => router.push('/salons')}
                className="text-rose-gold hover:text-rose-gold/80 transition-colors font-medium"
              >
                Explore more salons →
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6"
          >
            <h3 className="font-playfair text-xl font-bold text-warm-black mb-4">
              What to expect next
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-rose-gold/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-rose-gold text-sm font-bold">1</span>
                </div>
                <div>
                  <div className="font-medium">Confirmation email</div>
                  <div className="text-sm text-warm-black/60">
                    You&apos;ll receive a detailed confirmation email within 5 minutes
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-rose-gold/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-rose-gold text-sm font-bold">2</span>
                </div>
                <div>
                  <div className="font-medium">Reminder notification</div>
                  <div className="text-sm text-warm-black/60">
                    We&apos;ll send you a reminder 24 hours before your appointment
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-rose-gold/10 rounded-full flex items-center justify-center mt-1">
                  <span className="text-rose-gold text-sm font-bold">3</span>
                </div>
                <div>
                  <div className="font-medium">Salon preparation</div>
                  <div className="text-sm text-warm-black/60">
                    The salon will prepare for your visit based on your selected services
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}