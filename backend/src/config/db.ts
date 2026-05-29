import mongoose from 'mongoose'

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI ?? 'mongodb+srv://updeshsingh9063:<db_password>@cluster0.avgsqd1.mongodb.net/glowcity?retryWrites=true&w=majority'
  try {
    await mongoose.connect(uri)
    console.log(`✅ MongoDB connected → ${uri}`)
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  }
}
