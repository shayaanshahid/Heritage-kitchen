"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Dark green gradient overlay — matches legacy */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(160deg, rgba(30,40,18,0.82) 0%, rgba(74,94,50,0.60) 50%, rgba(30,40,18,0.75) 100%)'
        }}
      />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000")',
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1
            className="font-serif font-bold leading-tight mb-6"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              color: '#f5ede0',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            Fusion South East Asian<br />Restaurant
          </h1>

          <p
            className="mb-10 tracking-wide"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(232,217,181,0.85)',
              lineHeight: 1.9
            }}
          >
            Now Open For<br />
            <span className="font-serif italic text-[#e8d9b5] text-[1.15em] tracking-[2px]">
              Brunch • Lunch • Dinner
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#reservations"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)',
                color: '#e8d9b5',
                boxShadow: '0 2px 16px rgba(74,94,50,0.3)',
              }}
            >
              Reserve Your Table
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5 hover:bg-white/15"
              style={{
                color: '#f5ede0',
                border: '2px solid rgba(232,217,181,0.55)',
                backdropFilter: 'blur(4px)',
              }}
            >
              View Menu
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, #c8b99a, transparent)' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
