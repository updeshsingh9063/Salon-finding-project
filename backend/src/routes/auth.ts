import express from 'express'
import { User } from '../models/User.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password required' })
    }

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ error: 'User already exists' })
    }

    user = new User({ name, email, password })
    await user.save()
    
    res.status(201).json({ message: 'User created successfully', user: { id: user._id, name: user.name, email: user.email } })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    res.json({ message: 'Signed in successfully', user: { id: user._id, name: user.name, email: user.email } })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router
