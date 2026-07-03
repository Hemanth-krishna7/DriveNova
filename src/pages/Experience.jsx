import { motion } from 'framer-motion';
import { Shield, Sparkles, MapPin, Compass, Award, Star } from 'lucide-react';

export default function Experience() {
  const programs = [
    {
      title: 'Airport Transfers',
      description: 'VVIP tarmac collections with synchronized luggage transfer. Slide directly from your private aircraft cabin into your pre-conditioned hypercar.',
      icon: MapPin,
      feature: 'Tarmac Access'
    },
    {
      title: 'Business Rentals',
      description: 'Corporate mobility redefined. Impress partners with executive supercar handovers and seamless corporate billing solutions tailored to your schedule.',
      icon: Shield,
      feature: 'Dedicated Billing'
    },
    {
      title: 'Weekend Escapes',
      description: 'Curated touring routes pre-loaded into your vehicle’s telemetry system. Escape to our partner luxury resorts with guaranteed VIP parking and check-in.',
      icon: Compass,
      feature: 'Curated Routes'
    },
    {
      title: 'Wedding Collections',
      description: 'Create unforgettable cinematic arrivals. Choose from our pristine selection of modern hypercars and classic icons, fully detailed and styled for your special day.',
      icon: Sparkles,
      feature: 'Pristine Detailing'
    },
    {
      title: 'Chauffeur Service',
      description: 'For moments when you prefer to be driven. Elite, professionally trained pilot chauffeurs providing absolute discretion and smooth, refined transport.',
      icon: Award,
      feature: 'Professional Pilots'
    },
    {
      title: 'VIP Concierge',
      description: '24/7 dedicated lifestyle managers at your disposal. Manage private track-day access, customized vehicle configurations, and last-minute route adjustments.',
      icon: Star,
      feature: '24/7 Support'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-zinc-800/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
            Bespoke Services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-outfit uppercase m-0 leading-tight mb-4">
            The DriveNova Experience
          </h1>
          <p className="text-zinc-400 font-light max-w-2xl text-sm md:text-base leading-relaxed m-0">
            More than a rental club. We provide a suite of luxury driving programs designed for the global traveler, executive, and automotive connoisseur.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={prog.title}
                className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-8 hover:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded bg-red-950/10 border border-red-950/40 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-red-500" />
                  </div>
                  
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3 font-outfit">
                    {prog.title}
                  </h3>
                  
                  <p className="text-zinc-400 font-light text-xs md:text-sm leading-relaxed mb-6">
                    {prog.description}
                  </p>
                </div>

                <div className="border-t border-zinc-900/60 pt-4 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono">SERVICE_CLASS</span>
                  <span className="text-[10px] uppercase font-bold text-red-500/80 tracking-wider">{prog.feature}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
