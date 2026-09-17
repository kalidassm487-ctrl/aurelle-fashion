import { useState } from 'react';
import { Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#0f0f0f] border-t border-[#e8e6e3]/5">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs tracking-luxe uppercase text-gold mb-4 animate-fade-up">Join AURELLE</p>
        <h2 className="font-serif-display text-4xl lg:text-5xl font-light text-[#e8e6e3] mb-4 animate-fade-up delay-100">
          Be the First to Know
        </h2>
        <p className="text-sm text-[#e8e6e3]/50 mb-10 max-w-md mx-auto animate-fade-up delay-200">
          Receive private invitations, early access to new collections, and stories from the atelier.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto animate-fade-up delay-300">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-transparent border border-[#e8e6e3]/20 px-5 py-4 text-sm text-[#e8e6e3] placeholder:text-[#e8e6e3]/30 focus:border-gold focus:outline-none transition-colors"
          />
          <button
            type="submit"
            className={`px-8 py-4 text-xs tracking-wide-luxe uppercase transition-all duration-500 ${
              subscribed
                ? 'bg-green-800 text-[#e8e6e3] border border-green-700'
                : 'bg-gold text-[#0a0a0a] hover:bg-[#b89855]'
            }`}
          >
            {subscribed ? (
              <span className="flex items-center gap-2">
                <Check size={14} /> Subscribed
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
        <p className="mt-6 text-xs text-[#e8e6e3]/30">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </section>
  );
}
