"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Mail,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Calendar,
  Loader2,
  Phone,
  Briefcase,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CateringInquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guests: number;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  message?: string;
  createdAt: string;
};

export default function CateringManagementPage() {
  const [inquiries, setInquiries] = useState<CateringInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/catering');
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/catering/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        await fetchInquiries();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/catering/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchInquiries();
      }
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const filtered = inquiries.filter(item => {
    const matchesFilter = filter === 'ALL' || item.status === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#4a5e32]">Catering Inquiries</h1>
          <p className="text-[#7a8060] text-sm mt-1">Review and manage special event requests.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8060] w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search events/names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-[#6b7c4a]/10 rounded-xl text-sm focus:outline-none focus:border-[#6b7c4a] transition-all w-64 shadow-sm"
            />
          </div>
          
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-[#6b7c4a]/10 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#6b7c4a] cursor-pointer shadow-sm text-[#4a5035]"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-[#6b7c4a]/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f5ede0]/50 border-b border-[#6b7c4a]/10 text-[10px] uppercase tracking-widest font-bold text-[#7a8060]">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6b7c4a]/5">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8 h-20 bg-[#f5ede0]/10" />
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-[#7a8060] italic font-serif">
                      No catering inquiries found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => (
                    <motion.tr 
                      key={item._id || index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-[#f5ede0]/20 transition-colors"
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-[#6b7c4a]/10 flex items-center justify-center font-bold text-[#6b7c4a]">
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-[#1e2215]">{item.name}</div>
                            <div className="text-[10px] text-[#7a8060] flex flex-col gap-0.5 mt-1">
                              <span className="flex items-center gap-1"><Mail size={10} /> {item.email}</span>
                              <span className="flex items-center gap-1"><Phone size={10} /> {item.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm font-medium text-[#4a5035] flex items-center gap-2">
                           <Briefcase size={14} className="text-[#6b7c4a]" /> {item.eventType}
                        </div>
                        <div className="text-[11px] text-[#7a8060] flex items-center gap-2 mt-1">
                          <Users size={12} className="text-[#6b7c4a]" /> {item.guests} Guests
                        </div>
                        {item.message && (
                           <div className="text-[10px] text-[#7a8060] mt-1.5 line-clamp-1 italic max-w-[200px]" title={item.message}>
                             "{item.message}"
                           </div>
                        )}
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm font-medium text-[#1e2215] flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#6b7c4a]" /> {item.date}
                        </div>
                        <div className="text-[9px] text-[#7a8060] uppercase tracking-widest font-bold mt-1">
                          Ref: {item._id.slice(-6).toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm",
                          item.status === 'APPROVED' && "bg-green-500/10 text-green-600 border border-green-500/10",
                          item.status === 'PENDING' && "bg-[#6b7c4a]/10 text-[#6b7c4a] border border-[#6b7c4a]/10",
                          item.status === 'REJECTED' && "bg-[#c05050]/10 text-[#c05050] border border-[#c05050]/10",
                        )}>
                          {item.status === 'APPROVED' && <CheckCircle2 size={12} />}
                          {item.status === 'PENDING' && <Clock size={12} />}
                          {item.status === 'REJECTED' && <XCircle size={12} />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isUpdating === item._id ? (
                            <Loader2 size={16} className="animate-spin text-[#6b7c4a] mr-2" />
                          ) : (
                            <>
                              {item.status === 'PENDING' && (
                                <>
                                  <button 
                                    onClick={() => updateStatus(item._id, 'APPROVED')}
                                    className="p-2 hover:bg-green-500/10 text-green-600 rounded-lg transition-colors"
                                    title="Approve"
                                  >
                                    <CheckCircle2 size={18} />
                                  </button>
                                  <button 
                                    onClick={() => updateStatus(item._id, 'REJECTED')}
                                    className="p-2 hover:bg-[#c05050]/10 text-[#c05050] rounded-lg transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle size={18} />
                                  </button>
                                </>
                              )}
                              <button 
                                onClick={() => deleteInquiry(item._id)}
                                className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-[#f5ede0]/20 border-t border-[#6b7c4a]/10 flex items-center justify-between">
          <p className="text-[10px] text-[#7a8060] uppercase tracking-widest font-bold">
            Total Inquiries: {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-[#6b7c4a]/10 transition-all" disabled><ChevronLeft size={16} /></button>
            <button className="p-1.5 hover:bg-white rounded-lg disabled:opacity-30 border border-transparent hover:border-[#6b7c4a]/10 transition-all" disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
