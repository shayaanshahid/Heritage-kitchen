"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MenuItem = {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
};

const categories = ['STARTERS', 'MAINS', 'DESSERTS', 'BRUNCH'];

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('STARTERS');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
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
    fetchMenu();
  }, []);

  const filteredItems = items.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="section-padding" style={{ background: '#f5ede0' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-3" style={{ color: '#4a5e32' }}>
            Our Menu
          </h2>
          <div className="divider" />
          <p className="mt-4 max-w-xl mx-auto text-sm" style={{ color: '#7a8060', fontSize: '1.05rem' }}>
            A harmonious blend of authentic South East Asian flavors, elevated for the modern palate.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-7 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all"
              style={
                activeCategory === cat
                  ? {
                      background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)',
                      color: '#e8d9b5',
                      border: '1.5px solid transparent',
                      boxShadow: '0 2px 12px rgba(74,94,50,0.2)',
                    }
                  : {
                      background: 'transparent',
                      color: '#6b7c4a',
                      border: '1.5px solid #6b7c4a',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="min-h-[360px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse rounded-xl h-28" style={{ background: '#e8d9b5' }} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="text-center py-20 italic" style={{ color: '#7a8060' }}>
              No items in this category yet.
            </p>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id || item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="group flex gap-6 items-start"
                  >
                    {item.image && (
                      <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-[#6b7c4a]/10">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4 mb-1">
                        <h3 className="font-serif text-lg leading-tight text-[#4a5e32] group-hover:text-[#6b7c4a] transition-colors">
                          {item.name}
                        </h3>
                        <div className="flex-1 border-b border-dashed border-[#6b7c4a]/20 mx-2 mb-1" />
                        <span className="font-semibold text-[#6b7c4a]">
                          €{item.price}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#7a8060] line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
