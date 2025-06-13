
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocateFixed, History, CreditCard, UserCircle, Package, Bus, MapPin, Search, Ticket, Cog, LifeBuoy } from "lucide-react";
import Link from "next/link";

const mobileIconActions = [
  { href: "/request-service", label: "Local", icon: LocateFixed },
  { href: "/transport-booking", label: "InterCity", icon: Bus },
  { href: "/my-bookings", label: "My Tickets", icon: Ticket },
  { href: "/history", label: "History", icon: History },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/map", label: "Live Map", icon: MapPin },
  { href: "/settings", label: "Settings", icon: Cog },
  { href: "/settings", label: "Profile", icon: UserCircle }, // Assuming profile is part of settings for now
  { href: "/settings", label: "Support", icon: LifeBuoy }, // Assuming support is part of settings or a placeholder
];

export default function PassengerDashboardPage() {
  return (
    <div className="flex flex-col h-full gap-3 md:gap-6">
      <header className="flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <UserCircle className="h-7 w-7 md:h-8 md:w-8 text-primary" />
          <p className="text-base md:text-lg text-muted-foreground font-body">Manage your rides, deliveries, payments, and account.</p>
        </div>
      </header>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0">
        <CardHeader className="p-2 md:p-4 pb-1 md:pb-2">
          <CardTitle className="font-headline text-sm md:text-lg flex items-center gap-2"><Search className="h-4 w-4 md:h-5 md:w-5 text-primary"/>Track Your Service</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-4 pt-1">
          <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Service ID" className="font-body text-xs h-8 md:text-sm md:h-9"/>
            <Button type="submit" className="font-body text-xs h-8 md:text-sm md:h-9" size="xs">
              <Search className="mr-1 h-3 w-3 md:h-4 md:w-4" /> Track
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Icon Action Grid - 3x3 */}
      <section className="py-3 md:hidden">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {mobileIconActions.map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href} passHref className="flex flex-col items-center text-center">
                <Button variant="ghost" className="flex flex-col items-center justify-center h-auto p-2 w-full rounded-lg hover:bg-primary/10 aspect-square">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 mb-0.5 text-primary" />
                  <span className="text-[10px] sm:text-2xs font-body text-foreground mt-0 leading-tight">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Desktop/Tablet Card Grid */}
      <section className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-4 text-center">
            <div className="flex justify-center items-center mb-2 gap-2">
              <LocateFixed className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              <Package className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            <CardTitle className="text-base md:text-lg font-headline">Request Local Service</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">Ride or local delivery.</CardDescription>
          </CardHeader>
          <CardFooter className="p-3 md:p-4">
            <Link href="/request-service" passHref className="w-full">
              <Button className="w-full font-body text-xs md:text-sm" variant="default" size="sm">Request Now</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-4 text-center">
            <Bus className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-2" />
            <CardTitle className="text-base md:text-lg font-headline">Book Inter-City</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">Transport to other cities.</CardDescription>
          </CardHeader>
          <CardFooter className="p-3 md:p-4">
            <Link href="/transport-booking" passHref className="w-full">
              <Button className="w-full font-body text-xs md:text-sm" variant="outline" size="sm">Book Trip</Button>
            </Link>
          </CardFooter>
        </Card>
        
         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-4 text-center">
            <Ticket className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-2" />
            <CardTitle className="text-base md:text-lg font-headline">My Inter-City Bookings</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">View your transport tickets.</CardDescription>
          </CardHeader>
          <CardFooter className="p-3 md:p-4">
            <Link href="/my-bookings" passHref className="w-full">
              <Button className="w-full font-body text-xs md:text-sm" variant="outline" size="sm">View Tickets</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-4 text-center">
            <History className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-2" />
            <CardTitle className="text-base md:text-lg font-headline">Service History</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">Past trips & deliveries.</CardDescription>
          </CardHeader>
          <CardFooter className="p-3 md:p-4">
            <Link href="/history" passHref className="w-full">
              <Button className="w-full font-body text-xs md:text-sm" variant="outline" size="sm">View History</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-4 text-center">
            <CreditCard className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-2" />
            <CardTitle className="text-base md:text-lg font-headline">Manage Payments</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">Update payment methods.</CardDescription>
          </CardHeader>
          <CardFooter className="p-3 md:p-4">
            <Link href="/payments" passHref className="w-full">
              <Button className="w-full font-body text-xs md:text-sm" variant="outline" size="sm">Payment Settings</Button>
            </Link>
          </CardFooter>
        </Card>
         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-4 text-center">
            <MapPin className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-2" />
            <CardTitle className="text-base md:text-lg font-headline">Live Map</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">View map and track.</CardDescription>
          </CardHeader>
          <CardFooter className="p-3 md:p-4">
            <Link href="/map" passHref className="w-full">
              <Button className="w-full font-body text-xs md:text-sm" variant="outline" size="sm">Open Map</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
