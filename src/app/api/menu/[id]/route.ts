import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MenuItem from '@/models/MenuItem';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    
    const item = await MenuItem.findByIdAndUpdate(id, body, { new: true });

    if (!item) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Menu update error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update menu item' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const item = await MenuItem.findByIdAndDelete(id);

    if (!item) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error: any) {
    console.error('Menu delete error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete menu item' }, { status: 500 });
  }
}
