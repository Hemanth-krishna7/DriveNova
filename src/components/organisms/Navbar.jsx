import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Booking', path: '/booking' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-zinc-900/80 px-6 py-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <span className="font-outfit font-black text-xl tracking-wider text-white uppercase group-hover:text-red-500 transition-colors">
            DRIVE<span className="text-red-500 group-hover:text-white transition-colors">NOVA</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-semibold transition-all duration-300 no-underline ${
                  isActive
                    ? 'text-red-500 font-extrabold'
                    : 'text-zinc-400 hover:text-white'
                }`
              }
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-white focus:outline-none bg-transparent border-none cursor-pointer p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-zinc-900 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-xs uppercase tracking-widest font-semibold py-2 transition-all duration-300 no-underline ${
                  isActive
                    ? 'text-red-500 font-extrabold'
                    : 'text-zinc-400 hover:text-white'
                }`
              }
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
