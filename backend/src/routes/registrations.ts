import express from 'express'
import { SalonRegistration } from '../models/SalonRegistration.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const registration = new SalonRegistration(req.body)
    await registration.save()
    res.status(201).json({ message: 'Registration submitted successfully', registration })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
