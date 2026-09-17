import { ArrowRight } from 'lucide-react';
import type { View } from '../types';
import { collections } from '../data';

interface CollectionsProps {
  onNavigate: (view: View) => void;
}

export default function Collections({ onNavigate }: CollectionsProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-luxe uppercase text-gold mb-4 animate-fade-up">Curated</p>
          <h2 className="font-serif-display text-4xl lg:text-6xl font-light text-[#e8e6e3] animate-fade-up delay-100">
            The Collections
          </h2>
        </div>

        {/* Collection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((col, index) => (
            <div
              key={col.name}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
              onClick={() => onNavigate('shop')}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a] img-zoom">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-[10px] tracking-wide-luxe uppercase text-gold mb-2">
                    {col.subtitle}
                  </p>
                  <h3 className="font-serif-display text-3xl lg:text-4xl text-[#e8e6e3] mb-3">
                    {col.name}
                  </h3>
                  <p className="text-sm text-[#e8e6e3]/60 leading-relaxed mb-4 max-w-xs">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs tracking-wide-luxe uppercase text-[#e8e6e3]/80 group-hover:text-gold transition-colors">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
