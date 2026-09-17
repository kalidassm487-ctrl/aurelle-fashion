import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen animate-fade-in">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs tracking-wide-luxe uppercase text-[#e8e6e3]/60 hover:text-gold transition-colors mb-10"
        >
          <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-20">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[3/4] overflow-hidden border transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-gold opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 aspect-[3/4] overflow-hidden bg-[#1a1a1a]">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
                key={selectedImage}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start lg:pt-8">
            <p className="text-xs tracking-wide-luxe uppercase text-gold mb-3">
              {product.collection} Collection
            </p>
            <h1 className="font-serif-display text-4xl lg:text-5xl font-light text-[#e8e6e3] mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-[#e8e6e3] font-light mb-8">
              ${product.price.toLocaleString()}
            </p>

            <p className="text-sm text-[#e8e6e3]/60 leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-8">
              <p className="text-xs tracking-wide-luxe uppercase text-[#e8e6e3]/50 mb-3">
                Color — {selectedColor}
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color.name
                        ? 'border-gold scale-110'
                        : 'border-[#e8e6e3]/20 hover:border-[#e8e6e3]/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className="text-xs tracking-wide-luxe uppercase text-[#e8e6e3]/50 mb-3">
                Size {selectedSize && `— ${selectedSize}`}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-4 py-3 text-sm tracking-wide border transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-gold text-[#0a0a0a] border-gold'
                        : 'border-[#e8e6e3]/20 text-[#e8e6e3]/70 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className={`flex items-center justify-center gap-3 py-4 text-xs tracking-wide-luxe uppercase transition-all duration-500 ${
                !selectedSize
                  ? 'bg-[#1a1a1a] text-[#e8e6e3]/30 border border-[#e8e6e3]/10 cursor-not-allowed'
                  : added
                  ? 'bg-green-800 text-[#e8e6e3] border border-green-700'
                  : 'bg-gold text-[#0a0a0a] hover:bg-[#b89855]'
              }`}
            >
              {added ? (
                <>
                  <Check size={16} /> Added to Bag
                </>
              ) : !selectedSize ? (
                'Select a Size'
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Bag
                </>
              )}
            </button>

            {/* Details */}
            <div className="mt-12 border-t border-[#e8e6e3]/10 pt-8">
              <h3 className="text-xs tracking-wide-luxe uppercase text-[#e8e6e3]/50 mb-4">
                Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#e8e6e3]/60">
                    <span className="text-gold mt-1">—</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
