import Hero from '@/components/sections/Hero'
import StatsBar from '@/components/sections/StatsBar'
import Categories from '@/components/sections/Categories'
import FeaturedSalons from '@/components/sections/FeaturedSalons'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import AIConsultant from '@/components/sections/AIConsultant'
import CTABanner from '@/components/sections/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Categories />
      <FeaturedSalons />
      <HowItWorks />
      <Testimonials />
      <AIConsultant />
      <CTABanner />
    </>
  )
}