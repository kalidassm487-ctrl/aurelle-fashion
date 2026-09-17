import { Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import type { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const columns = [
    {
      title: 'Shop',
      links: ['Women', 'Men', 'Accessories', 'New Arrivals', 'Bestsellers'],
    },
    {
      title: 'Maison',
      links: ['About AURELLE', 'Sustainability', 'Craftsmanship', 'Careers', 'Press'],
    },
    {
      title: 'Client Care',
      links: ['Shipping & Returns', 'Size Guide', 'Care Guide', 'FAQ', 'Contact Us'],
    },
  ];

  return (
    <footer className="bg-[#070707] border-t border-[#e8e6e3]/10 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-serif-display text-3xl tracking-luxe text-[#e8e6e3] mb-4">AURELLE</h2>
            <p className="text-sm text-[#e8e6e3]/40 leading-relaxed mb-6 max-w-xs">
              Wear what's next. A modern fashion house crafting timeless luxury in Italy.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-[#e8e6e3]/20 flex items-center justify-center text-[#e8e6e3]/60 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <Icon size={16} strokeWidth={1.2} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs tracking-wide-luxe uppercase text-gold mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => onNavigate('shop')}
                      className="text-sm text-[#e8e6e3]/50 hover:text-[#e8e6e3] transition-colors flex items-center gap-1 group"
                    >
                      {link}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[#e8e6e3]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#e8e6e3]/30">
            © 2026 AURELLE. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-xs text-[#e8e6e3]/30 hover:text-gold transition-colors">Privacy Policy</button>
            <button className="text-xs text-[#e8e6e3]/30 hover:text-gold transition-colors">Terms of Service</button>
            <button className="text-xs text-[#e8e6e3]/30 hover:text-gold transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
