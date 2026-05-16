import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { status } = await req.json();
    const { id } = await params;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    // Trigger email notifications
    const { sendReservationApprovalEmail, sendReservationRejectionEmail } = await import('@/services/email');
    
    if (status === 'APPROVED') {
      await sendReservationApprovalEmail(reservation.email, reservation);
    } else if (status === 'REJECTED') {
      await sendReservationRejectionEmail(reservation.email, reservation);
    }

    console.log(`Reservation ${id} updated to ${status} and email notification sent to ${reservation.email}`);

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Update reservation error:', error);
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}
