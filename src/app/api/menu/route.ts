import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

export async function GET() {
  try {
    await connectDB();
    const items = await MenuItem.find({ isAvailable: true }).sort({ category: 1, name: 1 });
    
    // If no items found, return some seed data (fallback)
    if (items.length === 0) {
      return NextResponse.json([
        { id: '1', name: 'Vietnamese Fresh Spring Rolls', description: 'Rice paper, fresh herbs, vermicelli, peanut dipping sauce.', price: 12, category: 'STARTERS' },
        { id: '2', name: 'Chicken Satay Skewers', description: 'Grilled marinated chicken with a rich, spiced peanut sauce.', price: 14, category: 'STARTERS' },
        { id: '3', name: 'Signature Pad Thai', description: 'Stir-fried rice noodles, egg, peanuts, bean sprouts, and tangy tamarind sauce.', price: 22, category: 'MAINS' },
        { id: '4', name: 'Malaysian Beef Rendang', description: 'Slow-cooked beef in a rich coconut milk and spice paste.', price: 26, category: 'MAINS' },
        { id: '5', name: 'Mango Sticky Rice', description: 'Sweet coconut glutinous rice, fresh ripe mango.', price: 10, category: 'DESSERTS' },
      ]);
    }
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Menu fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
