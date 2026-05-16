"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer style={{ background: '#1e2215', color: '#e8d9b5' }} className="pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-serif font-bold text-2xl" style={{ color: '#e8d9b5' }}>Heritage</span>
              <span className="text-[9px] tracking-[4px] uppercase -mt-0.5" style={{ color: '#c8b99a' }}>Kitchen</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(232,217,181,0.65)' }}>
              A culinary journey through South East Asia, served with elegance in Brussels.
            </p>
            <div className="flex gap-3">
              {['Globe', 'Share', 'Camera'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-xs"
                  style={{
                    background: 'rgba(232,217,181,0.08)',
                    border: '1px solid rgba(232,217,181,0.15)',
                    color: '#c8b99a',
                  }}
                >
                  ●
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-5" style={{ color: '#e8d9b5' }}>Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Menu', href: '#menu' },
                { label: 'Reservations', href: '#reservations' },
                { label: 'Catering', href: '#catering' },
                { label: 'Location', href: '#location' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(232,217,181,0.65)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e8d9b5')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,217,181,0.65)')}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-5" style={{ color: '#e8d9b5' }}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm" style={{ color: 'rgba(232,217,181,0.65)' }}>
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: '#8a9c6a' }} />
                <span>Koloniënstraat 6, 1000 Brussels, Belgium</span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,217,181,0.65)' }}>
                <Phone size={15} className="shrink-0" style={{ color: '#8a9c6a' }} />
                <span>+32 2 123 45 67</span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: 'rgba(232,217,181,0.65)' }}>
                <Mail size={15} className="shrink-0" style={{ color: '#8a9c6a' }} />
                <span>info@heritagekitchen.be</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 text-center text-xs"
          style={{ borderTop: '1px solid rgba(232,217,181,0.1)', color: 'rgba(232,217,181,0.4)' }}
        >
          © {year || 2024} Heritage Kitchen. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
