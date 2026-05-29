import { Router } from 'express'
import {
  SALONS,
  CATEGORIES,
  TESTIMONIALS,
  SERVICES,
  AREAS,
  SERVICE_TYPES,
} from '../data.js'

const router = Router()

router.get('/', (req, res) => {
  let result = [...SALONS]
  const { area, service, minRating, priceLevel, sort } = req.query

  if (typeof area === 'string' && area) {
    const areas = area.split(',')
    result = result.filter((s) => areas.some((a) => s.area.includes(a)))
  }

  if (typeof service === 'string' && service) {
    const services = service.split(',')
    result = result.filter((s) => s.services.some((svc) => services.includes(svc)))
  }

  if (minRating) {
    result = result.filter((s) => s.rating >= Number(minRating))
  }

  if (priceLevel) {
    const levels = String(priceLevel).split(',').map(Number)
    result = result.filter((s) => levels.includes(s.priceLevel))
  }

  switch (sort) {
    case 'reviews':
      result.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    case 'price-low':
      result.sort((a, b) => a.priceLevel - b.priceLevel)
      break
    case 'price-high':
      result.sort((a, b) => b.priceLevel - a.priceLevel)
      break
    default:
      result.sort((a, b) => b.rating - a.rating)
  }

  res.json({ count: result.length, salons: result })
})

router.get('/meta', (_req, res) => {
  res.json({ areas: AREAS, serviceTypes: SERVICE_TYPES, categories: CATEGORIES })
})

router.get('/testimonials', (_req, res) => {
  res.json(TESTIMONIALS)
})

router.get('/services', (_req, res) => {
  res.json(SERVICES)
})

router.get('/:id', (req, res) => {
  const salon = SALONS.find((s) => s.id === req.params.id)
  if (!salon) {
    res.status(404).json({ error: 'Salon not found' })
    return
  }
  res.json(salon)
})

export default router
