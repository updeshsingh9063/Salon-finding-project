import mongoose, { Schema } from 'mongoose'

const SalonSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, default: 'Mumbai' },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviewCount: { type: Number, required: true, default: 0 },
    priceLevel: { type: Number, enum: [1, 2, 3, 4], required: true },
    services: [{ type: String }],
    image: { type: String, default: '' },
    badge: { type: String },
    description: { type: String, default: '' },
    highlights: [{ type: String }],
    hours: {
      open: { type: String, default: '10:00' },
      close: { type: String, default: '20:00' },
    },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    lat: { type: Number },
    lng: { type: Number },
  },
  {
    versionKey: false,
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id
        delete ret._id
        return ret
      },
    },
    toObject: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id
        delete ret._id
        return ret
      },
    },
  }
)

export const Salon = mongoose.model('Salon', SalonSchema)
