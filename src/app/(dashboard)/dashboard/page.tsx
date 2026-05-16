"use client";

import { motion } from 'framer-motion';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', reservations: 12 },
  { name: 'Tue', reservations: 15 },
  { name: 'Wed', reservations: 22 },
  { name: 'Thu', reservations: 18 },
  { name: 'Fri', reservations: 35 },
  { name: 'Sat', reservations: 45 },
  { name: 'Sun', reservations: 38 },
];

const stats = [
  { name: 'Total Reservations', value: '124', icon: CalendarCheck, change: '+12%', color: 'text-[#6b7c4a]' },
  { name: 'Pending Requests', value: '18', icon: Clock, change: '5 new', color: 'text-[#4a5e32]' },
  { name: 'Staff Members', value: '8', icon: Users, change: '+1', color: 'text-[#8a9c6a]' },
  { name: 'Monthly Revenue', value: '€14.2k', icon: TrendingUp, change: '+8%', color: 'text-[#6b7c4a]' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-[#4a5e32]">Dashboard Overview</h1>
          <p className="text-[#7a8060] text-sm mt-1">Track your restaurant performance and pending tasks.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-[#6b7c4a]/10 hover:bg-[#f5ede0] transition-colors text-[#4a5e32]">
            Generate Report
          </button>
          <button className="bg-[#6b7c4a] px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-xl shadow-lg shadow-[#6b7c4a]/20 hover:bg-[#4a5e32] transition-colors flex items-center gap-2">
            <Plus size={14} /> New Reservation
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-[#6b7c4a]/10 shadow-sm group hover:border-[#6b7c4a]/30 hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 bg-[#f5ede0] rounded-xl", stat.color)}>
                <stat.icon size={22} />
              </div>
              <span className="text-[10px] font-bold text-[#6b7c4a] bg-[#6b7c4a]/10 px-2.5 py-1 rounded-full uppercase">
                {stat.change}
              </span>
            </div>
            <p className="text-[#7a8060] text-xs mb-1 uppercase tracking-widest font-bold">{stat.name}</p>
            <h3 className="text-3xl font-serif text-[#1e2215]">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reservation Trends */}
        <div className="bg-white p-8 rounded-2xl border border-[#6b7c4a]/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif text-[#4a5e32]">Weekly Trends</h3>
            <select className="text-[10px] font-bold uppercase tracking-widest bg-[#f5ede0] border-none rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-[#6b7c4a]">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <div className="flex items-end justify-between h-full gap-4 pt-10">
              {data.map((item) => (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-4 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.reservations / 50) * 100}%` }}
                    className="w-full bg-[#6b7c4a]/20 group-hover:bg-[#6b7c4a]/40 border-t-2 border-[#6b7c4a] transition-all rounded-t-lg relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#4a5e32] text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {item.reservations}
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-[#7a8060] font-bold uppercase">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl border border-[#6b7c4a]/10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif text-[#4a5e32]">Recent Requests</h3>
            <button className="text-[#6b7c4a] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'John Doe', size: '4 guests', time: 'Tomorrow, 19:00', initials: 'JD' },
              { name: 'Sarah Wilson', size: '2 guests', time: 'May 18, 13:00', initials: 'SW' },
              { name: 'Michael Chen', size: '6 guests', time: 'May 18, 20:30', initials: 'MC' },
            ].map((req, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-[#f5ede0]/30 hover:bg-[#f5ede0]/60 transition-all rounded-xl border border-transparent hover:border-[#6b7c4a]/10">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-[#6b7c4a]/10 flex items-center justify-center font-bold text-[#6b7c4a]">
                    {req.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1e2215]">{req.name}</h4>
                    <p className="text-[11px] text-[#7a8060]">{req.size} • {req.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-[#6b7c4a]/10 text-[#6b7c4a] px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg hover:bg-[#6b7c4a] hover:text-white transition-all">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
