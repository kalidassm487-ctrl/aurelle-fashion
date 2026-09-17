import { Plus } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onProductClick, onQuickAdd, index = 0 }: ProductCardProps) {
  return (
    <div
      className="group cursor-pointer animate-fade-up"
      style={{ animationDelay: `${(index % 4) * 0.1}s`, opacity: 0 }}
      onClick={() => onProductClick(product)}
    >
      {/* Image */}
      <div className="relative img-zoom aspect-[3/4] bg-[#1a1a1a] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-gold text-[#0a0a0a] text-[10px] tracking-wide-luxe uppercase px-3 py-1">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#0a0a0a]/80 text-gold text-[10px] tracking-wide-luxe uppercase px-3 py-1 border border-gold/30">
              Bestseller
            </span>
          )}
        </div>
        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="w-full bg-[#0a0a0a]/90 backdrop-blur-sm border border-[#e8e6e3]/20 text-[#e8e6e3] text-xs tracking-wide-luxe uppercase py-3 hover:bg-gold hover:text-[#0a0a0a] hover:border-gold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <p className="text-[10px] tracking-wide-luxe uppercase text-[#e8e6e3]/40 mb-1">
            {product.subcategory}
          </p>
          <h3 className="font-serif-display text-lg text-[#e8e6e3] group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-[#e8e6e3] font-light">
            ${product.price.toLocaleString()}
          </p>
          {product.originalPrice && (
            <p className="text-xs text-[#e8e6e3]/40 line-through">
              ${product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
