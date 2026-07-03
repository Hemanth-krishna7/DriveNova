import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Gauge, Fuel, Users, ArrowUpRight, RotateCcw, Calendar } from 'lucide-react';
import { VEHICLES } from '../constants/vehicles';
import CarSilhouette from '../components/atoms/CarSilhouette';
import { checkConflict, getSelectedDates, saveSelectedDates } from '../services/bookingService';

export default function Fleet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);

  // Shared dates from booking service
  const [pickupDate, setPickupDate] = useState(() => getSelectedDates().pickupDate);
  const [returnDate, setReturnDate] = useState(() => getSelectedDates().returnDate);

  // Local state version to trigger re-renders on booking changes
  const [bookingsVersion, setBookingsVersion] = useState(0);

  // Sync dates and bookings updates with other components
  useEffect(() => {
    const handleDatesChange = () => {
      const dates = getSelectedDates();
      setPickupDate(dates.pickupDate);
      setReturnDate(dates.returnDate);
    };

    const handleBookingsUpdate = () => {
      setBookingsVersion(prev => prev + 1);
    };

    window.addEventListener('drivenova_dates_changed', handleDatesChange);
    window.addEventListener('drivenova_bookings_updated', handleBookingsUpdate);
    
    return () => {
      window.removeEventListener('drivenova_dates_changed', handleDatesChange);
      window.removeEventListener('drivenova_bookings_updated', handleBookingsUpdate);
    };
  }, []);

  const handleDateChange = (start, end) => {
    setPickupDate(start);
    setReturnDate(end);
    saveSelectedDates({ pickupDate: start, returnDate: end });
  };

  // Extract categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(VEHICLES.map(v => v.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    bookingsVersion;
    return VEHICLES.filter(vehicle => {
      const matchesSearch = 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || vehicle.category === selectedCategory;
      const matchesPrice = vehicle.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, maxPrice, bookingsVersion]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice(15000);
    handleDateChange('', '');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-zinc-800/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
            Exclusive Collection
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-outfit uppercase m-0 leading-tight mb-4">
            The DriveNova Fleet
          </h1>
          <p className="text-zinc-400 font-light max-w-2xl text-sm md:text-base leading-relaxed m-0">
            Select from our meticulously detailed collection of top-tier performance vehicles and V12 hypercars, engineered to deliver absolute thrills.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 mb-12 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-6">
            {/* Search */}
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search manufacturer, model, or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-zinc-900/60 border border-zinc-850 rounded text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-850 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Price Filter Slider */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 min-w-[280px]">
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">Max Daily Rate</span>
                  <span className="text-xs font-bold text-white">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="1900"
                  max="15000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
              </div>
              
              {/* Reset Filters button */}
              {(searchQuery || selectedCategory !== 'All' || maxPrice !== 15000 || pickupDate || returnDate) && (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900/60 border border-zinc-855 rounded text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  title="Reset filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="sm:hidden lg:inline">Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Date range availability filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-zinc-900 pt-6">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                Check Availability: Pickup Date
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => handleDateChange(e.target.value, returnDate)}
                className="w-full bg-zinc-900/60 border border-zinc-850 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                Return Date
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => handleDateChange(pickupDate, e.target.value)}
                className="w-full bg-zinc-900/60 border border-zinc-850 rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Fleet Counter (Part 6) */}
        <div className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-6">
          Showing {filteredVehicles.length} of {VEHICLES.length} Vehicles
        </div>

        {/* Fleet Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => {
              // Check dynamic conflict for selected dates
              const hasConflict = checkConflict(vehicle.id, pickupDate, returnDate);
              const displayAvailability = hasConflict ? 'Unavailable for Selected Dates' : vehicle.availability;

              const statusColor = 
                displayAvailability === 'Available' ? 'text-emerald-400 border-emerald-950 bg-emerald-950/20' :
                displayAvailability === 'Reserved' ? 'text-amber-400 border-amber-950 bg-amber-950/20' :
                'text-red-400 border-red-950/30 bg-red-950/10';

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={vehicle.id}
                  className="group relative bg-zinc-950/80 rounded-lg overflow-hidden border border-zinc-900 flex flex-col h-full hover:border-zinc-800 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Card Image Section */}
                  <div 
                    className="w-full h-48 relative flex items-center justify-center p-6 border-b border-zinc-900/60 overflow-hidden"
                    style={{ background: vehicle.imageGradient }}
                  >
                    {/* Tech grid decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                    
                    {/* Reusable Silhouette */}
                    <div className="w-full h-full flex items-center justify-center relative">
                      <CarSilhouette vehicle={vehicle} />
                    </div>

                    {/* Accent glow highlight */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-28 h-16 rounded-full blur-[20px] opacity-10 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: vehicle.accentColor }} />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">
                          {vehicle.category}
                        </span>
                        <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${statusColor} text-right`}>
                          {displayAvailability}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight mb-4 font-outfit uppercase">
                        {vehicle.manufacturer} <span className="font-extrabold text-white">{vehicle.name}</span>
                      </h3>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                          <Gauge className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="text-xs font-light">{vehicle.transmission}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-400">
                          <Fuel className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="text-xs font-light">{vehicle.fuelType}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-400 col-span-2">
                          <Users className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="text-xs font-light">{vehicle.seats} Seats available</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Details & Button */}
                    <div>
                      <div className="border-t border-zinc-900/80 my-4" />
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Daily Rate</span>
                          <span className="text-base font-extrabold text-white">{formatPrice(vehicle.price)}<span className="text-xs text-zinc-400 font-light">/day</span></span>
                        </div>
                        
                        <Link to={`/fleet/${vehicle.id}`} className="no-underline">
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
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredVehicles.length === 0 && (
          <div className="text-center py-20 bg-zinc-950/40 border border-dashed border-zinc-900 rounded-lg">
            <span className="text-zinc-600 text-sm block mb-4">No matching supercars found in our collection.</span>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-855 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
