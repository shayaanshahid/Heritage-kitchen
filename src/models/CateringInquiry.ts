import mongoose, { Schema, model, models } from 'mongoose';

const CateringInquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  notes: { type: String },
  status: { 
    type: String, 
    enum: ['PENDING', 'CONTACTED', 'CONFIRMED', 'CANCELLED'], 
    default: 'PENDING' 
  },
}, { timestamps: true });

const CateringInquiry = models.CateringInquiry || model('CateringInquiry', CateringInquirySchema);

export default CateringInquiry;
