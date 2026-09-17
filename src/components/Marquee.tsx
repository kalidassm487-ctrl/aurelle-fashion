export default function Marquee() {
  const items = [
    'Complimentary Shipping Over $500',
    'Crafted in Italy',
    'Wear What\'s Next',
    'New Autumn / Winter 2026',
    'Sustainable Luxury',
    'Made to Last',
  ];

  return (
    <div className="bg-gold py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[#0a0a0a] text-xs tracking-wide-luxe uppercase mx-8 flex items-center gap-8"
          >
            {item}
            <span className="text-[#0a0a0a]/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
