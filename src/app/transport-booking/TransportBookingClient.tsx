
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { TripSchedule, City, BookedTrip } from '@/types/transport';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon, Clock, DollarSign, MapPin, Users, AlertTriangle, Ticket, Bus, Ship, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';

interface TransportBookingClientProps {
  initialSchedules: TripSchedule[];
  cities: string[];
}

const LOCAL_STORAGE_BOOKINGS_KEY = 'arewaRideLogistics_bookedTrips';

export default function TransportBookingClient({ initialSchedules, cities }: TransportBookingClientProps) {
  const [schedules, setSchedules] = useState<TripSchedule[]>(initialSchedules);
  const [origin, setOrigin] = useState<City | ''>('');
  const [destination, setDestination] = useState<City | ''>('');
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000); 
    return () => clearInterval(timer);
  }, []);

  const availableOrigins = useMemo(() => {
    const uniqueOrigins = new Set(cities.filter(city => city !== destination));
    return Array.from(uniqueOrigins);
  }, [cities, destination]);

  const availableDestinations = useMemo(() => {
    const uniqueDestinations = new Set(cities.filter(city => city !== origin));
    return Array.from(uniqueDestinations);
  }, [cities, origin]);

  const filteredSchedules = useMemo(() => {
    if (!origin || !destination) {
      return [];
    }
    return schedules.filter(
      (schedule) => schedule.origin === origin && schedule.destination === destination && schedule.status !== 'Departed' && schedule.status !== 'Cancelled' && new Date(schedule.departureDateTime) > currentDate
    ).sort((a,b) => new Date(a.departureDateTime).getTime() - new Date(b.departureDateTime).getTime());
  }, [schedules, origin, destination, currentDate]);

  const handleBooking = (tripId: string) => {
    const tripToBook = schedules.find((trip) => trip.id === tripId);
    if (!tripToBook || tripToBook.availableSeats <= 0) {
      toast({
        title: "Booking Failed",
        description: "This trip is already full or not available.",
        variant: "destructive",
      });
      return;
    }

    setSchedules((prevSchedules) =>
      prevSchedules.map((trip) => {
        if (trip.id === tripId && trip.availableSeats > 0) {
          const newAvailableSeats = trip.availableSeats - 1;
          return {
            ...trip,
            availableSeats: newAvailableSeats,
            status: newAvailableSeats === 0 ? 'Full' : trip.status,
          };
        }
        return trip;
      })
    );

    // Save to localStorage
    try {
      const existingBookingsString = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      const existingBookings: BookedTrip[] = existingBookingsString ? JSON.parse(existingBookingsString) : [];
      
      const newBooking: BookedTrip = {
        tripDetails: tripToBook, // Store the full schedule details
        bookingId: `TRN-${Date.now()}-${tripToBook.id.slice(0,3)}`,
        seatNumber: `Seat ${Math.floor(Math.random() * tripToBook.totalSeats) + 1}`, // Simulated
        passengerName: "Passenger Name", // Simulated, ideally from auth context
        bookingDate: new Date().toISOString(),
      };

      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify([...existingBookings, newBooking]));
      
      toast({
        title: "Booking Successful (Simulated)",
        description: `Your seat on ${tripToBook.operator} from ${tripToBook.origin} to ${tripToBook.destination} has been booked. Booking ID: ${newBooking.bookingId}`,
        variant: "default",
      });

      router.push('/my-bookings');

    } catch (error) {
      console.error("Failed to save booking to localStorage:", error);
      toast({
        title: "Booking Partially Successful",
        description: "Your seat is reserved, but there was an issue saving booking details locally.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
        return format(parseISO(dateString), "eee, MMM d, yyyy");
    } catch (error) {
        return "Invalid Date";
    }
  }

  const formatTime = (dateString: string) => {
    try {
        return format(parseISO(dateString), "h:mm a");
    } catch (error) {
        return "Invalid Time"
    }
  }


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Find Your Trip</CardTitle>
          <CardDescription className="font-body">Select your origin and destination to see available transport schedules.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="origin-select" className="block text-sm font-medium text-foreground font-body mb-1">Origin</label>
            <Select value={origin} onValueChange={(value) => setOrigin(value as City)}>
              <SelectTrigger id="origin-select" className="w-full font-body">
                <SelectValue placeholder="Select origin city" />
              </SelectTrigger>
              <SelectContent>
                {availableOrigins.map((city) => (
                  <SelectItem key={city} value={city} className="font-body">{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="destination-select" className="block text-sm font-medium text-foreground font-body mb-1">Destination</label>
            <Select value={destination} onValueChange={(value) => setDestination(value as City)}>
              <SelectTrigger id="destination-select" className="w-full font-body">
                <SelectValue placeholder="Select destination city" />
              </SelectTrigger>
              <SelectContent>
                {availableDestinations.map((city) => (
                  <SelectItem key={city} value={city} className="font-body">{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {origin && destination && (
        <Separator />
      )}

      {origin && destination && filteredSchedules.length === 0 && (
        <Card className="shadow-md border-dashed border-muted-foreground/50">
          <CardContent className="py-10 flex flex-col items-center justify-center text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold font-body text-foreground">No Trips Available</p>
            <p className="text-muted-foreground font-body">Sorry, there are no scheduled trips for the selected route at this time. Please check back later or try a different route.</p>
          </CardContent>
        </Card>
      )}

      {filteredSchedules.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-headline font-semibold text-foreground">
            Available Trips: {origin} to {destination}
          </h2>
          {filteredSchedules.map((trip) => (
            <Card key={trip.id} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${trip.availableSeats === 0 || trip.status === 'Full' ? 'bg-muted/50' : 'bg-card'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                      <Bus className="h-6 w-6 text-primary" /> {trip.operator} - {trip.vehicleType}
                    </CardTitle>
                    <CardDescription className="font-body">{trip.origin} <MapPin className="inline h-3 w-3 mx-1 transform rotate-90" /> {trip.destination}</CardDescription>
                  </div>
                  <div className={`text-sm font-semibold px-3 py-1 rounded-full border ${
                    trip.availableSeats > 0 && trip.status === 'Available' ? 'bg-accent/20 text-accent-foreground border-accent' :
                    trip.availableSeats === 0 || trip.status === 'Full' ? 'bg-destructive/20 text-destructive-foreground border-destructive' :
                    'bg-muted text-muted-foreground border-border'
                  }`}>
                    {trip.availableSeats > 0 ? `${trip.availableSeats} Seats Left` : 'Trip Full'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Date:</strong> {formatDate(trip.departureDateTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Price:</strong> ₦{trip.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Departs:</strong> {formatTime(trip.departureDateTime)}</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Arrives:</strong> {formatTime(trip.arrivalDateTime)} ({formatDate(trip.arrivalDateTime).includes(formatDate(trip.departureDateTime)) ? 'Same Day' : formatDate(trip.arrivalDateTime) })</span>
                  </div>
                </div>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <Info className="h-3 w-3" /> All times are local. Arrival times are estimates.
                  </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleBooking(trip.id)}
                  disabled={trip.availableSeats === 0 || trip.status === 'Full'}
                  className="w-full font-body bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-muted-foreground"
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  {trip.availableSeats > 0 ? 'Book Now' : 'Trip Full'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
