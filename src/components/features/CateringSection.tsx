"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

const events = [
  { title: 'Weddings', desc: 'A memorable feast for your most important day, tailored to your vision.', emoji: '💍' },
  { title: 'Corporate', desc: 'Impress clients and teams with premium South East Asian cuisine.', emoji: '🏢' },
  { title: 'Private Dinners', desc: "Exclusive chef's table experiences for intimate groups.", emoji: '🕯️' },
];

const CateringSection = () => {
  return (
    <section id="catering" className="section-padding" style={{ background: '#f5ede0' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-3" style={{ color: '#4a5e32' }}>
            Catering & Events
          </h2>
          <div className="divider" />
          <p className="mt-4 max-w-xl mx-auto" style={{ color: '#7a8060', fontSize: '1.05rem' }}>
            Let us bring Heritage Kitchen to your special occasion — from intimate dinners to large corporate events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {events.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl p-8 text-center transition-all hover:-translate-y-1"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(107,124,74,0.12)',
                boxShadow: '0 2px 16px rgba(74,94,50,0.06)',
              }}
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="font-serif text-xl mb-3" style={{ color: '#4a5e32' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7a8060' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/catering-inquiry"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-medium text-sm tracking-wide transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #6b7c4a, #4a5e32)',
              color: '#e8d9b5',
              boxShadow: '0 2px 16px rgba(74,94,50,0.25)',
            }}
          >
            <UtensilsCrossed size={16} />
            Submit a Catering Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
