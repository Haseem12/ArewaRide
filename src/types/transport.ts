
export interface TripSchedule {
  id: string;
  origin: string;
  destination: string;
  departureDateTime: string; // ISO string
  arrivalDateTime: string;   // ISO string
  price: number;
  vehicleType: string; // e.g., "Luxury Bus", "Minibus", "Sienna"
  availableSeats: number;
  totalSeats: number;
  status: 'Available' | 'Full' | 'Departed' | 'Cancelled';
  operator: string; // e.g., "Arewa Transport Co."
}

export interface BookedTrip {
  tripDetails: TripSchedule; // Contains all the details of the scheduled trip
  bookingId: string;
  passengerName: string; // Could be fetched from auth context in a real app
  seatNumber: string; // e.g., "A12", "B7" - Simulated for now
  bookingDate: string; // ISO string of when the booking was made
}

export const CITIES = ["Kano", "Kaduna", "Abuja", "Lagos"] as const;
export type City = typeof CITIES[number];

export const MOCK_SCHEDULES: TripSchedule[] = [
  // Kano <-> Abuja
  { id: "KA101", origin: "Kano", destination: "Abuja", departureDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString(), price: 7500, vehicleType: "Luxury Bus", availableSeats: 25, totalSeats: 40, status: "Available", operator: "Arewa Motors" },
  { id: "AK102", origin: "Abuja", destination: "Kano", departureDateTime: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 32 * 60 * 60 * 1000).toISOString(), price: 7500, vehicleType: "Luxury Bus", availableSeats: 0, totalSeats: 40, status: "Full", operator: "Arewa Motors" },
  { id: "KA103", origin: "Kano", destination: "Abuja", departureDateTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 54 * 60 * 60 * 1000).toISOString(), price: 8000, vehicleType: "Sienna", availableSeats: 5, totalSeats: 7, status: "Available", operator: "Northern Express" },
  { id: "KA104", origin: "Kano", destination: "Abuja", departureDateTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 78 * 60 * 60 * 1000).toISOString(), price: 7200, vehicleType: "Minibus", availableSeats: 12, totalSeats: 18, status: "Available", operator: "Arewa Motors" },


  // Kano <-> Kaduna
  { id: "KKD201", origin: "Kano", destination: "Kaduna", departureDateTime: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(), price: 3000, vehicleType: "Minibus", availableSeats: 10, totalSeats: 18, status: "Available", operator: "Kaduna Link" },
  { id: "KDK202", origin: "Kaduna", destination: "Kano", departureDateTime: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(), price: 3000, vehicleType: "Minibus", availableSeats: 3, totalSeats: 18, status: "Available", operator: "Kaduna Link" },
  { id: "KKD203", origin: "Kano", destination: "Kaduna", departureDateTime: new Date(Date.now() + 40 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 43 * 60 * 60 * 1000).toISOString(), price: 3200, vehicleType: "Sienna", availableSeats: 6, totalSeats: 7, status: "Available", operator: "Arewa Swift" },


  // Kaduna <-> Abuja
  { id: "KDA301", origin: "Kaduna", destination: "Abuja", departureDateTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(), price: 4000, vehicleType: "Luxury Bus", availableSeats: 30, totalSeats: 40, status: "Available", operator: "Capital Connect" },
  { id: "ADK302", origin: "Abuja", destination: "Kaduna", departureDateTime: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), price: 4000, vehicleType: "Luxury Bus", availableSeats: 0, totalSeats: 40, status: "Full", operator: "Capital Connect" },
  { id: "KDA303", origin: "Kaduna", destination: "Abuja", departureDateTime: new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 33 * 60 * 60 * 1000).toISOString(), price: 4200, vehicleType: "Minibus", availableSeats: 15, totalSeats: 18, status: "Available", operator: "FCT Commute" },


  // Abuja <-> Lagos
  { id: "AL401", origin: "Abuja", destination: "Lagos", departureDateTime: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), price: 12000, vehicleType: "Luxury Night Bus", availableSeats: 15, totalSeats: 35, status: "Available", operator: "Southern Star" },
  { id: "LA402", origin: "Lagos", destination: "Abuja", departureDateTime: new Date(Date.now() + 40 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 52 * 60 * 60 * 1000).toISOString(), price: 12500, vehicleType: "Luxury Night Bus", availableSeats: 8, totalSeats: 35, status: "Available", operator: "Southern Star" },
  { id: "AL403", origin: "Abuja", destination: "Lagos", departureDateTime: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), price: 11500, vehicleType: "Day Bus", availableSeats: 2, totalSeats: 45, status: "Available", operator: "Eko Travels" },
  { id: "LA404", origin: "Lagos", destination: "Abuja", departureDateTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 84 * 60 * 60 * 1000).toISOString(), price: 0, vehicleType: "Day Bus", availableSeats: 0, totalSeats: 45, status: "Full", operator: "Eko Travels" },
  { id: "AL405", origin: "Abuja", destination: "Lagos", departureDateTime: new Date(Date.now() + 80 * 60 * 60 * 1000).toISOString(), arrivalDateTime: new Date(Date.now() + 92 * 60 * 60 * 1000).toISOString(), price: 13000, vehicleType: "Sienna VIP", availableSeats: 4, totalSeats: 7, status: "Available", operator: "Arewa Premium" },

];
