import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import type { View } from '../types';
import { heroImages } from '../data';

interface HeroProps {
  onNavigate: (view: View) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background images */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt="AURELLE fashion editorial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-xs tracking-luxe uppercase text-gold mb-6 animate-fade-up delay-100">
          Autumn / Winter 2026
        </p>
        <h1 className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-light text-[#f5f0e8] tracking-wide animate-fade-up delay-300">
          Wear What's
          <br />
          <span className="italic text-gold">Next</span>
        </h1>
        <p className="mt-8 max-w-md text-sm md:text-base text-[#e8e6e3]/70 font-light leading-relaxed animate-fade-up delay-500">
          A new vocabulary of luxury. Crafted in Italy, worn by those who
          shape what comes next.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up delay-700">
          <button
            onClick={() => onNavigate('shop')}
            className="group flex items-center gap-3 bg-transparent border border-[#e8e6e3]/30 px-10 py-4 text-xs tracking-wide-luxe uppercase text-[#e8e6e3] hover:bg-gold hover:border-gold hover:text-[#0a0a0a] transition-all duration-500"
          >
            Discover the Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('lookbook')}
            className="group flex items-center gap-3 bg-transparent border border-[#e8e6e3]/30 px-10 py-4 text-xs tracking-wide-luxe uppercase text-[#e8e6e3] hover:border-gold hover:text-gold transition-all duration-500"
          >
            View Lookbook
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-luxe uppercase text-[#e8e6e3]/40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-10 right-10 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-px transition-all duration-500 ${
              index === currentImage ? 'w-12 bg-gold' : 'w-6 bg-[#e8e6e3]/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
