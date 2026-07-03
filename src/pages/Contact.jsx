import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-6 block">
          Get in Touch
        </span>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-outfit uppercase m-0 leading-tight mb-4">
          Contact Concierge
        </h1>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-xs mb-8">
          <Compass className="w-3.5 h-3.5 text-red-500" />
          <span>COMING SOON</span>
        </div>

        <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed mb-10">
          Our specialized white-glove concierge ticketing system is launching soon. In the meantime, you can reach us at <a href="mailto:concierge@drivenova.com" className="text-red-500 hover:text-red-400 underline">concierge@drivenova.com</a>.
        </p>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded text-xs font-semibold uppercase tracking-wider no-underline transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
