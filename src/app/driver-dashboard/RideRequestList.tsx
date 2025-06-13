
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, UserCircle, AlertTriangle, Check, X, Package, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceRequest {
  id: string;
  type: 'Ride' | 'Delivery';
  pickup: string;
  dropoff: string;
  fareEstimate: string;
  passengerName?: string; 
  packageDetails?: string; 
  timestamp: Date;
}

const mockRequests: ServiceRequest[] = [
  { id: "req1", type: "Ride", pickup: "Victoria Island, Lagos", dropoff: "Lekki Phase 1", fareEstimate: "₦2,800", passengerName: "Bisi Ade", timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  { id: "req2", type: "Delivery", pickup: "Ikeja City Mall", dropoff: "Surulere (PharmaPlus)", fareEstimate: "₦1,500", packageDetails: "Small medical package", timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  { id: "req3", type: "Ride", pickup: "University of Abuja", dropoff: "Wuse Market", fareEstimate: "₦2,200", passengerName: "Aisha Musa", timestamp: new Date(Date.now() - 1000 * 60 * 8) },
  { id: "req4", type: "Delivery", pickup: "Garki Market", dropoff: "Asokoro General Hospital", fareEstimate: "₦1,200", packageDetails: "Urgent documents", timestamp: new Date(Date.now() - 1000 * 60 * 10) },
  { id: "req5", type: "Ride", pickup: "Maitama District", dropoff: "Central Business District", fareEstimate: "₦1,800", passengerName: "David Okon", timestamp: new Date(Date.now() - 1000 * 60 * 12) },
];

export default function RideRequestList() {
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleAccept = (requestId: string) => {
    const acceptedRequest = requests.find(r => r.id === requestId);
    setRequests(prev => prev.filter(r => r.id !== requestId));
    toast({
      title: `${acceptedRequest?.type || 'Service'} Accepted!`,
      description: `Proceed to pickup. ${acceptedRequest?.type === 'Ride' ? 'Passenger' : 'Sender'} notified.`,
      variant: 'default',
    });
  };

  const handleDecline = (requestId: string) => {
    const declinedRequest = requests.find(r => r.id === requestId);
    setRequests(prev => prev.filter(r => r.id !== requestId));
    toast({
      title: `${declinedRequest?.type || 'Service'} Declined`,
      description: `The request has been declined.`,
      variant: 'destructive',
    });
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
    if (seconds < 60) return seconds + "s ago";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + "m ago";
    const hours = Math.floor(minutes / 60);
    return hours + "h ago";
  };

  if (requests.length === 0) {
    return (
      <Card className="shadow-md flex-1">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-sm md:text-lg font-headline">Incoming Requests</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6 text-center font-body">
          <AlertTriangle className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground mb-2" />
          <p className="text-sm md:text-base font-semibold">No New Requests</p>
          <p className="text-xs text-muted-foreground">Check back soon or ensure your status is "Online".</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <CardHeader className="p-0 pb-2 flex-shrink-0">
        <CardTitle className="text-sm md:text-lg font-headline">Incoming Requests ({requests.length})</CardTitle>
        <CardDescription className="text-xs md:text-sm font-body">Review new ride or delivery opportunities.</CardDescription>
      </CardHeader>
      <div className="flex-1 overflow-y-auto space-y-2 md:space-y-3 pr-1">
        {requests.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()).map((request) => (
          <Card key={request.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader className="p-2 pb-1">
              <CardTitle className="text-xs md:text-sm font-headline flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {request.type === 'Ride' ? <Car className="h-4 w-4 text-primary" /> : <Package className="h-4 w-4 text-primary" />}
                  {request.type === 'Ride' ? request.passengerName : "Delivery Request"}
                </div>
                <span className="text-xs font-normal text-muted-foreground">{formatTimeAgo(request.timestamp)}</span>
              </CardTitle>
              <CardDescription className="font-body flex items-center gap-1 text-xs">
                 {request.type === 'Ride' ? <UserCircle className="h-3 w-3 text-primary" /> : <Package className="h-3 w-3 text-primary" />}
                 {request.type}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-1 font-body space-y-1 flex-grow text-xs">
              <div className="flex items-start gap-1">
                <MapPin className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-2xs">Pickup:</strong>
                  <span className="text-muted-foreground">{request.pickup}</span>
                </div>
              </div>
              <div className="flex items-start gap-1">
                <MapPin className="h-3 w-3 text-primary mt-0.5 shrink-0 transform rotate-90" />
                <div>
                  <strong className="block text-2xs">Dropoff:</strong>
                  <span className="text-muted-foreground">{request.dropoff}</span>
                </div>
              </div>
              {request.type === 'Delivery' && request.packageDetails && (
                <div className="flex items-start gap-1">
                  <Package className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-2xs">Package:</strong>
                    <span className="text-muted-foreground">{request.packageDetails}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-primary" />
                <div>
                  <strong className="block text-2xs">Est. Fare:</strong>
                  <span className="text-muted-foreground">{request.fareEstimate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-1 p-2 pt-1">
              <Button size="xs" variant="outline" onClick={() => handleDecline(request.id)} className="w-full font-body">
                <X className="mr-1 h-3 w-3" /> Decline
              </Button>
              <Button size="xs" onClick={() => handleAccept(request.id)} className="w-full font-body bg-primary hover:bg-primary/90">
                <Check className="mr-1 h-3 w-3" /> Accept
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
