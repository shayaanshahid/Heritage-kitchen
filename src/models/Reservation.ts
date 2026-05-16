import mongoose, { Schema, model, models } from 'mongoose';

const ReservationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  time: { type: String, required: true }, // Format: HH:MM
  notes: { type: String },
  status: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED'], 
    default: 'PENDING' 
  },
  isLargeGroup: { type: Boolean, default: false },
  internalNotes: { type: String },
}, { timestamps: true });

const Reservation = models.Reservation || model('Reservation', ReservationSchema);

export default Reservation;
