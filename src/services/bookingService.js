const BOOKINGS_KEY = 'drivenova_bookings';
const SELECTED_DATES_KEY = 'drivenova_selected_dates';

const SEED_BOOKINGS = [
  {
    id: 'b1',
    vehicleId: 'revuelto',
    pickupLocation: 'DriveNova Private Terminal',
    pickupDate: '2026-07-10',
    returnDate: '2026-07-15',
    driverName: 'Alex Mercer',
    email: 'alex@mercer.com',
    phone: '+1 (555) 019-2834',
    totalPrice: 24624
  },
  {
    id: 'b2',
    vehicleId: 'sf90',
    pickupLocation: 'Airport VIP Lounge Handover',
    pickupDate: '2026-07-20',
    returnDate: '2026-07-25',
    driverName: 'Sophia Loren',
    email: 'sophia@loren.com',
    phone: '+1 (555) 012-9843',
    totalPrice: 27216
  }
];

// Initialize localStorage with seed data if empty
export function initBookings() {
  const existing = localStorage.getItem(BOOKINGS_KEY);
  if (!existing) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(SEED_BOOKINGS));
  }
}

// Get all bookings from localStorage
export function getBookings() {
  initBookings();
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return SEED_BOOKINGS;
  }
}

// Save bookings to localStorage
export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

// Check if a vehicle has an overlapping booking for the given dates
export function checkConflict(vehicleId, pickupDate, returnDate) {
  if (!vehicleId || !pickupDate || !returnDate) return false;
  
  const reqStart = new Date(pickupDate + 'T00:00:00');
  const reqEnd = new Date(returnDate + 'T00:00:00');

  // Verify dates are valid
  if (isNaN(reqStart.getTime()) || isNaN(reqEnd.getTime())) return false;

  const bookings = getBookings();
  const vehicleBookings = bookings.filter(b => b.vehicleId === vehicleId);

  for (const booking of vehicleBookings) {
    const existingStart = new Date(booking.pickupDate + 'T00:00:00');
    const existingEnd = new Date(booking.returnDate + 'T00:00:00');

    // Overlapping condition: RequestedStart <= ExistingEnd AND RequestedEnd >= ExistingStart
    if (reqStart <= existingEnd && reqEnd >= existingStart) {
      return true; // Conflict found
    }
  }

  return false;
}

// Create a new booking if no conflict exists
export function createBooking(booking) {
  const hasConflict = checkConflict(booking.vehicleId, booking.pickupDate, booking.returnDate);
  if (hasConflict) {
    return { success: false, error: 'Booking conflict detected.' };
  }

  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: 'b-' + Math.random().toString(36).substring(2, 10).toUpperCase()
  };
  
  bookings.push(newBooking);
  saveBookings(bookings);
  
  // Dispatch custom event to notify components that bookings updated
  window.dispatchEvent(new Event('drivenova_bookings_updated'));
  
  return { success: true, booking: newBooking };
}

// Get shared selected dates (to synchronize across Fleet, Details, and Booking pages)
export function getSelectedDates() {
  try {
    const data = localStorage.getItem(SELECTED_DATES_KEY);
    return data ? JSON.parse(data) : { pickupDate: '', returnDate: '' };
  } catch {
    return { pickupDate: '', returnDate: '' };
  }
}

// Save shared selected dates
export function saveSelectedDates(dates) {
  localStorage.setItem(SELECTED_DATES_KEY, JSON.stringify(dates));
  // Dispatch custom event to notify other components of the change
  window.dispatchEvent(new Event('drivenova_dates_changed'));
}
