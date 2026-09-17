import type { View } from '../types';

interface AboutProps {
  onNavigate: (view: View) => void;
}

export default function About({ onNavigate }: AboutProps) {
  return (
    <div className="pt-24 pb-20 min-h-screen animate-fade-in">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5531541/pexels-photo-5531541.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800"
          alt="AURELLE atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 to-[#0a0a0a]/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-xs tracking-luxe uppercase text-gold mb-4 animate-fade-up">The Maison</p>
            <h1 className="font-serif-display text-5xl lg:text-7xl font-light text-[#e8e6e3] animate-fade-up delay-100">
              The House of AURELLE
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs tracking-luxe uppercase text-gold mb-4">Est. 2026</p>
          <h2 className="font-serif-display text-3xl lg:text-4xl font-light text-[#e8e6e3] mb-6">
            A New Vocabulary of Luxury
          </h2>
        </div>

        <div className="space-y-6 text-sm lg:text-base text-[#e8e6e3]/60 leading-relaxed">
          <p>
            AURELLE was born from a singular conviction: that fashion should not merely follow
            trends, but define what comes next. Each piece is conceived in our Milan atelier,
            where master artisans translate vision into form.
          </p>
          <p>
            We believe in the quiet power of restraint — that true luxury whispers rather than
            shouts. Our garments are sculpted from the finest materials sourced from heritage
            mills across Italy and France, each piece a testament to the hands that shaped it.
          </p>
          <p>
            From the bias-cut silk of our Nocturne collection to the architectural tailoring of
            Atelier and the modern precision of Monsieur, AURELLE dresses those who do not wait
            for permission to lead.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { title: 'Craftsmanship', text: 'Every garment is constructed by hand in Italy, honoring centuries of tailoring tradition.' },
            { title: 'Sustainability', text: 'We source responsibly, produce in limited runs, and design for permanence over seasonality.' },
            { title: 'Vision', text: 'We create not for the moment, but for the future — pieces that outlast the trend cycle.' },
          ].map((value, i) => (
            <div
              key={i}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }}
            >
              <h3 className="font-serif-display text-2xl text-gold mb-3">{value.title}</h3>
              <p className="text-sm text-[#e8e6e3]/50 leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <button
            onClick={() => onNavigate('shop')}
            className="border border-[#e8e6e3]/30 px-10 py-4 text-xs tracking-wide-luxe uppercase text-[#e8e6e3] hover:bg-gold hover:border-gold hover:text-[#0a0a0a] transition-all duration-500"
          >
            Explore the Collections
          </button>
        </div>
      </div>
    </div>
  );
}
