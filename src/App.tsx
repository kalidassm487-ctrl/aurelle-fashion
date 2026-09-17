import { useState, useEffect } from 'react';
import type { Product, CartItem, View } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Collections from './components/Collections';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Lookbook from './components/Lookbook';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [shopCategory, setShopCategory] = useState<string>('All');

  const navigate = (newView: View) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, size: string, color: string) => {
    setCartItems((prev) => {
      const existing = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, color, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, product.sizes[0], product.colors[0].name);
  };

  const handleUpdateQty = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity += delta;
      if (updated[index].quantity <= 0) {
        updated.splice(index, 1);
      }
      return updated;
    });
  };

  const handleRemove = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNavWithCategory = (category: string) => {
    setShopCategory(category);
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Render different views
  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <>
            <Hero onNavigate={navigate} />
            <Marquee />
            <Collections onNavigate={navigate} />
            <FeaturedProducts onProductClick={handleProductClick} onQuickAdd={handleQuickAdd} />
            <Lookbook />
            <Newsletter />
          </>
        );
      case 'shop':
        return (
          <Shop
            onProductClick={handleProductClick}
            onQuickAdd={handleQuickAdd}
            initialCategory={shopCategory}
          />
        );
      case 'product':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => navigate('shop')}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <Shop onProductClick={handleProductClick} onQuickAdd={handleQuickAdd} />
        );
      case 'collection':
        return (
          <>
            <Collections onNavigate={navigate} />
            <Newsletter />
          </>
        );
      case 'lookbook':
        return (
          <>
            <Lookbook />
            <Newsletter />
          </>
        );
      case 'about':
        return (
          <>
            <About onNavigate={navigate} />
            <Newsletter />
          </>
        );
      default:
        return <Hero onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onNavigate={navigate}
        currentView={view}
      />

      {renderView()}

      <Footer onNavigate={navigate} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />
    </div>
  );
}

// Inline featured products section for home page
import { products } from './data';
import ProductCard from './components/ProductCard';

function FeaturedProducts({
  onProductClick,
  onQuickAdd,
}: {
  onProductClick: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}) {
  const featured = products.filter((p) => p.isNew || p.isBestseller).slice(0, 4);

  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-xs tracking-luxe uppercase text-gold mb-4 animate-fade-up">Selected</p>
          <h2 className="font-serif-display text-4xl lg:text-6xl font-light text-[#e8e6e3] animate-fade-up delay-100">
            Featured Pieces
          </h2>
          <p className="mt-4 text-sm text-[#e8e6e3]/50 max-w-md mx-auto animate-fade-up delay-200">
            A curated selection from our latest collections — the most coveted pieces of the season.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={onProductClick}
              onQuickAdd={onQuickAdd}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
