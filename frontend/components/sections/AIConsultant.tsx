'use client'

import { motion } from 'framer-motion'
import { Sparkles, MessageSquare, ArrowRight, Brain, Zap } from 'lucide-react'
import { fadeUp } from '@/lib/motion'

const chips = [
  { label: 'Bridal makeup in Bandra', emoji: '💍' },
  { label: 'Best nail salon near me', emoji: '💅' },
  { label: 'Hair spa under ₹1000', emoji: '💆' },
  { label: 'Luxury facial in Juhu', emoji: '✨' },
  { label: 'Best value salons', emoji: '💰' },
  { label: 'Top rated in Mumbai', emoji: '⭐' },
]

const features = [
  { icon: Brain, label: 'Powered by Groq AI', sub: 'llama-3.1 model' },
  { icon: Zap, label: 'Instant responses', sub: 'Under 2 seconds' },
  { icon: Sparkles, label: 'Personalized picks', sub: 'Based on your needs' },
]

const AIConsultant = () => {
  const openChat = (message?: string) => {
    if (message) {
      window.dispatchEvent(new CustomEvent('prefill-ai-chat', { detail: message }))
    } else {
      window.dispatchEvent(new CustomEvent('open-ai-chat'))
    }
  }

  return (
    <section className="py-16 md:py-24 bg-espresso relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 13 + 7) % 100}%`,
              top: `${(i * 17 + 11) % 100}%`,
              width: i % 3 === 0 ? '3px' : '2px',
              height: i % 3 === 0 ? '3px' : '2px',
              backgroundColor: i % 4 === 0 ? '#B76E79' : 'rgba(245,230,211,0.4)',
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Soft glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <motion.div {...fadeUp}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-gold/20 text-rose-gold rounded-full text-sm font-semibold mb-6 border border-rose-gold/30"
            >
              <Sparkles className="h-4 w-4" />
              AI Beauty Consultant
            </motion.div>

            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4 leading-tight">
              Meet Your Personal<br />
              <span className="text-rose-gold">AI Beauty Expert</span>
            </h2>

            <p className="text-cream/70 text-lg mb-8 leading-relaxed">
              Tell us your occasion, vibe, and area — our AI instantly recommends the perfect salon and services just for you.
            </p>

            {/* Feature pills */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
              {features.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2.5 bg-cream/5 border border-cream/10 rounded-xl backdrop-blur-sm">
                  <Icon className="h-4 w-4 text-rose-gold shrink-0" />
                  <div>
                    <div className="text-cream text-sm font-medium">{label}</div>
                    <div className="text-cream/50 text-xs">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openChat()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-rose-gold text-warm-black font-semibold rounded-xl hover:bg-rose-gold/90 transition-all shadow-lg shadow-rose-gold/30 group"
            >
              <MessageSquare className="h-5 w-5" />
              Chat with AI Consultant
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Right: Interactive chat preview */}
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="bg-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-cream/10 shadow-2xl"
          >
            {/* Mock chat header */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-cream/10">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-gold to-blush rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-cream" />
              </div>
              <div>
                <div className="text-cream font-semibold">GlowCity AI</div>
                <div className="text-cream/50 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                  Online — replies instantly
                </div>
              </div>
            </div>

            {/* Mock messages */}
            <div className="space-y-4 mb-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-gold to-blush rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-cream" />
                </div>
                <div className="bg-cream/10 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                  <p className="text-cream text-sm leading-relaxed">Hi! I&apos;m your GlowCity AI. Tell me what service you need or your area in Mumbai — I&apos;ll find the perfect salon! 💅</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-rose-gold/20 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                  <p className="text-cream text-sm">I need bridal makeup in Bandra</p>
                </div>
                <div className="w-8 h-8 bg-rose-gold rounded-full flex items-center justify-center shrink-0 text-cream text-xs font-bold">U</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-gold to-blush rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 text-cream" />
                </div>
                <div className="bg-gradient-to-r from-rose-gold/20 to-blush/20 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                  <p className="text-cream font-medium text-sm mb-1">👰 Perfect choice!</p>
                  <p className="text-cream/80 text-xs leading-relaxed">Lavelle Beauty Mumbai (4.9★) is our most-booked bridal salon in Bandra. Complete bridal packages from ₹15,000!</p>
                </div>
              </div>
            </div>

            {/* Clickable suggestion chips */}
            <div>
              <p className="text-cream/50 text-xs mb-3 font-medium">💬 Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {chips.map(chip => (
                  <motion.button
                    key={chip.label}
                    type="button"
                    whileHover={{ scale: 1.04, backgroundColor: 'rgba(183,110,121,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openChat(chip.label)}
                    className="px-3 py-2 bg-cream/10 text-cream rounded-lg text-xs font-medium border border-cream/10 hover:border-rose-gold/50 transition-colors flex items-center gap-1.5"
                  >
                    <span>{chip.emoji}</span>
                    {chip.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AIConsultant
