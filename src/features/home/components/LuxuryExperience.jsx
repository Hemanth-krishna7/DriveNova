import { motion } from 'framer-motion';
import { Compass, Shield, Cpu, Activity } from 'lucide-react';

export default function LuxuryExperience() {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-zinc-900 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-950/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-zinc-900/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Editorial / Content Column */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
                Bespoke Services
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-outfit uppercase m-0 leading-[1.05]">
                Luxury Travel Redefined
              </h2>
            </div>
            
            <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed m-0 max-w-xl">
              We combine world-class automotive engineering with bespoke hospitality services. Our elite concierge team delivers and retrieves your chosen vehicle at any location—private terminals, luxury resorts, or your residence. Complete with tailored routes, premium accessories, and a dedicated team, we curate every mile of your journey to match the high-octane engineering beneath your feet.
            </p>

            {/* Micro Details Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-red-500 mt-1">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-outfit uppercase mb-1">Tailored Routes</h4>
                  <p className="text-xs text-zinc-500 font-light">Custom GPS routes pre-programmed for driving pleasure.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-red-500 mt-1">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-outfit uppercase mb-1">White Glove</h4>
                  <p className="text-xs text-zinc-500 font-light">Doorstep delivery, full walk-through, and pickup on demand.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Large Visual Placeholder Card Column */}
          <div className="order-1 lg:order-2">
            <motion.div 
              className="relative aspect-video lg:aspect-[4/3] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 p-6 md:p-8 flex flex-col justify-between shadow-2xl"
              whileHover={{ 
                scale: 1.01,
                borderColor: 'rgba(255,255,255,0.1)'
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Overlay grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-zinc-800" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-zinc-800" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-zinc-800" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-zinc-800" />

              {/* Header stats bar */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-red-500" />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400">TELEMETRY_SYS_v2.4</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500">LIVE_DATA</span>
                </div>
              </div>

              {/* Core Visualization Graphic */}
              <div className="my-8 flex flex-col items-center justify-center relative z-10 flex-grow">
                {/* Dial Graphic */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Outer circle track */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#18181b" strokeWidth="6" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#redGrad)" strokeWidth="6" strokeDasharray="251.2" strokeDashoffset="62.8" />
                    <defs>
                      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#7f1d1d" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute text-center">
                    <span className="text-3xl font-black text-white font-mono tracking-tighter">340</span>
                    <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider">km/h</span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="mt-4 flex gap-8">
                  <div className="text-center">
                    <span className="text-zinc-600 text-[9px] uppercase tracking-wider block font-mono">Power</span>
                    <span className="text-white text-xs font-bold font-mono">1000 HP</span>
                  </div>
                  <div className="text-center">
                    <span className="text-zinc-600 text-[9px] uppercase tracking-wider block font-mono">E-Drive</span>
                    <span className="text-red-500 text-xs font-bold font-mono">Active</span>
                  </div>
                  <div className="text-center">
                    <span className="text-zinc-600 text-[9px] uppercase tracking-wider block font-mono">Mode</span>
                    <span className="text-white text-xs font-bold font-mono">Qualy</span>
                  </div>
                </div>
              </div>

              {/* Footer interactive chart preview */}
              <div className="border-t border-zinc-900 pt-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-zinc-500" />
                  <span className="text-[10px] font-mono text-zinc-400">CHASSIS_STABILITY_100%</span>
                </div>
                <div className="h-6 w-24 flex items-end gap-0.5">
                  <span className="w-1.5 bg-red-950 h-[30%] rounded-t-sm" />
                  <span className="w-1.5 bg-red-950 h-[45%] rounded-t-sm" />
                  <span className="w-1.5 bg-red-900 h-[60%] rounded-t-sm" />
                  <span className="w-1.5 bg-red-700 h-[80%] rounded-t-sm" />
                  <span className="w-1.5 bg-red-500 h-[95%] rounded-t-sm animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
