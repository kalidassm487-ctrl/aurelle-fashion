import { useState } from 'react';
import { lookbookImages } from '../data';
import { X } from 'lucide-react';

export default function Lookbook() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-luxe uppercase text-gold mb-4 animate-fade-up">Editorial</p>
          <h2 className="font-serif-display text-4xl lg:text-6xl font-light text-[#e8e6e3] animate-fade-up delay-100">
            The Lookbook
          </h2>
          <p className="mt-4 text-sm text-[#e8e6e3]/50 max-w-lg mx-auto animate-fade-up delay-200">
            A visual journey through the AURELLE universe — where fashion becomes art.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {lookbookImages.map((img, index) => (
            <div
              key={index}
              className={`group cursor-pointer overflow-hidden bg-[#1a1a1a] animate-fade-up ${
                index % 3 === 0 ? 'aspect-[3/4]' : index % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[3/4]'
              }`}
              style={{ animationDelay: `${(index % 3) * 0.1}s`, opacity: 0 }}
              onClick={() => setSelected(index)}
            >
              <div className="relative w-full h-full img-zoom">
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] tracking-wide-luxe uppercase text-gold mb-1">{img.category}</p>
                  <h3 className="font-serif-display text-2xl text-[#e8e6e3]">{img.caption}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[90] bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#e8e6e3]/60 hover:text-gold transition-colors"
            onClick={() => setSelected(null)}
          >
            <X size={32} strokeWidth={1} />
          </button>
          <div className="max-w-3xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img
              src={lookbookImages[selected].url}
              alt={lookbookImages[selected].caption}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-6">
              <p className="text-xs tracking-wide-luxe uppercase text-gold mb-2">
                {lookbookImages[selected].category}
              </p>
              <h3 className="font-serif-display text-3xl text-[#e8e6e3]">
                {lookbookImages[selected].caption}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
