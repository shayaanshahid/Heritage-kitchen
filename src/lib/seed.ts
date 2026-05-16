import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

const seedData = [
  {
    name: 'Vietnamese Fresh Spring Rolls',
    description: 'Crisp rice paper rolls with fresh herbs, vermicelli, and peanut dipping sauce.',
    price: 12.50,
    category: 'STARTERS',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04cb21c7?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isFeatured: true
  },
  {
    name: 'Chicken Satay Skewers',
    description: 'Grilled marinated chicken skewers served with a rich, spiced peanut sauce.',
    price: 14.00,
    category: 'STARTERS',
    image: 'https://images.unsplash.com/photo-1626500155552-4464f438908a?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isFeatured: false
  },
  {
    name: 'Signature Pad Thai',
    description: 'Classic stir-fried rice noodles with egg, peanuts, bean sprouts, and tangy tamarind.',
    price: 22.50,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1559311648-d46f4d8593d8?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isFeatured: true
  },
  {
    name: 'Malaysian Beef Rendang',
    description: 'Slow-cooked beef in a rich coconut milk and complex spice paste. Melts in your mouth.',
    price: 26.00,
    category: 'MAINS',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isFeatured: true
  },
  {
    name: 'Mango Sticky Rice',
    description: 'Sweet coconut glutinous rice served with fresh, ripe mango slices.',
    price: 10.50,
    category: 'DESSERTS',
    image: 'https://images.unsplash.com/photo-1610450949065-1f280f279524?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isFeatured: false
  }
];

export async function seedMenu() {
  try {
    await connectDB();
    
    // Check if menu is empty
    const count = await MenuItem.countDocuments();
    if (count === 0) {
      console.log('Seeding menu data...');
      await MenuItem.insertMany(seedData);
      console.log('Menu seeded successfully.');
    } else {
      console.log('Menu already has data. Skipping seed.');
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
}
