"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Info,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Reservation = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  isLargeGroup: boolean;
  notes?: string;
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reservations');
      const data = await res.json();
      setReservations(data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchReservations();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredReservations = reservations.filter(res => {
    const matchesFilter = filter === 'ALL' || res.status === filter;
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif">Reservations</h1>
          <p className="text-muted-foreground text-sm">Manage and approve incoming table requests.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search guests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-secondary border border-white/5 rounded-sm text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-secondary border border-white/5 px-4 py-2 rounded-sm text-sm focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-secondary border border-white/5 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b border-white/5 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Details</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8 h-20 bg-muted/20" />
                    </tr>
                  ))
                ) : filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground italic">
                      No reservations found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res) => (
                    <motion.tr 
                      key={res._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {res.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-sm text-white flex items-center gap-2">
                              {res.name}
                              {res.isLargeGroup && (
                                <span className="text-[8px] bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">Large Group</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Mail size={10} /> {res.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm flex items-center gap-2">
                          <Users size={14} className="text-primary" />
                          {res.guests} People
                        </div>
                        {res.notes && (
                          <div className="text-[10px] text-muted-foreground mt-1 max-w-[200px] truncate italic" title={res.notes}>
                            "{res.notes}"
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm font-medium">{res.date}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock size={12} /> {res.time}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5",
                          res.status === 'APPROVED' && "bg-green-500/10 text-green-500",
                          res.status === 'PENDING' && "bg-primary/10 text-primary",
                          res.status === 'REJECTED' && "bg-red-500/10 text-red-500",
                        )}>
                          {res.status === 'APPROVED' && <CheckCircle2 size={12} />}
                          {res.status === 'PENDING' && <Clock size={12} />}
                          {res.status === 'REJECTED' && <XCircle size={12} />}
                          {res.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {res.status === 'PENDING' && (
                            <>
                              <button 
                                onClick={() => updateStatus(res._id, 'APPROVED')}
                                className="p-2 hover:bg-green-500/20 text-green-500 rounded-sm"
                                title="Approve"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button 
                                onClick={() => updateStatus(res._id, 'REJECTED')}
                                className="p-2 hover:bg-red-500/20 text-red-500 rounded-sm"
                                title="Reject"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          <button className="p-2 hover:bg-muted text-muted-foreground rounded-sm">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing 1 to {filteredReservations.length} of {filteredReservations.length} results</p>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-muted rounded disabled:opacity-30" disabled><ChevronLeft size={16} /></button>
            <button className="p-1 hover:bg-muted rounded disabled:opacity-30" disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
