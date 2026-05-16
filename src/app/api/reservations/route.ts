import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    const isLargeGroup = data.guests > 10;
    
    const reservation = await Reservation.create({
      ...data,
      isLargeGroup,
      status: 'PENDING'
    });

    // In a real app, you would send an email here
    console.log('New Reservation Created:', reservation);

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error('Reservation creation error:', error);
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    return NextResponse.json(reservations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}
