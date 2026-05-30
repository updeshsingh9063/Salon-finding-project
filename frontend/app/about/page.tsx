'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Users, Target, Award } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize your beauty experience above all else',
    },
    {
      icon: Sparkles,
      title: 'Quality Assurance',
      description: 'Every salon is vetted for hygiene and service standards',
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Supporting Mumbai\'s local beauty entrepreneurs',
    },
    {
      icon: Target,
      title: 'Innovation Driven',
      description: 'Leveraging technology for seamless beauty experiences',
    },
  ]

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-gold/10 text-rose-gold rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">About GlowCity</span>
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-warm-black mb-6">
              Mumbai&apos;s Most Loved Beauty Experience
            </h1>
            <p className="text-warm-black/60 text-lg max-w-3xl mx-auto">
              We&apos;re on a mission to transform how Mumbai discovers and books beauty services. 
              By connecting premium salons with discerning clients, we create memorable beauty experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="font-playfair text-3xl font-bold text-warm-black mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-warm-black/70">
                <p>
                  Founded in 2026, GlowCity was born from a simple observation: 
                  finding the perfect beauty salon in Mumbai was more challenging than it should be.
                </p>
                <p>
                  We saw talented stylists struggling to reach their ideal clients, 
                  while beauty enthusiasts spent hours searching for reliable services.
                </p>
                <p>
                  Today, we bridge this gap by curating Mumbai&apos;s finest beauty salons 
                  and making premium services accessible through our seamless platform.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-rose-gold/5 to-blush/5 rounded-2xl p-8"
            >
              <h3 className="font-playfair text-2xl font-bold text-warm-black mb-6">
                Our Mission
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="h-6 w-6 text-rose-gold mt-1" />
                  <div>
                    <h4 className="font-semibold text-warm-black mb-1">
                      Elevate Beauty Standards
                    </h4>
                    <p className="text-warm-black/60">
                      Set new benchmarks for quality and service in Mumbai&apos;s beauty industry
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-6 w-6 text-rose-gold mt-1" />
                  <div>
                    <h4 className="font-semibold text-warm-black mb-1">
                      Empower Beauty Professionals
                    </h4>
                    <p className="text-warm-black/60">
                      Provide tools and visibility for talented stylists to grow their businesses
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-playfair text-3xl font-bold text-warm-black mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-rose-gold/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-rose-gold" />
                  </div>
                  <h3 className="font-bold text-warm-black mb-2">
                    {value.title}
                  </h3>
                  <p className="text-warm-black/60 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="bg-gradient-to-r from-rose-gold to-blush rounded-2xl p-8 text-center"
          >
            <h2 className="font-playfair text-3xl font-bold text-cream mb-4">
              Join Our Beauty Revolution
            </h2>
            <p className="text-cream/90 mb-6 max-w-2xl mx-auto">
              Whether you&apos;re looking for your next favorite salon or want to showcase 
              your beauty services to Mumbai&apos;s most discerning clients, GlowCity is here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/salons"
                className="px-6 py-3 bg-cream text-warm-black font-semibold rounded-lg hover:bg-cream/90 transition-colors"
              >
                Explore Salons
              </a>
              <a
                href="/#list-salon"
                className="px-6 py-3 border-2 border-cream text-cream font-semibold rounded-lg hover:bg-cream hover:text-warm-black transition-colors"
              >
                List Your Salon
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}