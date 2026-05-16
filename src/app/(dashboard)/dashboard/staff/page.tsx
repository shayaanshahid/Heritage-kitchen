"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Trash2,
  Shield,
  UserCheck,
  Mail,
  Phone,
  X,
  Loader2,
  Edit2,
  ChevronDown,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

type StaffMember = {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER';
  phone?: string;
  position?: string;
  createdAt: string;
};

const roleColors = {
  ADMIN: 'bg-purple-500/10 text-purple-600 border-purple-500/10',
  EMPLOYEE: 'bg-[#6b7c4a]/10 text-[#6b7c4a] border-[#6b7c4a]/10',
  CUSTOMER: 'bg-green-500/10 text-green-600 border-green-500/10',
};

const roleIcons = {
  ADMIN: Shield,
  EMPLOYEE: UserCheck,
  CUSTOMER: UserCheck,
};

type ModalMode = 'add' | 'edit' | null;

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
    phone: '',
    position: '',
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/staff');
      const data = await res.json();
      setStaff(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch staff:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const openAddModal = () => {
    setForm({ name: '', email: '', password: '', role: 'EMPLOYEE', phone: '', position: '' });
    setFormError('');
    setEditingStaff(null);
    setModalMode('add');
  };

  const openEditModal = (member: StaffMember) => {
    setForm({
      name: member.name,
      email: member.email,
      password: '',
      role: member.role,
      phone: member.phone || '',
      position: member.position || '',
    });
    setFormError('');
    setEditingStaff(member);
    setModalMode('edit');
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingStaff(null);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      if (modalMode === 'add') {
        if (!form.password || form.password.length < 6) {
          setFormError('Password must be at least 6 characters.');
          setIsSubmitting(false);
          return;
        }
        const res = await fetch('/api/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || 'Failed to create staff member.');
          return;
        }
      } else if (modalMode === 'edit' && editingStaff) {
        const updates = { name: form.name, role: form.role, phone: form.phone, position: form.position };
        const res = await fetch(`/api/staff/${editingStaff._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        const data = await res.json();
        if (!res.ok) {
          setFormError(data.error || 'Failed to update staff member.');
          return;
        }
      }
      closeModal();
      fetchStaff();
    } catch (err) {
      setFormError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this staff member?')) return;
    try {
      const res = await fetch(`/api/staff/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to delete.');
        return;
      }
      fetchStaff();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filtered = staff.filter((m) => {
    const matchesRole = roleFilter === 'ALL' || m.role === roleFilter;
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const inputClass =
    'w-full bg-[#f5ede0]/30 border border-[#6b7c4a]/10 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6b7c4a] transition-all text-sm shadow-sm';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#4a5e32]">Staff Management</h1>
          <p className="text-[#7a8060] text-sm mt-1">
            Manage your team — {staff.filter(s => s.role !== 'CUSTOMER').length} active members.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#6b7c4a] text-white px-6 py-3 font-bold tracking-widest uppercase rounded-xl flex items-center gap-2 hover:bg-[#4a5e32] transition-all shadow-lg shadow-[#6b7c4a]/20 self-start"
        >
          <Plus size={18} /> Add Staff Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8060] w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-white border border-[#6b7c4a]/10 rounded-xl text-sm focus:outline-none focus:border-[#6b7c4a] transition-all w-64 shadow-sm"
          />
        </div>
        {['ALL', 'ADMIN', 'EMPLOYEE'].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={cn(
              'px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm',
              roleFilter === role 
                ? 'bg-[#6b7c4a] text-white border border-transparent' 
                : 'bg-white border border-[#6b7c4a]/10 text-[#7a8060] hover:bg-[#f5ede0]'
            )}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse bg-white h-52 rounded-2xl border border-[#6b7c4a]/10 shadow-sm" />
              ))
            : filtered.length === 0
            ? (
                <div className="col-span-full py-20 text-center text-[#7a8060] italic bg-white rounded-2xl border border-dashed border-[#6b7c4a]/20">
                  No staff members found.
                </div>
              )
            : filtered.map((member) => {
                const RoleIcon = roleIcons[member.role];
                const initials = member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);
                return (
                  <motion.div
                    key={member._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-[#6b7c4a]/10 p-6 rounded-2xl group hover:border-[#6b7c4a]/30 hover:shadow-md transition-all duration-300"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[#f5ede0] flex items-center justify-center text-[#6b7c4a] font-bold text-xl font-serif shrink-0 border border-[#6b7c4a]/5 shadow-inner">
                          {initials}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg leading-tight text-[#1e2215]">{member.name}</h3>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-[#7a8060] mt-1">{member.position || 'Staff'}</p>
                        </div>
                      </div>
                      <span className={cn('text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 border shadow-sm', roleColors[member.role])}>
                        <RoleIcon size={10} />
                        {member.role}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="space-y-2.5 border-t border-[#6b7c4a]/5 pt-5 mb-5">
                      <div className="flex items-center gap-3 text-sm text-[#7a8060]">
                        <div className="w-7 h-7 rounded-lg bg-[#f5ede0]/50 flex items-center justify-center text-[#6b7c4a]">
                           <Mail size={13} />
                        </div>
                        <span className="truncate text-xs font-medium">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-[#7a8060]">
                        <div className="w-7 h-7 rounded-lg bg-[#f5ede0]/50 flex items-center justify-center text-[#6b7c4a]">
                           <Phone size={13} />
                        </div>
                        <span className="text-xs font-medium">{member.phone || 'No phone set'}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="text-[10px] text-[#7a8060] font-bold uppercase tracking-widest">
                        Since {new Date(member.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2 hover:bg-[#f5ede0] text-[#7a8060] hover:text-[#4a5e32] rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        {member.role !== 'ADMIN' && (
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="p-2 hover:bg-red-50 text-[#7a8060] hover:text-[#c05050] rounded-lg transition-colors"
                            title="Remove"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1e2215]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border border-[#6b7c4a]/10 shadow-2xl w-full max-w-lg p-8 relative"
            >
              <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-[#f5ede0] rounded-full text-[#7a8060] transition-colors">
                <X size={20} />
              </button>

              <h2 className="text-2xl font-serif mb-1 text-[#4a5e32]">
                {modalMode === 'add' ? 'Add Staff Member' : 'Edit Staff Member'}
              </h2>
              <p className="text-[#7a8060] text-sm mb-8">
                {modalMode === 'add' ? 'Create a new team member account.' : 'Update the staff member details.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Position</label>
                    <input
                      value={form.position}
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                      placeholder="Head Chef, Waiter..."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@heritagekitchen.be"
                    disabled={modalMode === 'edit'}
                    className={cn(inputClass, modalMode === 'edit' && 'opacity-50 cursor-not-allowed bg-[#f5ede0]/20')}
                  />
                </div>

                {modalMode === 'add' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Password *</label>
                    <input
                      required
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Min. 6 characters"
                      className={inputClass}
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+32 ..."
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Role *</label>
                    <div className="relative">
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className={cn(inputClass, 'appearance-none pr-10')}
                      >
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8060] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {formError && (
                  <div className="p-4 bg-red-50 border border-red-100 text-[#c05050] text-xs rounded-xl font-medium">
                    {formError}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3.5 border border-[#6b7c4a]/10 text-[#7a8060] hover:bg-[#f5ede0] rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-[#6b7c4a] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#4a5e32] transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-[#6b7c4a]/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Saving...
                      </>
                    ) : modalMode === 'add' ? (
                      'Add Member'
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
