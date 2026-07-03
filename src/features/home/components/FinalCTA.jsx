import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="py-28 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] border-t border-zinc-900 relative overflow-hidden text-center">
      {/* Intense gradient glow behind the text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-950/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Tech line grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(255,255,255,0.01)_95%)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-4 block">
          Immediate Access
        </span>
        
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-outfit uppercase m-0 leading-[1.1] mb-6">
          Ready to Command <br />
          the Road?
        </h2>

        <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          Unlock the keys to the world's finest engineering. Select your model, arrange bespoke delivery, and experience automotive perfection today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/fleet" className="w-full sm:w-auto no-underline">
            <motion.button
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded cursor-pointer hover:bg-zinc-200 transition-colors duration-300 font-inter"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Fleet
            </motion.button>
          </Link>
          
          <Link to="/contact" className="w-full sm:w-auto no-underline">
            <motion.button
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-zinc-700 text-white font-semibold text-xs uppercase tracking-wider rounded cursor-pointer hover:bg-white/5 hover:border-white transition-all duration-300 font-inter"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Concierge
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}

