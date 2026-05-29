import { Router } from 'express'
import { Salon } from '../models/Salon.js'
import { CATEGORIES, TESTIMONIALS, SERVICES, AREAS, SERVICE_TYPES } from '../data.js'

const router = Router()

// GET /api/salons — list with optional filter & sort
router.get('/', async (req, res) => {
  try {
    const { area, service, minRating, priceLevel, sort, limit } = req.query

    // Build MongoDB filter
    const filter: Record<string, unknown> = {}

    if (typeof area === 'string' && area && area !== 'all') {
      const areas = area.split(',').map((a) => a.trim())
      filter.area = { $in: areas.map((a) => new RegExp(a, 'i')) }
    }

    if (typeof service === 'string' && service && service !== 'all') {
      const services = service.split(',').map((s) => s.trim())
      filter.services = { $in: services.map(s => new RegExp(s, 'i')) }
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) }
    }

    if (priceLevel) {
      const levels = String(priceLevel).split(',').map(Number)
      filter.priceLevel = { $in: levels }
    }

    // Sort
    let sortOption: Record<string, 1 | -1> = { rating: -1 }
    switch (sort) {
      case 'reviews':   sortOption = { reviewCount: -1 }; break
      case 'price-low': sortOption = { priceLevel: 1 };   break
      case 'price-high':sortOption = { priceLevel: -1 };  break
      default:          sortOption = { rating: -1 };      break
    }

    let query = Salon.find(filter).sort(sortOption)
    if (limit) query = query.limit(Number(limit))

    const salons = await query
    res.json({ count: salons.length, salons })
  } catch (err) {
    console.error('GET /api/salons error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/salons/meta — areas, service types, categories
router.get('/meta', (_req, res) => {
  res.json({ areas: AREAS, serviceTypes: SERVICE_TYPES, categories: CATEGORIES })
})

// GET /api/salons/testimonials
router.get('/testimonials', (_req, res) => {
  res.json(TESTIMONIALS)
})

// GET /api/salons/services
router.get('/services', (_req, res) => {
  res.json(SERVICES)
})

// GET /api/salons/:id
router.get('/:id', async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.id)
    if (!salon) {
      res.status(404).json({ error: 'Salon not found' })
      return
    }
    res.json(salon)
  } catch (err) {
    console.error('GET /api/salons/:id error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
