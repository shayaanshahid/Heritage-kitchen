"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Share2, Camera } from 'lucide-react';

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex flex-col items-start group">
              <span className="text-3xl font-serif font-bold text-primary">Heritage</span>
              <span className="text-[10px] tracking-[0.3em] font-sans uppercase -mt-1 opacity-80">Kitchen</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A culinary journey through South East Asia, served with elegance in Brussels. Join us for a unique dining experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors">
                <Camera className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="#menu" className="hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="#reservations" className="hover:text-primary transition-colors">Reservations</Link></li>
              <li><Link href="#catering" className="hover:text-primary transition-colors">Catering</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Koloniënstraat 6, 1000 Brussels, Belgium</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+32 2 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@heritagekitchen.be</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe for seasonal updates and events.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-muted border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
          <p>© {year || 2024} Heritage Kitchen. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
