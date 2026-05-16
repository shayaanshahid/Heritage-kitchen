import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';
import { seedMenu } from '@/lib/seed';

export async function GET() {
  try {
    await connectDB();
    
    // Auto-seed if empty
    const count = await MenuItem.countDocuments();
    if (count === 0) {
      await seedMenu();
    }

    const items = await MenuItem.find().sort({ category: 1, name: 1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Menu fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newItem = await MenuItem.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error('Menu create error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create menu item' }, { status: 500 });
  }
}
