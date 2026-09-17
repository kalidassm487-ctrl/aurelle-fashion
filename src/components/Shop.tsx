import { useState, useMemo } from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';
import type { Product } from '../types';
import { products } from '../data';
import ProductCard from './ProductCard';

interface ShopProps {
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  initialCategory?: string;
}

export default function Shop({ onProductClick, onQuickAdd, initialCategory }: ShopProps) {
  const [category, setCategory] = useState<string>(initialCategory || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Women', 'Men', 'Accessories'];

  const filtered = useMemo(() => {
    let result = category === 'All' ? products : products.filter((p) => p.category === category);
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'new') result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return result;
  }, [category, sortBy]);

  return (
    <div className="pt-24 pb-20 min-h-screen animate-fade-in">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs tracking-luxe uppercase text-gold mb-4">The Collection</p>
          <h1 className="font-serif-display text-4xl lg:text-6xl font-light text-[#e8e6e3]">
            {category === 'All' ? 'All Pieces' : category}
          </h1>
          <p className="mt-3 text-sm text-[#e8e6e3]/40">{filtered.length} items</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 border-b border-[#e8e6e3]/10 pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 text-xs tracking-wide-luxe uppercase transition-all duration-300 ${
                  category === cat
                    ? 'bg-gold text-[#0a0a0a]'
                    : 'text-[#e8e6e3]/50 hover:text-gold border border-[#e8e6e3]/10 hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs tracking-wide-luxe uppercase text-[#e8e6e3]/50 hover:text-gold transition-colors"
            >
              <SlidersHorizontal size={14} /> Sort
            </button>
            {showFilters && (
              <div className="flex gap-2 animate-fade-in">
                {[
                  { key: 'featured', label: 'Featured' },
                  { key: 'new', label: 'New' },
                  { key: 'price-low', label: 'Price ↑' },
                  { key: 'price-high', label: 'Price ↓' },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setSortBy(option.key)}
                    className={`flex items-center gap-1 px-3 py-2 text-xs transition-colors ${
                      sortBy === option.key ? 'text-gold' : 'text-[#e8e6e3]/40 hover:text-[#e8e6e3]'
                    }`}
                  >
                    {sortBy === option.key && <Check size={12} />}
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onQuickAdd={onQuickAdd}
              index={index}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif-display text-2xl text-[#e8e6e3]/40">No items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
