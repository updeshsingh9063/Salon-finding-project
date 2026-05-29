import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import salonsRouter from './routes/salons.js'
import bookingsRouter from './routes/bookings.js'
import aiRouter from './routes/ai.js'

const app = express()
const PORT = Number(process.env.PORT) || 4000

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'GlowCity API', timestamp: new Date().toISOString() })
})

app.use('/api/salons', salonsRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, () => {
  console.log(`GlowCity API running at http://localhost:${PORT}`)
})
