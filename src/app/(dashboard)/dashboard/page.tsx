"use client";

import { motion } from 'framer-motion';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  TrendingUp,
  ArrowRight
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
  { name: 'Total Reservations', value: '124', icon: CalendarCheck, change: '+12%', color: 'text-blue-500' },
  { name: 'Pending Requests', value: '18', icon: Clock, change: '5 new', color: 'text-primary' },
  { name: 'Average Party Size', value: '3.5', icon: Users, change: '+0.2', color: 'text-green-500' },
  { name: 'Revenue Est.', value: '€14.2k', icon: TrendingUp, change: '+8%', color: 'text-purple-500' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif">Overview</h1>
        <div className="flex space-x-3">
          <button className="bg-muted px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm border border-white/5">Download Report</button>
          <button className="bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-white rounded-sm shadow-lg">New Entry</button>
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
            className="bg-secondary p-6 border border-white/5 shadow-xl group hover:border-primary/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 bg-muted rounded-sm", stat.color)}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full uppercase">
                {stat.change}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-1 uppercase tracking-widest font-semibold">{stat.name}</p>
            <h3 className="text-3xl font-serif">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reservation Trends */}
        <div className="bg-secondary p-8 border border-white/5 shadow-xl">
          <h3 className="text-xl font-serif mb-8">Reservation Trends</h3>
          <div className="h-80 w-full">
            {/* Note: In a real app, I'd install recharts. I'll assume it's installed or use a placeholder if not. 
                I'll use a CSS-based placeholder for now to avoid build errors if I didn't install recharts yet. */}
            <div className="flex items-end justify-between h-full gap-4 pt-10">
              {data.map((item) => (
                <div key={item.name} className="flex-1 flex flex-col items-center gap-4">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.reservations / 50) * 100}%` }}
                    className="w-full bg-primary/20 hover:bg-primary/40 border-t-2 border-primary transition-all rounded-t-sm"
                  />
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-secondary p-8 border border-white/5 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif">Pending Requests</h3>
            <button className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-all border-l-4 border-primary">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    JD
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">John Doe</h4>
                    <p className="text-xs text-muted-foreground">4 guests • Tomorrow at 19:00</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-green-500/10 text-green-500 px-3 py-1 text-[10px] font-bold uppercase rounded-full hover:bg-green-500 hover:text-white transition-all">Approve</button>
                  <button className="bg-red-500/10 text-red-500 px-3 py-1 text-[10px] font-bold uppercase rounded-full hover:bg-red-500 hover:text-white transition-all">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for conditional classes
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
