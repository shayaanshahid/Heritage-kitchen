"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Background Image Placeholder (until real image provided) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110 motion-safe:animate-slow-zoom"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000")',
          backgroundAttachment: 'fixed'
        }}
      />

      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
            Fusion <span className="text-primary italic">South East Asian</span><br />Restaurant
          </h1>
          
          <p className="text-xl md:text-2xl text-accent/90 mb-10 font-sans tracking-wide">
            Now Open For <span className="text-white border-b border-primary/50">Brunch • Lunch • Dinner</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="#reservations" 
              className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-sm text-lg font-medium transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              Reserve Your Table
            </Link>
            <Link 
              href="#menu" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-10 py-4 rounded-sm text-lg font-medium transition-all w-full sm:w-auto"
            >
              View Menu
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-2">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
