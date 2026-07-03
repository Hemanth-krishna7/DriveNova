import { motion } from 'framer-motion';
import { Gem, CalendarCheck, Headphones, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: <Gem className="w-8 h-8 text-red-500" />,
    title: 'Premium Fleet',
    description: 'Curated selection of the world\'s most coveted hypercars, supercars, and premium SUVs maintained to pristine standards.'
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-red-500" />,
    title: 'Instant Booking',
    description: 'Seamless digital reservation process with instant verification and flexible white-glove delivery to your doorstep.'
  },
  {
    icon: <Headphones className="w-8 h-8 text-red-500" />,
    title: '24/7 Concierge',
    description: 'Dedicated personal concierge service for on-road assistance, custom route planning, and bespoke delivery requests.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    title: 'Fully Insured',
    description: 'Comprehensive tailored insurance coverage specifically designed for ultra-high-performance luxury vehicles.'
  }
];

export default function WhyDriveNova() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#070707] border-t border-zinc-950 relative overflow-hidden">
      {/* Background decoration grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
            Why DriveNova
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-outfit uppercase m-0 leading-tight">
            The Pinnacle of Driving Services
          </h2>
          <div className="w-16 h-0.5 bg-red-600 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              className="group relative bg-zinc-950/60 border border-zinc-900/60 p-8 rounded-lg transition-colors duration-300"
              whileHover={{ 
                borderColor: 'rgba(239, 68, 68, 0.25)',
                backgroundColor: 'rgba(10, 10, 10, 0.8)'
              }}
            >
              {/* Icon Container with subtle pulse hover */}
              <div className="w-16 h-16 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-red-950 group-hover:bg-red-950/20 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-tight mb-3 font-outfit uppercase">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 font-light text-sm leading-relaxed m-0">
                {feature.description}
              </p>

              {/* Left edge gradient accent bar */}
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-red-600 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 rounded-l" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
