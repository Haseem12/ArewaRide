
'use client';

import DriverStatusControl from './DriverStatusControl';
import RideRequestList from './RideRequestList';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function DriverDashboardPage() {
  return (
    <div className="flex flex-col h-full gap-3 md:gap-6">
      <header className="flex-shrink-0">
        <h1 className="text-xl md:text-3xl font-headline font-bold text-foreground">Driver/Partner Dashboard</h1>
        <p className="text-xs md:text-base text-muted-foreground font-body">Manage your availability and incoming requests.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 flex-shrink-0">
        <DriverStatusControl />
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-6 pb-1 md:pb-2">
            <MapPin className="h-5 w-5 md:h-7 md:w-7 text-primary mb-1" />
            <CardTitle className="text-sm md:text-lg font-headline">Operational Area</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">Your current service zone.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-1">
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
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-1 md:my-2 flex-shrink-0" />

      <div className="flex-1 flex flex-col min-h-0">
         <RideRequestList />
      </div>
    </div>
  );
}
