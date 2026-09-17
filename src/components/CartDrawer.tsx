import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onRemove: (index: number) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0a0a]/70 backdrop-blur-sm z-[70] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a0a0a] z-[80] border-l border-[#e8e6e3]/10 transition-transform duration-500 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e8e6e3]/10">
          <h2 className="font-serif-display text-2xl text-[#e8e6e3] flex items-center gap-3">
            <ShoppingBag size={20} strokeWidth={1.2} /> Shopping Bag
          </h2>
          <button onClick={onClose} className="text-[#e8e6e3]/60 hover:text-gold transition-colors">
            <X size={24} strokeWidth={1.2} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} strokeWidth={0.8} className="text-[#e8e6e3]/20 mb-6" />
              <p className="font-serif-display text-xl text-[#e8e6e3]/50 mb-2">Your bag is empty</p>
              <p className="text-sm text-[#e8e6e3]/30">Discover something extraordinary.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 animate-slide-in-right">
                  <div className="w-24 h-32 overflow-hidden bg-[#1a1a1a] flex-shrink-0">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-display text-lg text-[#e8e6e3]">{item.product.name}</h3>
                      <p className="text-xs text-[#e8e6e3]/40 mt-1">
                        {item.color} / {item.size}
                      </p>
                      <p className="text-sm text-gold mt-2">${item.product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-[#e8e6e3]/20">
                        <button
                          onClick={() => onUpdateQty(index, -1)}
                          className="p-1.5 text-[#e8e6e3]/60 hover:text-gold transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm text-[#e8e6e3] w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(index, 1)}
                          className="p-1.5 text-[#e8e6e3]/60 hover:text-gold transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(index)}
                        className="text-xs tracking-wide uppercase text-[#e8e6e3]/30 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#e8e6e3]/10 p-6 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs tracking-wide-luxe uppercase text-[#e8e6e3]/50">Subtotal</span>
              <span className="font-serif-display text-2xl text-[#e8e6e3]">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#e8e6e3]/30">Shipping and taxes calculated at checkout.</p>
            <button className="w-full bg-gold text-[#0a0a0a] py-4 text-xs tracking-wide-luxe uppercase hover:bg-[#b89855] transition-colors flex items-center justify-center gap-3 group">
              Proceed to Checkout
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
