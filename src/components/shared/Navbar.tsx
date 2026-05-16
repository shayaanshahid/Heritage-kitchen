"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About',        href: '#about' },
    { label: 'Menu',         href: '#menu' },
    { label: 'Location',     href: '#location' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#f5ede0]/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className={`font-serif font-bold text-2xl transition-colors ${scrolled ? 'text-[#4a5e32]' : 'text-[#f5ede0]'}`}>
              Heritage
            </span>
            <span className={`text-[9px] tracking-[4px] uppercase transition-colors ${scrolled ? 'text-[#4a5e32]' : 'text-[#e8d9b5]'}`}>
              Kitchen
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:rounded after:transition-all hover:after:w-full ${
                  scrolled
                    ? 'text-[#4a5035] hover:text-[#4a5e32] after:bg-[#6b7c4a]'
                    : 'text-[#f5ede0]/90 hover:text-[#f5ede0] after:bg-[#e8d9b5]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservations"
              className={`text-sm font-medium px-5 py-2 rounded-full border transition-all ${
                scrolled
                  ? 'border-[#6b7c4a] text-[#6b7c4a] hover:bg-[#6b7c4a] hover:text-[#e8d9b5]'
                  : 'border-[#e8d9b5]/60 text-[#f5ede0] hover:bg-[#e8d9b5]/15 hover:border-[#e8d9b5]'
              }`}
            >
              Book a Table
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className={`md:hidden p-2 transition-colors ${scrolled ? 'text-[#4a5e32]' : 'text-[#f5ede0]'}`}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#f5ede0] z-[200] flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 text-[#4a5e32]"
          >
            <X size={28} />
          </button>
          {[...navLinks, { label: 'Reservations', href: '#reservations' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl text-[#4a5e32] hover:text-[#6b7c4a] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
