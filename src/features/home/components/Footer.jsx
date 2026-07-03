import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-zinc-900/60 py-16 px-6 md:px-12 lg:px-24 text-zinc-500 font-light text-sm relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-outfit font-extrabold text-xl tracking-wider uppercase">
            Drive<span className="text-red-500">Nova</span>
          </span>
          <p className="text-zinc-500 leading-relaxed text-xs max-w-xs">
            The world's most coveted hypercar club. Offering bespoke premium rentals and unforgettable driving experiences for the modern connoisseur.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-outfit">Quick Links</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
            <li>
              <Link to="/fleet" className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs no-underline">
                Our Fleet
              </Link>
            </li>
            <li>
              <Link to="/experience" className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs no-underline">
                The Experience
              </Link>
            </li>
            <li>
              <Link to="/booking" className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs no-underline">
                Reserve a Car
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-zinc-500 hover:text-white transition-colors duration-200 text-xs no-underline">
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest text-zinc-300 font-semibold font-outfit">Concierge Desk</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            <li className="flex items-center gap-2.5 text-xs text-zinc-500">
              <Phone className="w-3.5 h-3.5 text-zinc-700" />
              <span>+1 (800) 555-NOVA</span>
            </li>
            <li className="flex items-center gap-2.5 text-xs text-zinc-500">
              <Mail className="w-3.5 h-3.5 text-zinc-700" />
              <a href="mailto:concierge@drivenova.com" className="text-zinc-500 hover:text-white transition-colors duration-200 no-underline">
                concierge@drivenova.com
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-xs text-zinc-500">
              <MapPin className="w-3.5 h-3.5 text-zinc-700 mt-0.5" />
              <span>100 Nova Way, Beverly Hills, CA 90210</span>
            </li>
          </ul>
        </div>

        {/* Extra Legal Column / Accent */}
        <div className="flex flex-col gap-4 md:items-end">
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-600 block">SYSTEM STATUS</span>
            <span className="text-[10px] text-green-500 font-semibold font-mono block mt-1">● ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto border-t border-zinc-900/60 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <span>© {new Date().getFullYear()} DriveNova. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="text-zinc-600 hover:text-zinc-400 no-underline transition-colors">Privacy Policy</a>
          <a href="#" className="text-zinc-600 hover:text-zinc-400 no-underline transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
