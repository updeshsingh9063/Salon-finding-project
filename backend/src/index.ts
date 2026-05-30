import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import salonsRouter from './routes/salons.js'
import bookingsRouter from './routes/bookings.js'
import aiRouter from './routes/ai.js'
import authRouter from './routes/auth.js'
import registrationsRouter from './routes/registrations.js'

const app = express()
const PORT = Number(process.env.PORT) || 4000

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://salon-finding-project.vercel.app',
        process.env.FRONTEND_URL?.replace(/\/$/, '') // Remove trailing slash if present
      ].filter(Boolean)
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        // Fallback for Vercel preview URLs
        if (origin && origin.endsWith('.vercel.app')) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
    },
    credentials: true,
  })
)
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'GlowCity API',
    timestamp: new Date().toISOString(),
    database: 'MongoDB (local)',
  })
})

app.use('/api/salons', salonsRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/ai', aiRouter)
app.use('/api/auth', authRouter)
app.use('/api/registrations', registrationsRouter)

// Connect to MongoDB, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 GlowCity API  →  http://localhost:${PORT}`)
      console.log(`📋 Health check  →  http://localhost:${PORT}/api/health`)
      console.log(`💅 Salons API    →  http://localhost:${PORT}/api/salons`)
      console.log(`📅 Bookings API  →  http://localhost:${PORT}/api/bookings`)
      console.log(`🤖 AI Chat API   →  http://localhost:${PORT}/api/ai/chat\n`)
    })
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
