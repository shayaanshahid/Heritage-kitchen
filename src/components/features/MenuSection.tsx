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
        setItems(data);
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
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id || item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="group relative overflow-hidden rounded-xl transition-all"
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(107,124,74,0.12)',
                      padding: '28px 32px',
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: '0 8px 40px rgba(74,94,50,0.15)',
                    }}
                  >
                    {/* Left accent bar */}
                    <div
                      className="absolute top-0 left-0 w-1 transition-all duration-300 rounded-l-xl"
                      style={{
                        height: '0%',
                        background: 'linear-gradient(180deg, #6b7c4a, #4a5e32)',
                      }}
                    />
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-serif text-lg leading-snug" style={{ color: '#4a5e32' }}>
                        {item.name}
                      </h3>
                      <span className="font-semibold shrink-0 mt-0.5" style={{ color: '#6b7c4a', fontSize: '1.05rem' }}>
                        €{item.price}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: '#7a8060' }}>
                      {item.description}
                    </p>
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
