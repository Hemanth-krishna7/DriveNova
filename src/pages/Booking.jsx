import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Mail, Phone, MapPin, CheckCircle, ArrowLeft, Shield, Sparkles, AlertCircle } from 'lucide-react';
import { VEHICLES } from '../constants/vehicles';
import CarSilhouette from '../components/atoms/CarSilhouette';
import { checkConflict, createBooking, getSelectedDates, saveSelectedDates } from '../services/bookingService';

export default function Booking() {
  const [searchParams] = useSearchParams();

  // Form Fields State
  const [selectedId, setSelectedId] = useState(() => {
    const paramId = searchParams.get('vehicle');
    if (paramId && VEHICLES.some((v) => v.id === paramId)) {
      return paramId;
    }
    return VEHICLES[0]?.id || '';
  });
  const [pickupLocation, setPickupLocation] = useState('DriveNova Private Terminal');
  
  // Load shared dates from booking service
  const [pickupDate, setPickupDate] = useState(() => getSelectedDates().pickupDate || '');
  const [returnDate, setReturnDate] = useState(() => getSelectedDates().returnDate || '');
  const [driverName, setDriverName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Form Validation & Success State
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [reservationId, setReservationId] = useState('');

  // Local state version to trigger re-renders on booking updates
  const [bookingsVersion, setBookingsVersion] = useState(0);

  // Sync dates and bookings updates with other components
  useEffect(() => {
    const handleDatesChange = () => {
      const dates = getSelectedDates();
      setPickupDate(dates.pickupDate || '');
      setReturnDate(dates.returnDate || '');
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

  const handlePickupDateChange = (date) => {
    setPickupDate(date);
    saveSelectedDates({ pickupDate: date, returnDate });
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    saveSelectedDates({ pickupDate, returnDate: date });
  };

  // Retrieve selected vehicle details
  const selectedVehicle = useMemo(() => {
    return VEHICLES.find(v => v.id === selectedId) || VEHICLES[0];
  }, [selectedId]);

  // Check dynamic conflict for selected dates (depends on bookingsVersion)
  const isConflicting = useMemo(() => {
    bookingsVersion;
    return checkConflict(selectedId, pickupDate, returnDate);
  }, [selectedId, pickupDate, returnDate, bookingsVersion]);

  // Calculate rental duration in days
  const rentalDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 1;
  }, [pickupDate, returnDate]);

  // Financial Breakdown calculations
  const subtotal = useMemo(() => {
    return (selectedVehicle?.price || 0) * rentalDays;
  }, [selectedVehicle, rentalDays]);

  const serviceFee = useMemo(() => {
    return Math.round(subtotal * 0.08); // 8% luxury service charge
  }, [subtotal]);

  const estimatedTotal = useMemo(() => {
    return subtotal + serviceFee;
  }, [subtotal, serviceFee]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!selectedId) newErrors.vehicle = 'Please select a vehicle.';
    if (!pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required.';
    if (!pickupDate) newErrors.pickupDate = 'Pickup date is required.';
    if (!returnDate) newErrors.returnDate = 'Return date is required.';
    if (pickupDate && returnDate && new Date(returnDate) < new Date(pickupDate)) {
      newErrors.returnDate = 'Return date must be on or after pickup date.';
    }
    if (!driverName.trim()) newErrors.driverName = 'Driver name is required.';
    
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone Validation (10 digits exactly, digits only, reject symbols/letters/spaces)
    const phoneRegex = /^\d{10}$/;
    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Phone number must contain exactly 10 digits (digits only, no letters, symbols, or spaces).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isConflicting) {
        setErrors({
          vehicle: 'This vehicle is unavailable for the selected dates. Please choose another vehicle or different dates.'
        });
        return;
      }

      const newBooking = {
        vehicleId: selectedId,
        pickupLocation,
        pickupDate,
        returnDate,
        driverName,
        email,
        phone,
        totalPrice: estimatedTotal
      };

      const res = createBooking(newBooking);
      if (res.success) {
        setReservationId(res.booking.id);
        setIsSuccess(true);
      } else {
        setErrors({ vehicle: res.error });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden flex flex-col justify-center">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-zinc-800/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div 
              key="booking-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className="mb-12">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500 mb-3 block">
                  Bespoke Rental Engine
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-outfit uppercase m-0 leading-tight">
                  Secure Reservation
                </h1>
              </div>

              {/* Form and Summary Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* LEFT: Booking Form Input Sheet (7 Columns) */}
                <form onSubmit={handleConfirmBooking} className="lg:col-span-7 space-y-6 bg-zinc-950/80 border border-zinc-900 rounded-lg p-8 backdrop-blur-md">
                  
                  {/* Vehicle Selection */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2">Select Supercar</label>
                    <select
                      value={selectedId}
                      onChange={(e) => setSelectedId(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                    >
                      {VEHICLES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.manufacturer} {v.name} ({formatPrice(v.price)}/day)
                        </option>
                      ))}
                    </select>
                    {errors.vehicle && <span className="text-red-500 text-xs mt-1 block flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.vehicle}</span>}
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2">Concierge Handover Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <select
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-850 rounded pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                      >
                        <option value="DriveNova Private Terminal">DriveNova Private Terminal (Default)</option>
                        <option value="Airport VIP Lounge Handover">Airport VIP Lounge Handover</option>
                        <option value="Luxury Yacht Harbor VIP Handover">Luxury Yacht Harbor VIP Handover</option>
                        <option value="Bespoke Residential Delivery">Bespoke Residential Delivery (Custom Add-on)</option>
                      </select>
                    </div>
                    {errors.pickupLocation && <span className="text-red-500 text-xs mt-1 block flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.pickupLocation}</span>}
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2">Pickup Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => handlePickupDateChange(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 rounded pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                        />
                      </div>
                      {errors.pickupDate && <span className="text-red-500 text-xs mt-1 block flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.pickupDate}</span>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => handleReturnDateChange(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 rounded pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
                        />
                      </div>
                      {errors.returnDate && <span className="text-red-500 text-xs mt-1 block flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.returnDate}</span>}
                    </div>
                  </div>

                  {/* Driver Details Title */}
                  <div className="border-t border-zinc-900 pt-6">
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      Primary Operator Information
                    </h3>
                  </div>

                  {/* Driver Name */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2">Legal Driver Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-850 rounded pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>
                    {errors.driverName && <span className="text-red-500 text-xs mt-1 block flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.driverName}</span>}
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="email"
                          placeholder="johndoe@luxury.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 rounded pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-red-500/50 transition-colors"
                        />
                      </div>
                      {errors.email && <span className="text-red-500 text-xs mt-1 block flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-500 mb-2">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                          type="tel"
                          placeholder="e.g. 5550192834"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 rounded pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-red-500/50 transition-colors"
                        />
                      </div>
                      {errors.phone && <span className="text-red-500 text-xs mt-1 block flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Inline Conflict Warning Alert */}
                  {isConflicting && (
                    <div className="p-4 bg-red-950/10 border border-red-900/30 rounded flex items-start gap-3 text-red-400 text-xs font-light leading-relaxed">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>This vehicle is unavailable for the selected dates. Please choose another vehicle or different dates.</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      disabled={isConflicting}
                      className={`w-full py-4 font-extrabold text-xs uppercase tracking-wider rounded transition-colors ${
                        isConflicting
                          ? 'bg-zinc-900 text-zinc-650 border border-zinc-850 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-zinc-200 cursor-pointer'
                      }`}
                      whileHover={!isConflicting ? { scale: 1.01 } : {}}
                      whileTap={!isConflicting ? { scale: 0.99 } : {}}
                    >
                      {isConflicting ? 'Unavailable for Selected Dates' : 'Confirm Booking'}
                    </motion.button>
                  </div>
                </form>

                {/* RIGHT: Rental Pricing Summary (5 Columns) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  
                  {/* Selected Vehicle Visual Card */}
                  <div 
                    className="w-full aspect-[16/10] rounded-lg border border-zinc-900 flex items-center justify-center p-8 relative overflow-hidden bg-zinc-950 shadow-md"
                    style={{ backgroundImage: selectedVehicle?.imageGradient }}
                  >
                    {/* Tech grid decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                    
                    <div className="w-full h-full flex items-center justify-center relative">
                      <CarSilhouette vehicle={selectedVehicle} className="w-[80%] h-[80%] opacity-55" />
                    </div>

                    <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-mono">SELECTED_MODEL</span>
                        <span className={`text-[8px] uppercase font-bold px-1.5 py-0.2 rounded border ${
                          isConflicting 
                            ? 'text-red-400 border-red-950/30 bg-red-950/10' 
                            : 'text-emerald-400 border-emerald-950 bg-emerald-950/20'
                        }`}>
                          {isConflicting ? 'Unavailable for Selected Dates' : 'Available'}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-white uppercase">{selectedVehicle?.manufacturer} {selectedVehicle?.name}</span>
                    </div>
                  </div>

                  {/* Summary Breakdown Card */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-6 space-y-6">
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-zinc-400 m-0 pb-4 border-b border-zinc-900 flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-red-500" />
                      Fare Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-light">Supercar Daily Rate</span>
                        <span className="text-white font-semibold">{formatPrice(selectedVehicle?.price || 0)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-light">Rental Period</span>
                        <span className="text-white font-semibold">{rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-light">Subtotal</span>
                        <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-light">Luxury Support & Logistics (8%)</span>
                        <span className="text-white font-semibold">{formatPrice(serviceFee)}</span>
                      </div>
                    </div>

                    <div className="border-t border-zinc-900 pt-4 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">Estimated Total</span>
                        <span className="text-sm font-light text-zinc-400">VAT & insurance included</span>
                      </div>
                      <span className="text-2xl font-black text-white font-outfit">{formatPrice(estimatedTotal)}</span>
                    </div>

                    {/* Quality badges */}
                    <div className="border-t border-zinc-900 pt-4 flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-[10px] text-zinc-500 font-light leading-relaxed m-0">
                        Includes premium full-coverage protection, 24/7 client coordination, and detailed pre-handover diagnostics.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          ) : (
            /* Success confirmation card state */
            <motion.div 
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto w-full border border-zinc-900 bg-zinc-950/80 p-8 md:p-12 rounded-lg backdrop-blur-md text-center"
            >
              <div className="w-16 h-16 bg-emerald-950/20 border border-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400 mb-3 block">
                Booking Confirmed
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-outfit uppercase m-0 leading-tight mb-4">
                Your Supercar is Ready
              </h2>
              <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                Thank you for reserving with DriveNova. Your premium vehicle handover is locked and confirmed. A concierge manager will reach out shortly to finalize delivery coordinates.
              </p>

              {/* Reservation Sheet */}
              <div className="bg-zinc-900 border border-zinc-850 rounded-lg p-6 text-left mb-8 space-y-4 max-w-md mx-auto">
                <div className="flex justify-between items-center text-xs border-b border-zinc-800 pb-3">
                  <span className="text-zinc-500">Reservation Reference</span>
                  <span className="text-white font-mono font-bold">{reservationId}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Selected Vehicle</span>
                  <span className="text-white font-semibold">{selectedVehicle?.manufacturer} {selectedVehicle?.name}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Driver</span>
                  <span className="text-white font-semibold">{driverName}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Delivery Location</span>
                  <span className="text-white font-semibold">{pickupLocation}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Period</span>
                  <span className="text-white font-semibold">{pickupDate} to {returnDate} ({rentalDays} {rentalDays === 1 ? 'day' : 'days'})</span>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-zinc-800 pt-3 font-semibold">
                  <span className="text-zinc-500">Total Price Calculated</span>
                  <span className="text-white text-sm font-bold">{formatPrice(estimatedTotal)}</span>
                </div>
              </div>

              {/* Back Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/fleet" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-zinc-200 text-xs font-semibold uppercase tracking-wider no-underline transition-colors rounded">
                  <ArrowLeft className="w-4 h-4" />
                  Return to Fleet
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
