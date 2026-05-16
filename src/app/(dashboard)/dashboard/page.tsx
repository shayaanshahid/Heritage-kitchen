"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Plus,
  Loader2,
  Utensils,
  Bell
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type DashboardData = {
  stats: {
    totalReservations: number;
    pendingReservations: number;
    totalMenuItems: number;
    totalStaff: number;
    pendingCatering: number;
  };
  recentReservations: any[];
  recentCatering: any[];
  trendData: { name: string; reservations: number }[];
};

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin text-[#6b7c4a]" size={40} />
        <p className="text-[#7a8060] font-serif italic text-lg">Gathering real-time updates...</p>
      </div>
    );
  }

  const stats = [
    { name: 'Reservations', value: data?.stats.totalReservations || 0, sub: `${data?.stats.pendingReservations} pending`, icon: CalendarCheck, color: 'text-[#6b7c4a]', href: '/dashboard/reservations' },
    { name: 'Catering Inquiries', value: data?.stats.pendingCatering || 0, sub: 'Needs Review', icon: Bell, color: 'text-[#4a5e32]', href: '/dashboard/catering' },
    { name: 'Active Staff', value: data?.stats.totalStaff || 0, sub: 'Team Members', icon: Users, color: 'text-[#8a9c6a]', href: '/dashboard/staff' },
    { name: 'Menu Items', value: data?.stats.totalMenuItems || 0, sub: 'Available Dishes', icon: Utensils, color: 'text-[#6b7c4a]', href: '/dashboard/menu' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#4a5e32]">Dashboard Overview</h1>
          <p className="text-[#7a8060] text-sm mt-1">Live restaurant metrics and management dashboard.</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/dashboard/reservations"
            className="bg-[#6b7c4a] px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white rounded-xl shadow-lg shadow-[#6b7c4a]/20 hover:bg-[#4a5e32] transition-all flex items-center gap-2"
          >
            <Plus size={14} /> New Reservation
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Link key={stat.name} href={stat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-[#6b7c4a]/10 shadow-sm group hover:border-[#6b7c4a]/30 hover:shadow-md transition-all duration-300 h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 bg-[#f5ede0] rounded-xl transition-transform group-hover:scale-110", stat.color)}>
                  <stat.icon size={22} />
                </div>
                <div className="text-[9px] font-bold text-[#6b7c4a] bg-[#6b7c4a]/5 px-2 py-1 rounded-md uppercase tracking-widest">
                   Live
                </div>
              </div>
              <p className="text-[#7a8060] text-xs mb-1 uppercase tracking-widest font-bold">{stat.name}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-serif text-[#1e2215]">{stat.value}</h3>
                <span className="text-[10px] text-[#6b7c4a] font-bold uppercase">{stat.sub}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity (Reservations) */}
        <div className="bg-white p-8 rounded-2xl border border-[#6b7c4a]/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif text-[#4a5e32]">Reservation Activity</h3>
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#7a8060] flex items-center gap-2 bg-[#f5ede0] px-3 py-1.5 rounded-lg border border-[#6b7c4a]/10">
               Last 7 Days
            </div>
          </div>
          <div className="h-72 w-full flex items-end justify-between gap-3 pt-10">
            {data?.trendData && data.trendData.length > 0 ? (
              data.trendData.map((item) => (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-3 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max((item.reservations / (Math.max(...data.trendData.map(d => d.reservations)) || 1)) * 100, 8)}%` }}
                    className="w-full bg-gradient-to-t from-[#6b7c4a]/10 to-[#6b7c4a]/40 group-hover:from-[#6b7c4a]/20 group-hover:to-[#6b7c4a]/60 border-t-2 border-[#6b7c4a] transition-all rounded-t-lg relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#4a5e32] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-lg">
                      {item.reservations}
                    </div>
                  </motion.div>
                  <span className="text-[9px] text-[#7a8060] font-bold uppercase tracking-tighter">{item.name}</span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-[#7a8060] italic text-sm">
                 No activity recorded this week.
              </div>
            )}
          </div>
        </div>

        {/* Combined Recent Requests */}
        <div className="bg-white p-8 rounded-2xl border border-[#6b7c4a]/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif text-[#4a5e32]">Latest Inquiries</h3>
            <Link 
              href="/dashboard/reservations"
              className="text-[#6b7c4a] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {[...(data?.recentReservations || []), ...(data?.recentCatering || [])]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((item, i) => (
                <div key={item._id} className="flex items-center justify-between p-4 bg-[#f5ede0]/30 hover:bg-[#f5ede0]/60 transition-all rounded-xl border border-transparent hover:border-[#6b7c4a]/10">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                      item.guests ? "bg-[#6b7c4a]/10 text-[#6b7c4a]" : "bg-[#4a5e32]/10 text-[#4a5e32]"
                    )}>
                      {item.guests ? <CalendarCheck size={18} /> : <Bell size={18} />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#1e2215]">{item.name}</h4>
                      <p className="text-[11px] text-[#7a8060]">
                        {item.guests ? `${item.guests} guests • Reservation` : `${item.eventType || 'Inquiry'} • Catering`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-[#7a8060] uppercase mb-1">
                      {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                    <div className={cn(
                      "text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block",
                      item.status === 'APPROVED' ? "bg-green-100 text-green-700" :
                      item.status === 'REJECTED' ? "bg-red-100 text-red-700" :
                      "bg-[#6b7c4a]/10 text-[#6b7c4a]"
                    )}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))
            }
            {(!data?.recentReservations?.length && !data?.recentCatering?.length) && (
              <div className="text-center py-10 text-[#7a8060] italic text-sm">
                No recent activity found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
