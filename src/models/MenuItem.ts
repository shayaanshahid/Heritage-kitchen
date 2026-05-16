import mongoose, { Schema, model, models } from 'mongoose';

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['STARTERS', 'MAINS', 'DESSERTS', 'BRUNCH', 'DRINKS'], 
    required: true 
  },
  image: { type: String }, // URL
  isAvailable: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

const MenuItem = models.MenuItem || model('MenuItem', MenuItemSchema);

export default MenuItem;
