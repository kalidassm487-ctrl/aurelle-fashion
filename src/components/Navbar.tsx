import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { View } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (view: View) => void;
  currentView: View;
}

export default function Navbar({ cartCount, onCartClick, onNavigate, currentView }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: View }[] = [
    { label: 'Women', view: 'shop' },
    { label: 'Men', view: 'shop' },
    { label: 'Accessories', view: 'shop' },
    { label: 'Collections', view: 'collection' },
    { label: 'Lookbook', view: 'lookbook' },
    { label: 'About', view: 'about' },
  ];

  const handleNav = (view: View) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 shadow-lg shadow-black/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.view)}
                className={`text-xs tracking-wide-luxe uppercase link-underline transition-colors ${
                  currentView === link.view ? 'text-gold' : 'text-[#e8e6e3]/80 hover:text-[#e8e6e3]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="font-serif-display text-2xl lg:text-3xl tracking-luxe font-light text-[#e8e6e3] hover:text-gold transition-colors duration-300"
          >
            AURELLE
          </button>

          {/* Right nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(3).map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.view)}
                className={`text-xs tracking-wide-luxe uppercase link-underline transition-colors ${
                  currentView === link.view ? 'text-gold' : 'text-[#e8e6e3]/80 hover:text-[#e8e6e3]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button className="text-[#e8e6e3]/80 hover:text-gold transition-colors">
              <Search size={18} strokeWidth={1.2} />
            </button>
            <button
              onClick={onCartClick}
              className="relative text-[#e8e6e3]/80 hover:text-gold transition-colors group"
            >
              <ShoppingBag size={18} strokeWidth={1.2} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-[#0a0a0a] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative text-[#e8e6e3]/80 hover:text-gold transition-colors"
            >
              <ShoppingBag size={20} strokeWidth={1.2} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-[#0a0a0a] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="text-[#e8e6e3]/80 hover:text-gold transition-colors"
            >
              <Menu size={24} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0a0a0a] animate-fade-in lg:hidden">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-[#e8e6e3]/80 hover:text-gold transition-colors"
            >
              <X size={28} strokeWidth={1.2} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 mt-20">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.view)}
                className="font-serif-display text-3xl tracking-wide text-[#e8e6e3]/90 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('home')}
              className="font-serif-display text-3xl tracking-luxe text-gold mt-8"
            >
              AURELLE
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
