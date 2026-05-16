import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import CateringInquiry from '@/models/CateringInquiry';

export async function GET() {
  try {
    await connectDB();
    const inquiries = await CateringInquiry.find().sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch catering inquiries' }, { status: 500 });
  }
}
