import { Router } from 'express'
import { Salon } from '../models/Salon.js'
import { Booking } from '../models/Booking.js'
import { SERVICES } from '../data.js'

const router = Router()

// POST /api/bookings — create a new booking
router.post('/', async (req, res) => {
  try {
    const { salonId, serviceIds, date, time, customer } = req.body

    // Validate salon exists
    const salon = await Salon.findById(salonId)
    if (!salon) {
      res.status(404).json({ error: 'Salon not found' })
      return
    }

    // Validate required fields
    if (!customer?.name || !customer?.phone || !customer?.email) {
      res.status(400).json({ error: 'Customer name, phone, and email are required' })
      return
    }

    if (!date || !time) {
      res.status(400).json({ error: 'Date and time are required' })
      return
    }

    // Calculate total price
    const ids: string[] = Array.isArray(serviceIds) ? serviceIds : []
    const total = ids.reduce((sum, id) => {
      const svc = SERVICES.find((s) => s.id === id)
      return sum + (svc?.price ?? 0)
    }, 0)

    // Generate human-readable booking ID
    const bookingId = `GC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    const booking = await Booking.create({
      bookingId,
      salonId,
      salonName: salon.name,
      serviceIds: ids,
      date,
      time,
      customer: {
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        specialRequests: customer.specialRequests ?? '',
      },
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      total,
      status: 'confirmed',
    })

    console.log(`📅 New booking: ${bookingId} at ${salon.name} on ${date} ${time}`)
    res.status(201).json(booking)
  } catch (err) {
    console.error('POST /api/bookings error:', err)
    res.status(500).json({ error: 'Failed to create booking' })
  }
})

// GET /api/bookings/:id — get booking by bookingId
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id })
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' })
      return
    }
    res.json(booking)
  } catch (err) {
    console.error('GET /api/bookings/:id error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
