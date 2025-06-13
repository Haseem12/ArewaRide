
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Package, Car, Zap } from "lucide-react";

interface OngoingService {
  id: string;
  type: 'Ride' | 'Delivery';
  destination: string;
  status: string;
  vehicle?: string;
  eta?: string;
}

const mockOngoingServices: OngoingService[] = [
  { id: "track123", type: "Ride", destination: "Ikeja City Mall", status: "En Route", vehicle: "Toyota Camry (Red)", eta: "5 mins" },
  { id: "track456", type: "Delivery", destination: "Surulere Post Office", status: "Picking up package", vehicle: "Dispatch Bike", eta: "10 mins" },
  { id: "track789", type: "Ride", destination: "Lekki Phase 1", status: "Driver Arrived", vehicle: "Honda Accord (Black)", eta: "0 mins" },
  { id: "track000", type: "Delivery", destination: "Victoria Island (DHL Office)", status: "Near Destination", vehicle: "Small Van", eta: "2 mins" },
];

export default function MapPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Live Tracking & Map</h1>
        <p className="text-muted-foreground font-body">Track your service or view the operational area.</p>
      </header>

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Search className="h-6 w-6 text-primary"/>Track Your Service</CardTitle>
          <CardDescription className="font-body">Enter your Service ID to see its live location and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-md items-center space-x-2">
            <Input type="text" placeholder="Enter Service ID (e.g., RIDE-123XYZ)" className="font-body"/>
            <Button type="submit" className="font-body bg-primary hover:bg-primary/90 text-primary-foreground">
              <Search className="mr-2 h-4 w-4" /> Track
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><MapPin className="h-6 w-6 text-primary"/>Operational Area Map</CardTitle>
          <CardDescription className="font-body">This map displays our primary operational area.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border border-border aspect-video md:aspect-[16/7]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62632.12863686458!2d7.6493964!3d11.1499703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1749563178169!5m2!1sen!2sng" 
              width="100%" 
              height="100%" 
              style={{ border:0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Operational Area Map"
            ></iframe>
          </div>
           <p className="text-sm text-muted-foreground mt-2 font-body text-center">
            Map shows Zaria and surrounding areas.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Zap className="h-6 w-6 text-primary"/>Ongoing Services Overview</CardTitle>
          <CardDescription className="font-body">A quick look at currently active rides and deliveries.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockOngoingServices.length > 0 ? (
            mockOngoingServices.map(service => (
              <Card key={service.id} className="bg-card/80 border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-md font-body flex items-center gap-2">
                      {service.type === 'Ride' ? <Car className="h-5 w-5 text-primary"/> : <Package className="h-5 w-5 text-primary"/>}
                      {service.type} to {service.destination}
                    </CardTitle>
                     <span className="text-xs font-semibold px-2 py-1 rounded-full bg-accent/20 text-accent-foreground border border-accent">
                        {service.status}
                      </span>
                  </div>
                </CardHeader>
                <CardContent className="text-xs font-body text-muted-foreground space-y-1">
                  {service.vehicle && <p><strong>Vehicle:</strong> {service.vehicle}</p>}
                  {service.eta && <p><strong>Est. Time:</strong> {service.eta}</p>}
                </CardContent>
                 <CardFooter className="pt-3">
                   <Button variant="outline" size="sm" className="w-full font-body text-xs">View Details</Button>
                 </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground font-body text-center py-4">No active services currently.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
