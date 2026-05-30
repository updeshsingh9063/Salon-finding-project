'use client'

import { motion } from 'framer-motion'
import { Heart, Sparkles, Mail, ArrowRight, MapPin, Phone } from 'lucide-react'
import { InstagramIcon, FacebookIcon, TwitterIcon } from '@/components/ui/SocialIcons'
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setMessage('')

    try {
      const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com').replace(/\/+$/, '')
      const res = await fetch(`${API_URL}/api/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        setStatus('error')
        // If it's a 404, it means Render is still deploying
        if (res.status === 404) {
          setMessage('API is still deploying. Please wait a minute and try again.')
        } else {
          setMessage(err.error || 'Failed to subscribe')
        }
        setTimeout(() => setStatus('idle'), 5000)
        return
      }

      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('Subscription error:', err)
      setStatus('error')
      setMessage('Network error. Please try again later.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const footerLinks = {
    explore: [
      { label: 'All Salons', href: '/salons' },
      { label: 'Services', href: '/salons?service=all' },
      { label: 'Top Rated', href: '/salons?sort=rating' },
      { label: 'Areas', href: '/salons?area=all' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
    forSalons: [
      { label: 'List Your Salon', href: '/#list-salon' },
      { label: 'Partner Portal', href: '/partner' },
      { label: 'Business Solutions', href: '/business' },
      { label: 'Resources', href: '/resources' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: InstagramIcon, href: 'https://instagram.com/glowcity', label: 'Instagram' },
    { icon: FacebookIcon, href: 'https://facebook.com/glowcity', label: 'Facebook' },
    { icon: TwitterIcon, href: 'https://twitter.com/glowcity', label: 'Twitter' },
  ]

  const columnTitles = ['Explore', 'Company', 'For Salons', 'Support']
  const columns = [footerLinks.explore, footerLinks.company, footerLinks.forSalons, footerLinks.support]

  return (
    <footer className="bg-espresso text-cream relative overflow-hidden">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />

      {/* Subtle background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-gold/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blush/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Newsletter strip */}
        <div className="py-10 border-b border-cream/8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-10 h-10 bg-rose-gold/20 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-rose-gold" />
              </div>
              <div>
                <p className="font-semibold text-cream">Get beauty tips &amp; exclusive deals</p>
                <p className="text-cream/50 text-sm">Join 10,000+ subscribers. No spam, ever.</p>
              </div>
            </div>
            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 text-green-400 font-medium text-sm"
              >
                <Heart className="h-4 w-4 fill-green-400" />
                You&apos;re subscribed! Welcome ✨
              </motion.div>
            ) : (
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={status === 'loading'}
                    className="flex-1 md:w-56 bg-cream border border-cream/20 rounded-xl px-4 py-2.5 text-warm-black placeholder-warm-black/40 text-sm focus:outline-none focus:ring-2 focus:ring-rose-gold/80 transition-all disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.04 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
                    className="px-4 py-2.5 bg-rose-gold text-warm-black font-semibold rounded-xl text-sm flex items-center gap-1.5 hover:bg-rose-gold/90 transition-colors disabled:opacity-70"
                  >
                    {status === 'loading' ? 'Sending...' : 'Subscribe'}
                    {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
                  </motion.button>
                </form>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs font-medium pl-1"
                  >
                    {message}
                  </motion.p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main links grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-rose-gold" />
              <span className="font-playfair text-2xl font-bold text-rose-gold">GlowCity</span>
            </a>
            <p className="text-cream/55 text-sm leading-relaxed mb-5">
              Mumbai&apos;s most loved beauty marketplace. Premium salons, seamless bookings.
            </p>
            <div className="space-y-2 text-cream/50 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-rose-gold/70 shrink-0" />
                <span>Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-rose-gold/70 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((links, colIdx) => (
            <div key={columnTitles[colIdx]}>
              <h3 className="font-semibold text-cream mb-4 text-sm tracking-wider uppercase">
                {columnTitles[colIdx]}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="text-cream/55 hover:text-rose-gold text-sm transition-colors flex items-center gap-1 group"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-rose-gold text-xs">›</span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-cream/45 text-sm">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-rose-gold fill-rose-gold" />
              <span>in Mumbai · © {new Date().getFullYear()} GlowCity. All rights reserved.</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 bg-cream/8 hover:bg-rose-gold/20 border border-cream/10 hover:border-rose-gold/40 rounded-xl flex items-center justify-center text-cream/60 hover:text-rose-gold transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer