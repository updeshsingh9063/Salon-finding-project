import { Router } from 'express'
import { SALONS, SERVICES } from '../data.js'

const router = Router()

type BookingRecord = {
  id: string
  salonId: string
  salonName: string
  serviceIds: string[]
  date: string
  time: string
  customer: { name: string; phone: string; email: string; specialRequests?: string }
  total: number
  createdAt: string
}

const bookings: BookingRecord[] = []

router.post('/', (req, res) => {
  const { salonId, serviceIds, date, time, customer } = req.body

  const salon = SALONS.find((s) => s.id === salonId)
  if (!salon) {
    res.status(404).json({ error: 'Salon not found' })
    return
  }

  const ids: string[] = Array.isArray(serviceIds) ? serviceIds : []
  const total = ids.reduce((sum, id) => {
    const svc = SERVICES.find((s) => s.id === id)
    return sum + (svc?.price ?? 0)
  }, 0)

  const booking: BookingRecord = {
    id: `GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    salonId,
    salonName: salon.name,
    serviceIds: ids,
    date: date ?? '',
    time: time ?? '',
    customer: customer ?? { name: '', phone: '', email: '' },
    total,
    createdAt: new Date().toISOString(),
  }

  bookings.push(booking)
  res.status(201).json(booking)
})

router.get('/:id', (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id)
  if (!booking) {
    res.status(404).json({ error: 'Booking not found' })
    return
  }
  res.json(booking)
})

export default router
