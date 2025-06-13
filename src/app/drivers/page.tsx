import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";

interface Driver {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  vehicle: string;
  imageUrl: string;
  status: 'Online' | 'Offline' | 'Busy';
  memberSince: string;
}

const drivers: Driver[] = [
  { id: "1", name: "Adekunle Adebayo", rating: 4.8, reviews: 120, vehicle: "Toyota Camry (Red)", imageUrl: "https://placehold.co/100x100.png", status: "Online", memberSince: "Jan 2022" },
  { id: "2", name: "Chidinma Okoro", rating: 4.5, reviews: 95, vehicle: "Honda Accord (Black)", imageUrl: "https://placehold.co/100x100.png", status: "Busy", memberSince: "Mar 2023" },
  { id: "3", name: "Musa Ibrahim", rating: 4.9, reviews: 210, vehicle: "Lexus RX350 (White)", imageUrl: "https://placehold.co/100x100.png", status: "Online", memberSince: "Jun 2021" },
  { id: "4", name: "Fatima Bello", rating: 4.2, reviews: 60, vehicle: "Kia Rio (Silver)", imageUrl: "https://placehold.co/100x100.png", status: "Offline", memberSince: "Sep 2023" },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
      />
    ))}
    <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
  </div>
);

export default function DriversPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Driver Profiles</h1>
        <p className="text-muted-foreground font-body">Manage and view driver information.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <Card key={driver.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={driver.imageUrl} alt={driver.name} data-ai-hint="driver portrait" />
                <AvatarFallback>{driver.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-lg">{driver.name}</CardTitle>
                <StarRating rating={driver.rating} />
                <p className="text-xs text-muted-foreground font-body">{driver.reviews} reviews</p>
              </div>
            </CardHeader>
            <CardContent className="font-body">
              <p><strong>Vehicle:</strong> {driver.vehicle}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  driver.status === 'Online' ? 'bg-accent text-accent-foreground' : 
                  driver.status === 'Busy' ? 'bg-destructive/20 text-destructive' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {driver.status}
                </span>
              </p>
              <p><strong>Member Since:</strong> {driver.memberSince}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
