'use client'

import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Building } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const CTABanner = () => {
  const handleListSalon = () => {
    window.location.hash = '#list-salon'
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Rich multi-layer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold via-blush to-espresso/90" />

      {/* Animated mesh overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 500, x: '-10%', y: '-20%', delay: 0 },
          { size: 400, x: '70%', y: '40%', delay: 2 },
          { size: 300, x: '30%', y: '60%', delay: 1 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-3xl"
            style={{ width: orb.size, height: orb.size, left: orb.x, top: orb.y }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Floating sparkle particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 bg-cream/40 rounded-full"
            style={{
              left: `${(i * 11 + 5) % 100}%`,
              top: `${(i * 13 + 7) % 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration: 2.5 + (i % 3) * 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...fadeUp}
            className="flex flex-col items-center"
          >
            {/* Icon with glow */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-cream/20 rounded-full blur-xl scale-150" />
              <div className="relative w-16 h-16 bg-cream/15 backdrop-blur-sm border border-cream/30 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-cream" />
              </div>
            </motion.div>

            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-5 leading-tight">
              Ready to{' '}
              <span className="relative inline-block">
                Glow?
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-cream/40 rounded-full origin-left"
                />
              </span>
            </h2>

            <p className="text-cream/85 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
              Book your first appointment today and experience Mumbai&apos;s most loved beauty services.
              Over <strong className="text-cream">50,000+ clients</strong> already glowing.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/salons"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-cream text-warm-black font-bold rounded-xl hover:bg-cream/95 transition-all shadow-xl shadow-espresso/20 group"
              >
                <Sparkles className="h-5 w-5 text-rose-gold" />
                Explore Salons
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.button
                onClick={handleListSalon}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-cream/10 backdrop-blur-sm text-cream font-bold rounded-xl border-2 border-cream/40 hover:bg-cream/20 hover:border-cream/60 transition-all group"
              >
                <Building className="h-5 w-5" />
                List Your Salon
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTABanner
