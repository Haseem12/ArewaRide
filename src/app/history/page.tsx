
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Calendar, DollarSign, CheckCircle, XCircle, Car, Package } from "lucide-react";

interface ServiceRecord {
  id: string;
  date: string;
  pickup: string;
  dropoff: string;
  fare: string;
  status: "Completed" | "Cancelled";
  type: "Ride" | "Delivery";
}

const serviceHistory: ServiceRecord[] = [
  { id: "1", date: "2024-07-15", pickup: "Ikeja City Mall", dropoff: "Lekki Phase 1", fare: "₦3,500", status: "Completed", type: "Ride" },
  { id: "2", date: "2024-07-14", pickup: "Yaba Market", dropoff: "Surulere (Package to Mr. A)", fare: "₦1,800", status: "Completed", type: "Delivery" },
  { id: "3", date: "2024-07-13", pickup: "MMA Airport", dropoff: "Victoria Island", fare: "₦5,000", status: "Cancelled", type: "Ride" },
  { id: "4", date: "2024-07-12", pickup: "University of Lagos", dropoff: "Gbagada (Documents)", fare: "₦2,200", status: "Completed", type: "Delivery" },
];

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Service History</h1>
        <p className="text-muted-foreground font-body">Review your past rides, deliveries, and expenses.</p>
      </header>
      <div className="space-y-4">
        {serviceHistory.map((service) => (
          <Card key={service.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  {service.type === "Ride" ? <Car className="h-5 w-5 text-primary" /> : <Package className="h-5 w-5 text-primary" />}
                  {service.pickup} to {service.dropoff}
                </CardTitle>
                <CardDescription className="font-body flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {service.date}
                </CardDescription>
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${service.status === "Completed" ? "text-accent" : "text-destructive"}`}>
                {service.status === "Completed" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {service.status}
              </div>
            </CardHeader>
            <CardContent className="font-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" /> Route
                </div>
                <div className="flex items-center gap-1 font-semibold text-foreground">
                  <DollarSign className="h-4 w-4 text-primary" /> {service.fare}
                </div>
              </div>
               <p className="text-xs text-muted-foreground mt-1">Service Type: {service.type}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {serviceHistory.length === 0 && (
        <Card className="shadow-lg">
          <CardContent className="p-6 text-center font-body">
            <p className="text-muted-foreground">You have no service history yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
