import express from 'express'
import { Subscription } from '../models/Subscription.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Check if already subscribed
    const existing = await Subscription.findOne({ email })
    if (existing) {
      return res.status(400).json({ error: 'Email is already subscribed' })
    }

    const subscription = new Subscription({ email })
    await subscription.save()

    res.status(201).json({ message: 'Subscribed successfully', subscription })
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email is already subscribed' })
    }
    res.status(500).json({ error: err.message })
  }
})

export default router
