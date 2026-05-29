import mongoose from 'mongoose'

const salonRegistrationSchema = new mongoose.Schema({
  salonName: { type: String, required: true },
  ownerName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  area: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true })

export const SalonRegistration = mongoose.model('SalonRegistration', salonRegistrationSchema)
