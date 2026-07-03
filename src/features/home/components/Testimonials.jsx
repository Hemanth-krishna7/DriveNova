import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Alexander Vance',
    role: 'Private Collector',
    avatarLetter: 'A',
    avatarGradient: 'linear-gradient(135deg, #ef4444 0%, #7f1d1d 100%)',
    rating: 5,
    review: 'Absolutely unmatched. The delivery of the SF90 Spider directly to the private hangar was seamless. The vehicle was in showroom condition. The standard of service is pure luxury.'
  },
  {
    name: 'Elena Rostova',
    role: 'Tech Executive',
    avatarLetter: 'E',
    avatarGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    rating: 5,
    review: 'DriveNova is my definitive choice when visiting California. The Revuelto was a masterpiece, and their concierge team provided incredible bespoke route recommendations.'
  },
  {
    name: 'Marcus Sterling',
    role: 'Real Estate Investor',
    avatarLetter: 'M',
    avatarGradient: 'linear-gradient(135deg, #10b981 0%, #064e3b 100%)',
    rating: 5,
    review: 'From onboarding to return, the experience was flawless. The digital verification takes minutes, and having the concierge team available 24/7 offers complete peace of mind.'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#070707] border-t border-zinc-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-red-950/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
            Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-outfit uppercase m-0 leading-tight">
            Client Voices
          </h2>
          <p className="text-zinc-500 font-light text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Read experiences from our discerning club members who trust us to deliver exceptional road machines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              className="bg-zinc-950/80 border border-zinc-900/80 p-8 rounded-lg flex flex-col justify-between"
              whileHover={{ 
                y: -4, 
                borderColor: 'rgba(255, 255, 255, 0.08)' 
              }}
              transition={{ duration: 0.3 }}
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-zinc-300 font-light text-sm md:text-base leading-relaxed m-0 italic">
                  "{t.review}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-900/60">
                {/* Avatar Placeholder */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold font-outfit shadow-inner"
                  style={{ background: t.avatarGradient }}
                >
                  {t.avatarLetter}
                </div>
                
                <div>
                  <h4 className="text-sm font-bold text-white font-outfit uppercase m-0 tracking-wide">
                    {t.name}
                  </h4>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mt-0.5">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
