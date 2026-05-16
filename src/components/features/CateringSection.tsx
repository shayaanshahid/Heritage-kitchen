"use client";

import { motion } from 'framer-motion';
import { Utensils, Star, Heart } from 'lucide-react';
import Link from 'next/link';

const CateringSection = () => {
  return (
    <section id="catering" className="section-padding bg-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-muted rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200" 
                alt="Catering Service" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Float badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 shadow-2xl hidden md:block">
              <span className="text-4xl font-serif text-white block">15+</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/80">Years of Excellence</span>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Elevate Your Events</h4>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Bespoke Catering <br />& Private Events</h2>
              <div className="divider" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                From intimate dinner parties to large-scale corporate galas, Heritage Kitchen brings the art of Fusion South East Asian cuisine to your venue. Our culinary team crafts unique menus tailored to your specific needs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center space-x-3">
                  <Utensils className="text-primary w-5 h-5" />
                  <span className="text-sm font-medium">Customized Menus</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="text-primary w-5 h-5" />
                  <span className="text-sm font-medium">Professional Staff</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="text-primary w-5 h-5" />
                  <span className="text-sm font-medium">Attention to Detail</span>
                </div>
              </div>

              <Link 
                href="/catering-inquiry" 
                className="inline-block bg-primary text-white px-12 py-4 font-bold tracking-widest uppercase hover:bg-primary/90 transition-all rounded-sm"
              >
                Inquire Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
