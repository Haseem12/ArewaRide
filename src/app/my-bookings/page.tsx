
'use client';

import { useEffect, useState } from 'react';
import type { BookedTrip } from '@/types/transport';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, Clock, MapPin, Users, AlertTriangle, Bus, QrCode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import BookingReceipt from './BookingReceipt';

const LOCAL_STORAGE_BOOKINGS_KEY = 'arewaRideLogistics_bookedTrips';

export default function MyBookingsPage() {
  const [bookedTrips, setBookedTrips] = useState<BookedTrip[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookedTrip | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  useEffect(() => {
    try {
      const storedBookingsString = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (storedBookingsString) {
        const storedBookings: BookedTrip[] = JSON.parse(storedBookingsString);
        // Sort by booking date, most recent first
        storedBookings.sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
        setBookedTrips(storedBookings);
      }
    } catch (error) {
      console.error("Failed to load bookings from localStorage:", error);
    }
  }, []);

  const handleViewReceipt = (booking: BookedTrip) => {
    setSelectedBooking(booking);
    setIsReceiptModalOpen(true);
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
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">My Inter-City Bookings</h1>
        <p className="text-muted-foreground font-body">View your upcoming and past inter-city transport tickets.</p>
      </header>

      {bookedTrips.length === 0 && (
        <Card className="shadow-md border-dashed border-muted-foreground/50">
          <CardContent className="py-10 flex flex-col items-center justify-center text-center">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold font-body text-foreground">No Bookings Yet</p>
            <p className="text-muted-foreground font-body">You haven't booked any inter-city trips. Book one to see it here!</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {bookedTrips.map((booking) => (
          <Card key={booking.bookingId} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Bus className="h-6 w-6 text-primary" /> 
                    {booking.tripDetails.operator} - {booking.tripDetails.vehicleType}
                  </CardTitle>
                  <CardDescription className="font-body">
                    {booking.tripDetails.origin} <MapPin className="inline h-3 w-3 mx-1 transform rotate-90" /> {booking.tripDetails.destination}
                  </CardDescription>
                </div>
                <span className="text-xs font-mono text-muted-foreground">ID: {booking.bookingId}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 font-body text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span><strong>Departure:</strong> {formatDate(booking.tripDetails.departureDateTime)} at {formatTime(booking.tripDetails.departureDateTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span><strong>Passenger:</strong> {booking.passengerName}</span>
              </div>
               <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-muted-foreground" />
                <span><strong>Seat:</strong> {booking.seatNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4 text-muted-foreground" />
                <span><strong>Booked on:</strong> {formatDate(booking.bookingDate)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleViewReceipt(booking)} className="w-full font-body bg-primary hover:bg-primary/90 text-primary-foreground">
                <QrCode className="mr-2 h-4 w-4" /> View E-Ticket
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedBooking && (
        <Dialog open={isReceiptModalOpen} onOpenChange={setIsReceiptModalOpen}>
          <DialogContent className="max-w-md md:max-w-lg lg:max-w-2xl p-0 overflow-y-auto max-h-[90vh]">
            <BookingReceipt booking={selectedBooking} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
