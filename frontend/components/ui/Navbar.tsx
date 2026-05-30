'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Building, User, Mail, Phone, Lock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  
  useEffect(() => {
    const storedUser = localStorage.getItem('glowcity_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {}
    }
  }, [])
  
  // Modal states
  const [modalType, setModalType] = useState<'signin' | 'signup' | 'list_salon' | null>(null)
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', salonName: '', ownerName: '', phone: '', address: '', area: 'Bandra'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onHero = isHome && !isScrolled

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen || modalType ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen, modalType])

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#list-salon') {
        window.history.replaceState(null, '', window.location.pathname)
        handleOpenModal('list_salon')
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [user]) // Re-run when user state changes so the handler has the latest user

  const navLinks = [
    { label: 'Salons', href: '/salons' },
    { label: 'Services', href: '/#categories' },
    { label: 'Areas', href: '/salons' },
    { label: 'About', href: '/about' },
  ]

  const handleOpenModal = (type: 'signin' | 'signup' | 'list_salon') => {
    if (type === 'list_salon' && !user) {
      alert('Please sign in first to list your salon.')
      setModalType('signin')
      setIsMobileMenuOpen(false)
      setIsSubmitted(false)
      return
    }
    setModalType(type)
    setIsMobileMenuOpen(false)
    setIsSubmitted(false)
    setFormData({ name: '', email: '', password: '', salonName: '', ownerName: '', phone: '', address: '', area: 'Bandra' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://salon-finding-project.onrender.com').replace(/\/+$/, '')
      let endpoint = ''
      let body = {}
      
      if (modalType === 'signin') {
        endpoint = `${API_URL}/api/auth/signin`
        body = { email: formData.email, password: formData.password }
      } else if (modalType === 'signup') {
        endpoint = `${API_URL}/api/auth/signup`
        body = { name: formData.name, email: formData.email, password: formData.password }
      } else if (modalType === 'list_salon') {
        endpoint = `${API_URL}/api/registrations`
        body = { ...formData }
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const errData = await res.json()
        alert(errData.error || 'Something went wrong')
        return
      }
      
      const data = await res.json()
      setIsSubmitted(true)
      
      if (modalType === 'signin' || modalType === 'signup') {
        setUser(data.user)
        localStorage.setItem('glowcity_user', JSON.stringify(data.user))
      }

      setTimeout(() => {
        setModalType(null)
        setIsSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit. Please try again.')
    }
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          onHero ? 'bg-transparent py-5' : 'bg-cream/95 backdrop-blur-md shadow-lg py-3'
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-rose-gold" />
              <span className="font-playfair text-2xl font-bold text-rose-gold">GlowCity</span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'font-medium transition-colors hover:text-rose-gold',
                    onHero ? 'text-cream' : 'text-warm-black'
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                type="button"
                onClick={() => handleOpenModal('list_salon')}
                className={cn(
                  'px-4 py-2 border rounded-lg font-medium transition-colors',
                  onHero
                    ? 'border-cream text-cream hover:bg-cream hover:text-warm-black'
                    : 'border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream'
                )}
              >
                List Your Salon
              </button>
              {user ? (
                <div className="relative group">
                  <button className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors', onHero ? 'border-cream/30 text-cream bg-cream/10' : 'border-rose-gold/30 text-warm-black bg-rose-gold/10')}>
                    <div className="w-7 h-7 rounded-full bg-rose-gold text-cream flex items-center justify-center text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-sm">{user.name.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-4 py-2 border-b border-espresso/10">
                      <p className="text-sm font-medium text-warm-black">{user.name}</p>
                      <p className="text-xs text-warm-black/60 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { setUser(null); localStorage.removeItem('glowcity_user') }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenModal('signin')}
                  className={cn(
                    'px-4 py-2 font-medium transition-colors',
                    onHero ? 'text-cream hover:text-rose-gold' : 'text-warm-black hover:text-rose-gold'
                  )}
                >
                  Sign In
                </button>
              )}
            </div>

            <button
              type="button"
              className={cn('md:hidden p-2', onHero ? 'text-cream' : 'text-warm-black')}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-cream shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-playfair text-xl font-bold text-rose-gold">GlowCity</span>
                  <button type="button" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                    <X className="h-6 w-6 text-warm-black" />
                  </button>
                </div>
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-lg font-medium text-warm-black hover:text-rose-gold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="mt-8 space-y-3">
                  <button
                    type="button"
                    onClick={() => handleOpenModal('list_salon')}
                    className="w-full px-4 py-3 border border-rose-gold text-rose-gold rounded-lg font-medium"
                  >
                    List Your Salon
                  </button>
                  {user ? (
                    <div className="p-4 bg-rose-gold/10 rounded-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-rose-gold text-cream flex items-center justify-center font-bold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-warm-black">{user.name}</p>
                          <p className="text-xs text-warm-black/60 truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { setUser(null); localStorage.removeItem('glowcity_user'); setIsMobileMenuOpen(false) }}
                        className="w-full px-4 py-2 text-red-500 bg-red-50 rounded-lg text-sm font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenModal('signin')}
                      className="w-full px-4 py-3 text-warm-black font-medium"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sign In & List Salon Modals */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalType(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-espresso/5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-espresso/10 p-6 flex justify-between items-center">
                <h2 className="font-playfair text-2xl font-bold text-warm-black flex items-center gap-2">
                  {modalType === 'signin' ? (
                    <><User className="h-6 w-6 text-rose-gold" /> Welcome Back</>
                  ) : modalType === 'signup' ? (
                    <><User className="h-6 w-6 text-rose-gold" /> Create Account</>
                  ) : (
                    <><Building className="h-6 w-6 text-rose-gold" /> Partner with GlowCity</>
                  )}
                </h2>
                <button
                  onClick={() => setModalType(null)}
                  className="p-2 hover:bg-cream rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-warm-black mb-2">
                      {modalType === 'signin' ? 'Sign In Successful!' : modalType === 'signup' ? 'Account Created!' : 'Application Submitted!'}
                    </h3>
                    <p className="text-warm-black/60">
                      {modalType === 'signin' 
                        ? 'Logging you in safely...' 
                        : modalType === 'signup'
                        ? 'Welcome to GlowCity!'
                        : 'Our executive will contact you in 24 hours.'}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {modalType === 'signin' || modalType === 'signup' ? (
                      <>
                        {modalType === 'signup' && (
                          <div>
                            <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                              <User className="h-4 w-4 text-warm-black/60" /> Full Name
                            </label>
                            <input
                              type="text" required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                              placeholder="Your full name"
                            />
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-warm-black/60" /> Email Address
                          </label>
                          <input
                            type="email" required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                            <Lock className="h-4 w-4 text-warm-black/60" /> Password
                          </label>
                          <input
                            type="password" required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                            placeholder="Enter password"
                          />
                        </div>
                        {modalType === 'signin' ? (
                          <div className="flex justify-between items-center mt-2">
                            <button type="button" onClick={() => setModalType('signup')} className="text-xs text-rose-gold hover:underline font-medium">Create an account</button>
                            <a href="#" className="text-xs text-rose-gold hover:underline font-medium">Forgot Password?</a>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center mt-2">
                            <button type="button" onClick={() => setModalType('signin')} className="text-xs text-rose-gold hover:underline font-medium">Already have an account? Sign In</button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                            <Building className="h-4 w-4 text-warm-black/60" /> Salon Name
                          </label>
                          <input
                            type="text" required
                            value={formData.salonName}
                            onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                            className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                            placeholder="e.g. Royal Beauty Salon"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                            <User className="h-4 w-4 text-warm-black/60" /> Owner Name
                          </label>
                          <input
                            type="text" required
                            value={formData.ownerName}
                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                            className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                              <Phone className="h-4 w-4 text-warm-black/60" /> Phone Number
                            </label>
                            <input
                              type="tel" required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                              placeholder="9876543210"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                              <Mail className="h-4 w-4 text-warm-black/60" /> Email Address
                            </label>
                            <input
                              type="email" required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                              placeholder="contact@salon.com"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-black mb-1.5">Area / Location</label>
                          <select
                            value={formData.area}
                            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold"
                          >
                            {['Bandra', 'Juhu', 'Andheri', 'Colaba', 'Worli', 'Powai'].map(area => (
                              <option key={area} value={area}>{area}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-black mb-1.5 flex items-center gap-2">
                            Full Address
                          </label>
                          <textarea
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-3 bg-cream border border-espresso/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-gold h-20 resize-none"
                            placeholder="Complete street address"
                          />
                        </div>
                      </>
                    )}

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-rose-gold text-warm-black font-semibold rounded-xl hover:bg-rose-gold/90 transition-all shadow-lg shadow-rose-gold/20 text-center block mt-6"
                    >
                      {modalType === 'signin' ? 'Sign In' : modalType === 'signup' ? 'Create Account' : 'Register Salon Partner'}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
