export interface Salon {
  id: string
  name: string
  area: string
  city: string
  rating: number
  reviewCount: number
  priceLevel: 1 | 2 | 3 | 4
  services: string[]
  image: string
  badge?: string
  description: string
  highlights: string[]
  hours: {
    open: string
    close: string
  }
  phone: string
  address: string
  lat: number
  lng: number
}

export interface Category {
  id: string
  name: string
  icon: string
  salonCount: number
  color: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  avatarInitials: string
}

export interface Service {
  id: string
  name: string
  category: string
  duration: string
  price: number
  description: string
}

export interface BookingStep {
  id: string
  title: string
  description: string
  number: number
}