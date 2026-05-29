import 'dotenv/config'
import mongoose from 'mongoose'
import { Salon } from '../models/Salon.js'
import { SALONS } from '../data.js'

async function seed() {
  const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/glowcity'

  console.log('🔌 Connecting to MongoDB...')
  await mongoose.connect(uri)
  console.log(`✅ Connected → ${uri}`)

  // Clear existing salons
  const { deletedCount } = await Salon.deleteMany({})
  console.log(`🗑  Cleared ${deletedCount} existing salon(s)`)

  // Map id → _id for Mongoose
  const docs = SALONS.map(({ id, ...rest }) => ({ _id: id, ...rest }))
  await Salon.insertMany(docs)
  console.log(`🌱 Seeded ${docs.length} salons:`)
  docs.forEach((s) => console.log(`   • [${s._id}] ${s.name} — ${s.area}`))

  await mongoose.disconnect()
  console.log('\n✅ Seed complete! You can now view data in MongoDB Compass.')
  console.log('   Connection string: mongodb://localhost:27017')
  console.log('   Database: glowcity   Collection: salons\n')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
