import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gauge, Fuel, ArrowUpRight } from 'lucide-react';

const VEHICLES = [
  {
    id: 'revuelto',
    name: 'Lamborghini Revuelto',
    category: 'V12 Hybrid Hypercar',
    price: '$3,800',
    transmission: '8-Speed DCT',
    fuelType: 'V12 PHEV',
    imageGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(10, 10, 10, 1) 100%)',
    accentColor: '#f97316',
    silhouette: (
      <svg className="w-full h-full opacity-35 group-hover:opacity-50 transition-opacity duration-500" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 70 L40 68 L60 45 L110 40 L160 55 L180 62 L190 70 L195 78 L190 82 L10 82 Z" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="45" cy="78" r="10" stroke="#f97316" strokeWidth="1.5" />
        <circle cx="155" cy="78" r="10" stroke="#f97316" strokeWidth="1.5" />
        <line x1="60" y1="45" x2="160" y2="55" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1" />
        <line x1="40" y1="68" x2="180" y2="62" stroke="rgba(249, 115, 22, 0.3)" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'valkyrie',
    name: 'Aston Martin Valkyrie',
    category: 'Ultimate Hypercar',
    price: '$8,500',
    transmission: '7-Speed Seq',
    fuelType: '6.5L V12 Petrol',
    imageGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(10, 10, 10, 1) 100%)',
    accentColor: '#10b981',
    silhouette: (
      <svg className="w-full h-full opacity-35 group-hover:opacity-50 transition-opacity duration-500" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 72 L35 70 L55 35 L120 32 L165 52 L185 64 L192 72 L195 78 L190 82 L15 82 Z" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="48" cy="78" r="10" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="158" cy="78" r="10" stroke="#10b981" strokeWidth="1.5" />
        <line x1="55" y1="35" x2="165" y2="52" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'mc20',
    name: 'Maserati MC20 Cielo',
    category: 'Premium Roadster',
    price: '$2,500',
    transmission: '8-Speed DCT',
    fuelType: 'Twin-Turbo V6',
    imageGradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(10, 10, 10, 1) 100%)',
    accentColor: '#06b6d4',
    silhouette: (
      <svg className="w-full h-full opacity-35 group-hover:opacity-50 transition-opacity duration-500" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 70 L42 68 L62 48 L115 44 L158 54 L178 63 L188 70 L193 78 L188 82 L12 82 Z" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="46" cy="78" r="10" stroke="#06b6d4" strokeWidth="1.5" />
        <circle cx="156" cy="78" r="10" stroke="#06b6d4" strokeWidth="1.5" />
        <line x1="62" y1="48" x2="158" y2="54" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 'sf90',
    name: 'Ferrari SF90 Spider',
    category: 'PHEV Supercar',
    price: '$4,200',
    transmission: '8-Speed DCT',
    fuelType: 'V8 Hybrid',
    imageGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(10, 10, 10, 1) 100%)',
    accentColor: '#ef4444',
    silhouette: (
      <svg className="w-full h-full opacity-35 group-hover:opacity-50 transition-opacity duration-500" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 70 L40 68 L60 45 L110 40 L160 55 L180 62 L190 70 L195 78 L190 82 L10 82 Z" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="45" cy="78" r="10" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="155" cy="78" r="10" stroke="#ef4444" strokeWidth="1.5" />
        <line x1="60" y1="45" x2="160" y2="55" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="1" />
      </svg>
    )
  }
];

export default function FleetPreview() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-zinc-900 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
              The Collection
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-outfit uppercase m-0 leading-tight">
              Elite Fleet Preview
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-md text-sm md:text-base leading-relaxed m-0">
            A curated selection of the world's most high-performance and luxury supercars, prepped for your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VEHICLES.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              className="group relative bg-zinc-950/80 rounded-lg overflow-hidden border border-zinc-900 flex flex-col h-full"
              style={{ backdropFilter: 'blur(10px)' }}
              whileHover={{ 
                y: -6,
                borderColor: 'rgba(255,255,255,0.15)',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)'
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Image Placeholder */}
              <div 
                className="w-full h-48 relative flex items-center justify-center p-6 border-b border-zinc-900/60 overflow-hidden"
                style={{ background: vehicle.imageGradient }}
              >
                {/* Tech grid decoration */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                
                {/* Car Silhouette SVG */}
                <div className="w-full h-full flex items-center justify-center relative">
                  {vehicle.silhouette}
                </div>

                {/* Subtle highlight glow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-20 rounded-full blur-[25px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: vehicle.accentColor }} />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                      {vehicle.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                      Available
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-4 font-outfit uppercase">
                    {vehicle.name}
                  </h3>

                  {/* Specs List */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Gauge className="w-4 h-4 text-zinc-600" />
                      <span className="text-xs font-light">{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Fuel className="w-4 h-4 text-zinc-600" />
                      <span className="text-xs font-light">{vehicle.fuelType}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Area */}
                <div>
                  <div className="border-t border-zinc-900/80 my-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Daily Rate</span>
                      <span className="text-lg font-extrabold text-white">{vehicle.price}<span className="text-xs text-zinc-400 font-light">/day</span></span>
                    </div>
                    
                    <Link to={`/fleet/${vehicle.id}`}>
                      <motion.button
                        className="flex items-center justify-center p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white cursor-pointer hover:bg-white hover:text-black transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
