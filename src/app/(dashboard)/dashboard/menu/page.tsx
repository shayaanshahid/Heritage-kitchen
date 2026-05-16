"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  Loader2,
  X,
  ChevronDown,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  isFeatured: boolean;
  image?: string;
};

const categories = ['ALL', 'STARTERS', 'MAINS', 'DESSERTS', 'BRUNCH', 'DRINKS'];

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'STARTERS',
    isAvailable: true,
    isFeatured: false,
    image: ''
  });

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setForm({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        isAvailable: item.isAvailable,
        isFeatured: item.isFeatured,
        image: item.image || ''
      });
    } else {
      setEditingItem(null);
      setForm({
        name: '',
        description: '',
        price: '',
        category: 'STARTERS',
        isAvailable: true,
        isFeatured: false,
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const method = editingItem ? 'PATCH' : 'POST';
      const url = editingItem ? `/api/menu/${editingItem._id}` : '/api/menu';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price)
        }),
      });

      if (res.ok) {
        await fetchMenu();
        closeModal();
      }
    } catch (error) {
      console.error('Failed to save item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) fetchMenu();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#4a5e32]">Menu Management</h1>
          <p className="text-[#7a8060] text-sm mt-1">Add, edit, or remove dishes from your menu.</p>
        </div>

        <button 
          onClick={() => openModal()}
          className="bg-[#6b7c4a] text-white px-6 py-3 font-bold tracking-widest uppercase rounded-xl flex items-center gap-2 hover:bg-[#4a5e32] transition-all shadow-lg shadow-[#6b7c4a]/20"
        >
          <Plus size={18} /> Add New Dish
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#6b7c4a]/10 shadow-sm space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Categories</h4>
            <div className="flex flex-col space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
                    activeCategory === cat 
                      ? "bg-[#6b7c4a] text-white font-semibold" 
                      : "text-[#7a8060] hover:bg-[#f5ede0] hover:text-[#4a5e32]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8060] w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#6b7c4a]/10 rounded-xl text-sm focus:outline-none focus:border-[#6b7c4a] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse bg-white h-44 rounded-2xl border border-[#6b7c4a]/10" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#6b7c4a]/20">
              <p className="text-[#7a8060] italic">No dishes found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-2xl border border-[#6b7c4a]/10 shadow-sm flex gap-5 group hover:border-[#6b7c4a]/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-24 h-24 bg-[#f5ede0]/50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative border border-[#6b7c4a]/5 shadow-inner">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                      ) : (
                        <ImageIcon className="text-[#6b7c4a]/20 w-8 h-8" />
                      )}
                      {item.isFeatured && (
                        <div className="absolute top-0 left-0 bg-[#6b7c4a] text-[7px] font-bold text-white px-2 py-0.5 uppercase tracking-widest z-10">Featured</div>
                      )}
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                           <EyeOff size={20} className="text-white/80" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-serif text-lg leading-tight text-[#1e2215]">{item.name}</h3>
                          <span className="text-[#6b7c4a] font-bold shrink-0">€{item.price}</span>
                        </div>
                        <p className="text-[11px] text-[#7a8060] mt-1.5 line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => openModal(item)}
                            className="p-1.5 text-[#7a8060] hover:bg-[#f5ede0] hover:text-[#4a5e32] rounded-lg transition-colors" 
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button 
                            onClick={() => deleteItem(item._id)}
                            className="p-1.5 text-[#7a8060] hover:bg-red-50 hover:text-[#c05050] rounded-lg transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#6b7c4a]/60 bg-[#6b7c4a]/5 px-2 py-0.5 rounded-full border border-[#6b7c4a]/10">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1e2215]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative border border-[#6b7c4a]/10 my-8"
            >
              <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-[#f5ede0] rounded-full text-[#7a8060] transition-colors">
                <X size={20} />
              </button>

              <h2 className="text-2xl font-serif text-[#4a5e32] mb-1">
                {editingItem ? 'Edit Dish' : 'Add New Dish'}
              </h2>
              <p className="text-[#7a8060] text-sm mb-6">Fill in the details to update your menu.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Preview / Input */}
                <div className="flex flex-col items-center gap-4 mb-2">
                   <div className="w-32 h-32 rounded-2xl bg-[#f5ede0] border border-dashed border-[#6b7c4a]/30 flex items-center justify-center overflow-hidden relative group">
                      {form.image ? (
                        <>
                          <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button" 
                            onClick={() => setForm({...form, image: ''})}
                            className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold uppercase"
                          >
                             Remove
                          </button>
                        </>
                      ) : (
                        <ImageIcon className="text-[#6b7c4a]/20 w-10 h-10" />
                      )}
                   </div>
                   <div className="w-full space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Image URL</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8060]" />
                        <input
                          value={form.image}
                          onChange={(e) => setForm({ ...form, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-[#f5ede0]/30 border border-[#6b7c4a]/10 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#6b7c4a] transition-all text-xs"
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Dish Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Signature Pad Thai"
                    className="w-full bg-[#f5ede0]/30 border border-[#6b7c4a]/10 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6b7c4a] transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Description *</label>
                  <textarea
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of the ingredients and flavors..."
                    className="w-full bg-[#f5ede0]/30 border border-[#6b7c4a]/10 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6b7c4a] transition-all text-sm min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Price (€) *</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="18.50"
                      className="w-full bg-[#f5ede0]/30 border border-[#6b7c4a]/10 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6b7c4a] transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7a8060]">Category *</label>
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full bg-[#f5ede0]/30 border border-[#6b7c4a]/10 px-4 py-3 rounded-xl focus:outline-none focus:border-[#6b7c4a] transition-all text-sm appearance-none"
                      >
                        {categories.filter(c => c !== 'ALL').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7a8060] pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={form.isAvailable} 
                      onChange={(e) => setForm({...form, isAvailable: e.target.checked})}
                      className="w-4 h-4 rounded border-[#6b7c4a]/20 text-[#6b7c4a] focus:ring-[#6b7c4a]" 
                    />
                    <span className="text-xs font-medium text-[#7a8060] group-hover:text-[#4a5e32] transition-colors">Available</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={form.isFeatured} 
                      onChange={(e) => setForm({...form, isFeatured: e.target.checked})}
                      className="w-4 h-4 rounded border-[#6b7c4a]/20 text-[#6b7c4a] focus:ring-[#6b7c4a]" 
                    />
                    <span className="text-xs font-medium text-[#7a8060] group-hover:text-[#4a5e32] transition-colors">Featured Item</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3.5 border border-[#6b7c4a]/10 text-[#7a8060] hover:bg-[#f5ede0] rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 bg-[#6b7c4a] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#4a5e32] transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-[#6b7c4a]/20"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={14} className="animate-spin" /> Saving...</>
                    ) : editingItem ? (
                      'Save Changes'
                    ) : (
                      'Add Dish'
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
