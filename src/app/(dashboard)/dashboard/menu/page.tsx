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
  Loader2
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
};

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const categories = ['ALL', 'STARTERS', 'MAINS', 'DESSERTS', 'BRUNCH', 'DRINKS'];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif">Menu Management</h1>
          <p className="text-muted-foreground text-sm">Add, edit, or remove dishes from your menu.</p>
        </div>

        <button className="bg-primary text-white px-6 py-3 font-bold tracking-widest uppercase rounded-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-xl">
          <Plus size={18} /> Add New Dish
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-secondary p-6 border border-white/5 shadow-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categories</h4>
            <div className="flex flex-col space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-left px-4 py-2 rounded-sm text-sm transition-all",
                    activeCategory === cat ? "bg-primary text-white" : "hover:bg-muted text-muted-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-secondary border border-white/5 rounded-sm text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse bg-secondary h-40 border border-white/5 rounded-sm" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-secondary p-6 border border-white/5 shadow-xl flex gap-6 group hover:border-primary/30 transition-all"
                  >
                    <div className="w-24 h-24 bg-muted rounded-sm flex items-center justify-center shrink-0 overflow-hidden relative">
                      <ImageIcon className="text-muted-foreground/30 w-8 h-8" />
                      {item.isFeatured && (
                        <div className="absolute top-0 left-0 bg-primary text-[8px] font-bold text-white px-2 py-0.5 uppercase tracking-tighter">Featured</div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg leading-tight">{item.name}</h3>
                          <span className="text-primary font-bold">€{item.price}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <button className="text-muted-foreground hover:text-white transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button className="text-muted-foreground hover:text-red-500 transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                          <button className="text-muted-foreground hover:text-primary transition-colors" title={item.isAvailable ? "Mark Unavailable" : "Mark Available"}>
                            {item.isAvailable ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-primary/60">{item.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
