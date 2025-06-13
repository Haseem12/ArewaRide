
'use client';

import type { BookedTrip } from '@/types/transport';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, User, Ticket, DollarSign, Bus, QrCode, Info } from 'lucide-react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Logo from '@/components/Logo';

interface BookingReceiptProps {
  booking: BookedTrip;
}

export default function BookingReceipt({ booking }: BookingReceiptProps) {
  
  const formatDate = (dateString: string) => format(parseISO(dateString), "EEEE, MMMM d, yyyy");
  const formatTime = (dateString: string) => format(parseISO(dateString), "h:mm a");

  return (
    <div className="p-4 sm:p-6 bg-background text-foreground font-body">
      <div className="flex flex-col items-center mb-4">
        <Logo className="text-3xl mb-2"/>
        <h2 className="text-2xl font-headline font-bold text-primary">Boarding Pass / E-Ticket</h2>
        <p className="text-sm text-muted-foreground">Keep this ticket safe. Valid for travel.</p>
      </div>

      <Separator className="my-4"/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
        <div>
          <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-1">Passenger</h3>
          <p className="text-lg font-medium">{booking.passengerName}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-1">Booking ID</h3>
          <p className="text-lg font-mono text-primary">{booking.bookingId}</p>
        </div>
      </div>

      <Separator className="my-4"/>
      
      <div>
        <h3 className="font-semibold text-lg mb-2 text-primary">Trip Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <div><strong>From:</strong> {booking.tripDetails.origin}</div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary shrink-0 transform rotate-90" />
            <div><strong>To:</strong> {booking.tripDetails.destination}</div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <div><strong>Departure Date:</strong> {formatDate(booking.tripDetails.departureDateTime)}</div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <div><strong>Departure Time:</strong> {formatTime(booking.tripDetails.departureDateTime)}</div>
          </div>
           <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <div><strong>Est. Arrival Date:</strong> {formatDate(booking.tripDetails.arrivalDateTime)}</div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary shrink-0" />
            <div><strong>Est. Arrival Time:</strong> {formatTime(booking.tripDetails.arrivalDateTime)}</div>
          </div>
          <div className="flex items-center gap-2">
            <Bus className="h-4 w-4 text-primary shrink-0" />
            <div><strong>Operator:</strong> {booking.tripDetails.operator} ({booking.tripDetails.vehicleType})</div>
          </div>
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-primary shrink-0" />
            <div><strong>Seat Number:</strong> {booking.seatNumber}</div>
          </div>
        </div>
      </div>

      <Separator className="my-4"/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-center">
        <div>
            <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-1">Total Fare</h3>
            <p className="text-2xl font-bold text-primary">₦{booking.tripDetails.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Booked on: {formatDate(booking.bookingDate)}</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image 
            src="https://placehold.co/150x150.png?text=QR+Code" 
            alt="QR Code for Boarding" 
            width={120} 
            height={120} 
            className="rounded-md border border-border shadow-sm"
            data-ai-hint="qr code ticket"
          />
        </div>
      </div>

      <Separator className="my-6" />

      <div className="bg-muted/30 p-3 rounded-md text-xs">
        <h4 className="font-semibold mb-1 flex items-center gap-1"><Info className="h-4 w-4 text-primary"/>Boarding Information</h4>
        <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
          <li>Please arrive at the departure terminal at least 30 minutes before departure time.</li>
          <li>Present this E-Ticket (digital or printed) and a valid ID for boarding.</li>
          <li>Luggage allowance may apply. Check with the operator.</li>
          <li>This ticket is non-transferable.</li>
          <li>Safe travels with ArewaRide and Logistics!</li>
        </ul>
      </div>

    </div>
  );
}
