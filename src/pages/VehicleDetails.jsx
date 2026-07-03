import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Gauge, Fuel, Users, Shield, Zap, Sparkles, Compass, CheckCircle, Calendar } from 'lucide-react';
import { VEHICLES } from '../constants/vehicles';
import CarSilhouette from '../components/atoms/CarSilhouette';
import { checkConflict, getSelectedDates, saveSelectedDates } from '../services/bookingService';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = VEHICLES.find((v) => v.id === id);

  // Gallery view tabs
  const [activeTab, setActiveTab] = useState('profile');

  // Load shared dates from booking service
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

  // Check dynamic availability based on selected dates
  const isConflicting = useMemo(() => {
    bookingsVersion; // Reference bookingsVersion to satisfy lint rules
    return vehicle ? checkConflict(vehicle.id, pickupDate, returnDate) : false;
  }, [vehicle, pickupDate, returnDate, bookingsVersion]);

  // If vehicle is invalid, show clean "Vehicle Not Found" state (Placed after hooks)
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full text-center relative z-10 border border-zinc-900 bg-zinc-950/80 p-8 rounded-lg backdrop-blur-md">
          <Compass className="w-12 h-12 text-red-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-2xl font-extrabold tracking-tight font-outfit uppercase mb-2">
            Vehicle Not Found
          </h1>
          <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8">
            The requested supercar ID <code className="text-red-400 font-mono">"{id}"</code> could not be located in our elite registry. It may have been retired or booking access is currently restricted.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/fleet" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-zinc-200 text-xs font-semibold uppercase tracking-wider no-underline transition-colors rounded">
              <ArrowLeft className="w-4 h-4" />
              Return to Fleet
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const displayAvailability = isConflicting ? 'Unavailable for Selected Dates' : vehicle.availability;

  const statusColor = 
    displayAvailability === 'Available' ? 'text-emerald-400 border-emerald-950 bg-emerald-950/20' :
    displayAvailability === 'Reserved' ? 'text-amber-400 border-amber-950 bg-amber-950/20' :
    'text-red-400 border-red-950/30 bg-red-950/10';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleReserve = () => {
    if (!isConflicting) {
      navigate(`/booking?vehicle=${vehicle.id}`);
    }
  };

  const handleDateChange = (start, end) => {
    setPickupDate(start);
    setReturnDate(end);
    saveSelectedDates({ pickupDate: start, returnDate: end });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] opacity-10 pointer-events-none transition-all duration-500" 
        style={{ backgroundColor: vehicle.accentColor }} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <Link to="/fleet" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider no-underline mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Fleet Collection
        </Link>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Visual Showcase & Gallery Placeholders (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Primary Visual Showcase Card */}
            <div 
              className="w-full aspect-[16/10] rounded-lg border border-zinc-900 flex items-center justify-center p-12 relative overflow-hidden bg-zinc-950 shadow-2xl transition-all duration-300"
              style={{ 
                backgroundImage: vehicle.imageGradient,
                borderColor: activeTab !== 'profile' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)'
              }}
            >
              {/* Tech grid decoration */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              {/* Telemetry graphic lines based on selected tab */}
              {activeTab === 'telemetry' && (
                <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                  <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                    <span>SYS.MONITOR // active</span>
                    <span>TEMP: 84°C</span>
                  </div>
                  <div className="w-full h-24 border-t border-b border-dashed border-red-500/20 flex items-center justify-center">
                    <span className="text-[10px] font-mono tracking-widest text-red-500/40 uppercase">LIVE DIAGNOSTIC OVERLAY ENABLED</span>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-zinc-600">
                    <span>RPM: 8,200 max</span>
                    <span>TCS: OFF</span>
                  </div>
                </div>
              )}

              {activeTab === 'aerodynamics' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-full h-full opacity-40" viewBox="0 0 200 100" fill="none">
                    {/* Airflow waves over the car */}
                    <path d="M10 35 Q50 20, 110 30 T190 40" stroke={vehicle.accentColor} strokeWidth="1" strokeDasharray="3,3" />
                    <path d="M10 45 Q50 30, 110 35 T190 50" stroke={vehicle.accentColor} strokeWidth="1" />
                    <path d="M10 55 Q50 40, 110 40 T190 60" stroke={vehicle.accentColor} strokeWidth="1" strokeDasharray="5,5" />
                  </svg>
                </div>
              )}

              {/* Large scaled silhouette */}
              <div className="w-full h-full flex items-center justify-center">
                <CarSilhouette vehicle={vehicle} className="w-[85%] h-[85%] opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
              </div>

              <span className="absolute bottom-6 left-6 text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                {activeTab.toUpperCase()}_STAGE // {vehicle.id.toUpperCase()}
              </span>
            </div>

            {/* Thumbnail Gallery Placeholders */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-3 rounded border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  activeTab === 'profile'
                    ? 'bg-zinc-900 border-zinc-700 text-white'
                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-wider font-bold">Side Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('aerodynamics')}
                className={`py-4 px-3 rounded border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  activeTab === 'aerodynamics'
                    ? 'bg-zinc-900 border-zinc-700 text-white'
                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-wider font-bold">Aerodynamics</span>
              </button>
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`py-4 px-3 rounded border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 ${
                  activeTab === 'telemetry'
                    ? 'bg-zinc-900 border-zinc-700 text-white'
                    : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:border-zinc-800 hover:text-zinc-300'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="text-[9px] uppercase tracking-wider font-bold">Telemetry</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Vehicle Specs & Details Sheet (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Header info */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
                  {vehicle.category}
                </span>
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${statusColor}`}>
                  {displayAvailability}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-outfit uppercase m-0 leading-tight">
                {vehicle.manufacturer} <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">{vehicle.name}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8 border-b border-zinc-900 pb-6 m-0">
              {vehicle.description}
            </p>

            {/* Specs Grid */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-red-500" />
                Performance Specifications
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded">
                  <Gauge className="w-5 h-5 text-zinc-600" />
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Gearbox</span>
                    <span className="text-white text-xs font-bold">{vehicle.transmission}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded">
                  <Fuel className="w-5 h-5 text-zinc-600" />
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Powertrain</span>
                    <span className="text-white text-xs font-bold">{vehicle.fuelType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded">
                  <Zap className="w-5 h-5 text-zinc-600" />
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Power Output</span>
                    <span className="text-white text-xs font-bold">{vehicle.power}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded">
                  <Shield className="w-5 h-5 text-zinc-600" />
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">0 - 100 km/h</span>
                    <span className="text-white text-xs font-bold">{vehicle.acceleration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded">
                  <Users className="w-5 h-5 text-zinc-600" />
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Capacity</span>
                    <span className="text-white text-xs font-bold">{vehicle.seats} Seats</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-900 rounded">
                  <Compass className="w-5 h-5 text-zinc-600" />
                  <div>
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">Top Velocity</span>
                    <span className="text-white text-xs font-bold">{vehicle.topSpeed}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Features List */}
            <div className="mb-8 border-t border-zinc-900 pt-6">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                Premium Equipment
              </h3>
              <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-zinc-400 text-xs font-light">
                    <CheckCircle className="w-4 h-4 text-red-500/80 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live date check panel */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 mb-6">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 block mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                Check Rental Period Availability
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-zinc-500 block mb-1">Pickup Date</span>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => handleDateChange(e.target.value, returnDate)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block mb-1">Return Date</span>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => handleDateChange(pickupDate, e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions Card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-6 mt-auto">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block mb-1">Daily Membership Rate</span>
                  <span className="text-2xl font-black text-white font-outfit">{formatPrice(vehicle.price)}<span className="text-sm font-light text-zinc-400">/day</span></span>
                </div>

                <motion.button 
                  onClick={handleReserve}
                  disabled={isConflicting}
                  className={`px-8 py-3.5 font-bold text-xs uppercase tracking-wider rounded transition-colors ${
                    isConflicting
                      ? 'bg-zinc-900 text-zinc-650 border border-zinc-850 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-zinc-200 cursor-pointer'
                  }`}
                  whileHover={!isConflicting ? { scale: 1.02 } : {}}
                  whileTap={!isConflicting ? { scale: 0.98 } : {}}
                >
                  {isConflicting ? 'Unavailable for Selected Dates' : 'Reserve Now'}
                </motion.button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
