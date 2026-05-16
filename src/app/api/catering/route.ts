import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CateringInquiry from '@/models/CateringInquiry';

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    
    const inquiry = await CateringInquiry.create(data);

    console.log('New Catering Inquiry:', inquiry);

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Catering inquiry error:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const inquiries = await CateringInquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
