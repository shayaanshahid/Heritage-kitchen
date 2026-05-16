"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <section id="menu" className="section-padding bg-secondary text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Menu</h2>
            <div className="divider mx-auto" />
            <p className="max-w-2xl mx-auto text-muted-foreground">
              A harmonious blend of authentic South East Asian flavors, elevated for the modern palate.
            </p>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-sm transition-all text-sm tracking-widest font-medium uppercase",
                activeCategory === cat 
                  ? "bg-primary text-white" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-muted h-32 rounded-sm" />
              ))}
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id || item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group"
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-xl font-serif text-white group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-primary font-medium">€{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
