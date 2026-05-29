'use client'

import { ChevronDown, Search } from 'lucide-react'

const Hero = () => {
  const locations = ['Bandra', 'Juhu', 'Andheri', 'Colaba', 'Worli', 'Powai']
  const services = ['Hair', 'Makeup', 'Nails', 'Facial', 'Bridal']

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/salon-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/30 to-espresso/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 w-full pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-2 md:mb-4 animate-fade-up">
            Mumbai&apos;s Most Loved
          </h1>

          <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-rose-gold mb-4 md:mb-6 animate-fade-up [animation-delay:150ms]">
            Beauty Experience
          </h2>

          <p className="text-lg md:text-2xl text-cream/90 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:300ms]">
            Discover 200+ premium salons, book appointments instantly, and experience luxury beauty services across Mumbai.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 md:mb-12 animate-fade-up [animation-delay:500ms]">
            <a
              href="/salons"
              className="px-8 py-4 bg-rose-gold text-warm-black font-semibold rounded-lg hover:bg-rose-gold/90 transition-colors shadow-lg"
            >
              Explore Salons
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 border-2 border-cream text-cream font-semibold rounded-lg hover:bg-cream hover:text-warm-black transition-colors"
            >
              How it works
            </a>
          </div>

          <div className="glass-card rounded-2xl p-4 md:p-6 max-w-3xl mx-auto animate-fade-up [animation-delay:700ms]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold">
                <option value="" className="text-warm-black">Location</option>
                {locations.map((location) => (
                  <option key={location} value={location} className="text-warm-black">
                    {location}
                  </option>
                ))}
              </select>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold">
                <option value="" className="text-warm-black">Service</option>
                {services.map((service) => (
                  <option key={service} value={service} className="text-warm-black">
                    {service}
                  </option>
                ))}
              </select>
              <input
                type="date"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-rose-gold [color-scheme:dark]"
              />
              <a
                href="/salons"
                className="w-full bg-rose-gold text-warm-black font-semibold rounded-lg px-4 py-3 hover:bg-rose-gold/90 transition-colors flex items-center justify-center gap-2 sm:col-span-2 lg:col-span-1"
              >
                <Search className="h-5 w-5" />
                Search
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown className="h-8 w-8 text-cream animate-bounce" />
      </div>
    </section>
  )
}

export default Hero
