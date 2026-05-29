import mongoose, { Schema } from 'mongoose'

const BookingSchema = new Schema(
  {
    bookingId: { type: String, required: true, unique: true, index: true },
    salonId: { type: String, required: true },
    salonName: { type: String, required: true },
    serviceIds: [{ type: String }],
    date: { type: String, default: '' },
    time: { type: String, default: '' },
    customer: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      specialRequests: { type: String, default: '' },
    },
    customerName: { type: String, default: '' },
    customerPhone: { type: String, default: '' },
    customerEmail: { type: String, default: '' },
    total: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc: any, ret: any) {
        ret.id = ret._id.toString()
        delete ret._id
        return ret
      },
    },
  }
)

export const Booking = mongoose.model('Booking', BookingSchema)
