import { Router } from 'express'
import { SALONS } from '../data.js'

const router = Router()

router.post('/chat', (req, res) => {
  const message = String(req.body?.message ?? '').toLowerCase()

  if (message.includes('bridal')) {
    res.json({
      reply:
        'For bridal makeup, I recommend Lavelle Beauty Mumbai (4.9★) and Aurora Beauty Lounge (4.8★). Both specialize in Indian bridal looks.',
      salons: SALONS.filter((s) => s.services.includes('Bridal')).slice(0, 3),
    })
    return
  }

  if (message.includes('hair')) {
    res.json({
      reply:
        'For hair services, check out Blush Studio Mumbai (4.7★) or Velvet Touch Salon (4.6★) for great value and experienced stylists.',
      salons: SALONS.filter((s) => s.services.some((svc) => svc.includes('Hair'))).slice(0, 3),
    })
    return
  }

  if (message.includes('nail')) {
    res.json({
      reply: 'For nail art, Radiance Beauty Bar (4.8★) is trending with amazing designs.',
      salons: SALONS.filter((s) => s.services.includes('Nails')).slice(0, 3),
    })
    return
  }

  res.json({
    reply: "Tell me your area and what you're looking for! I can recommend salons based on your occasion and budget.",
    salons: [],
  })
})

export default router
