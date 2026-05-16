import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import MenuItem from '@/models/MenuItem';
import User from '@/models/User';
import CateringInquiry from '@/models/CateringInquiry';

export async function GET() {
  try {
    await connectDB();

    // Fetch counts
    const totalReservations = await Reservation.countDocuments();
    const pendingReservations = await Reservation.countDocuments({ status: 'PENDING' });
    const totalMenuItems = await MenuItem.countDocuments();
    const totalStaff = await User.countDocuments({ role: { $ne: 'CUSTOMER' } });
    const pendingCatering = await CateringInquiry.countDocuments({ status: 'PENDING' });

    // Fetch recent reservations & catering
    const recentReservations = await Reservation.find()
      .sort({ createdAt: -1 })
      .limit(3);

    const recentCatering = await CateringInquiry.find()
      .sort({ createdAt: -1 })
      .limit(3);

    // Fetch daily reservation trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trends = await Reservation.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Format trends for Recharts
    const trendData = trends.map(t => ({
      name: new Date(t._id).toLocaleDateString('en-US', { weekday: 'short' }),
      reservations: t.count
    }));

    return NextResponse.json({
      stats: {
        totalReservations,
        pendingReservations,
        totalMenuItems,
        totalStaff,
        pendingCatering
      },
      recentReservations,
      recentCatering,
      trendData
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
