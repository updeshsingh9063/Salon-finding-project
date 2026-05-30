import { Heart } from 'lucide-react'
import { InstagramIcon, FacebookIcon, TwitterIcon } from '@/components/ui/SocialIcons'

const Footer = () => {
  const footerLinks = {
    brand: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Blog', href: '/blog' },
    ],
    explore: [
      { label: 'Salons', href: '/salons' },
      { label: 'Services', href: '/salons?service=all' },
      { label: 'Areas', href: '/salons?area=all' },
      { label: 'Top Rated', href: '/salons?sort=rating' },
    ],
    forSalons: [
      { label: 'List Your Salon', href: '/#list-salon' },
      { label: 'Business Solutions', href: '/business' },
      { label: 'Partner Portal', href: '/partner' },
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

  return (
    <footer className="bg-espresso text-cream">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-playfair text-2xl font-bold text-rose-gold">
                GlowCity
              </span>
            </div>
            <p className="text-cream/80 mb-4">
              Mumbai&apos;s most loved beauty experience. Discover premium salons and book appointments seamlessly.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-cream/80 hover:text-rose-gold transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/80 hover:text-rose-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">For Salons</h3>
            <ul className="space-y-2">
              {footerLinks.forSalons.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/80 hover:text-rose-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/80 hover:text-rose-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-4 w-4 text-rose-gold" />
              <span className="text-cream/80">
                Made with ❤️ in Mumbai
              </span>
            </div>
            <div className="text-cream/60 text-sm">
              © {new Date().getFullYear()} GlowCity. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer