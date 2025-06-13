
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Users, Car, Activity, UserCheck, UserX, FileText, Briefcase, Truck, Route, Map, Search, Zap, Package as PackageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface MockApplication {
  id: string;
  name: string;
  email: string;
  vehicle: string;
  dateApplied: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const initialApplications: MockApplication[] = [
  { id: "app1", name: "Bello Musa", email: "bello.m@example.com", vehicle: "Toyota Corolla 2018", dateApplied: "2024-07-28", status: 'Pending' },
  { id: "app2", name: "Chiamaka Nwosu", email: "chy@example.com", vehicle: "Honda CRV 2020 (Delivery Van)", dateApplied: "2024-07-27", status: 'Pending' },
  { id: "app3", name: "Suleiman Ibrahim", email: "sule@example.com", vehicle: "Kia Rio 2019", dateApplied: "2024-07-26", status: 'Approved' },
  { id: "app4", name: "Amina Garba", email: "amina.g@example.com", vehicle: "Keke Napep", dateApplied: "2024-07-29", status: 'Pending' },
  { id: "app5", name: "Emeka Okafor", email: "emeka@example.com", vehicle: "Suzuki Bike", dateApplied: "2024-07-29", status: 'Pending' },
];

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
];

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<MockApplication[]>(initialApplications);

  const handleApprove = (appId: string) => {
    setApplications(prev => prev.map(app => app.id === appId ? {...app, status: 'Approved'} : app));
    toast({
      title: "Application Approved (Simulated)",
      description: "The driver/partner has been notified and moved to the next stage.",
      variant: "default",
    });
  };

  const handleReject = (appId: string) => {
     setApplications(prev => prev.map(app => app.id === appId ? {...app, status: 'Rejected'} : app));
    toast({
      title: "Application Rejected (Simulated)",
      description: "The driver/partner application has been rejected.",
      variant: "destructive",
    });
  };


  return (
    <div className="flex flex-col h-full gap-3 md:gap-6">
      <header className="flex-shrink-0">
        <h1 className="text-xl md:text-3xl font-headline font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-xs md:text-base text-muted-foreground font-body">Central hub for managing ArewaRide & Logistics operations.</p>
      </header>

      <section className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-2 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium font-body">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </CardHeader>
          <CardContent className="p-2 md:p-4 pt-0">
            <div className="text-lg md:text-2xl font-bold font-headline">₦45,231</div>
            <p className="text-xs text-muted-foreground font-body">+20.1%</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-2 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium font-body">Active Partners</CardTitle>
            <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </CardHeader>
          <CardContent className="p-2 md:p-4 pt-0">
            <div className="text-lg md:text-2xl font-bold font-headline">+230</div>
            <p className="text-xs text-muted-foreground font-body">+5 today</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-2 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium font-body">Ongoing</CardTitle>
            <div className="flex">
              <Car className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary ml-1" />
            </div>
          </CardHeader>
          <CardContent className="p-2 md:p-4 pt-0">
            <div className="text-lg md:text-2xl font-bold font-headline">+78</div>
            <p className="text-xs text-muted-foreground font-body">Services</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-2 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium font-body">System Status</CardTitle>
            <Activity className="h-4 w-4 md:h-5 md:w-5 text-accent" />
          </CardHeader>
          <CardContent className="p-2 md:p-4 pt-0">
            <div className="text-lg md:text-2xl font-bold font-headline text-accent">Operational</div>
            <p className="text-xs text-muted-foreground font-body">All green</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-6 pb-1 md:pb-2">
            <CardTitle className="text-sm md:text-lg font-headline">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-1 space-y-2">
            <Link href="/dispatch" passHref>
              <Button size="xs" className="w-full font-body text-xs md:text-sm" variant="default"><Route className="mr-2 h-3 w-3 md:h-4 md:w-4"/>Optimize Route</Button>
            </Link>
            <Link href="/drivers" passHref>
              <Button size="xs" className="w-full font-body text-xs md:text-sm" variant="outline"><Users className="mr-2 h-3 w-3 md:h-4 md:w-4"/>View Partner Profiles</Button>
            </Link>
            <Link href="/map" passHref>
              <Button size="xs" className="w-full font-body text-xs md:text-sm" variant="secondary"><Map className="mr-2 h-3 w-3 md:h-4 md:w-4"/>Real-Time Map</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-3 md:p-6 pb-1 md:pb-2">
            <CardTitle className="text-sm md:text-lg font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-1">
            <ul className="space-y-1 text-xs md:text-sm font-body">
              <li className="flex items-center justify-between"><span>New partner John A.</span><span className="text-muted-foreground">2m ago</span></li>
              <li className="flex items-center justify-between"><span>Delivery #1024 completed.</span><span className="text-muted-foreground">5m ago</span></li>
              <li className="flex items-center justify-between"><span>Payment ₦2,500 received.</span><span className="text-muted-foreground">10m ago</span></li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="p-2 md:p-6 pb-1 md:pb-2">
            <CardTitle className="font-headline text-sm md:text-lg flex items-center gap-2"><Search className="h-4 w-4 md:h-5 md:w-5 text-primary"/>Track a Service</CardTitle>
            <CardDescription className="text-2xs md:text-sm font-body">Enter Service ID for live status.</CardDescription>
          </CardHeader>
          <CardContent className="p-2 md:p-6 pt-1">
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Service ID" className="font-body text-xs h-8 md:text-sm md:h-9"/>
              <Button type="submit" className="font-body text-xs h-8 md:text-sm md:h-9" size="xs">
                <Search className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" /> Track
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col flex-1 min-h-0">
          <CardHeader className="p-3 md:p-6 pb-1 md:pb-2 flex-shrink-0">
            <CardTitle className="text-sm md:text-lg font-headline flex items-center gap-2"><Briefcase className="h-4 w-4 md:h-5 md:w-5 text-primary" />Pending Partner Apps</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">Review new applications.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-1 flex-1 overflow-y-auto">
            {applications.filter(app => app.status === 'Pending').length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                {applications.filter(app => app.status === 'Pending').map((app) => (
                  <Card key={app.id} className="bg-card/50 p-2 md:p-3">
                    <CardHeader className="p-0 pb-1">
                      <CardTitle className="text-xs md:text-sm font-body flex items-center justify-between">
                        {app.name}
                        <span className="text-xs font-normal px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
                          {app.status}
                        </span>
                      </CardTitle>
                      <CardDescription className="font-body text-xs">{app.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 font-body text-xs md:text-sm">
                      <p><strong>Vehicle:</strong> {app.vehicle}</p>
                    </CardContent>
                    <CardFooter className="p-0 pt-1 gap-1">
                      <Button size="xs" variant="outline" onClick={() => handleApprove(app.id)} className="font-body text-xs">
                        <UserCheck className="mr-1 h-3 w-3"/> Approve
                      </Button>
                      <Button size="xs" variant="destructive" onClick={() => handleReject(app.id)} className="font-body text-xs">
                        <UserX className="mr-1 h-3 w-3"/> Reject
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground font-body text-center py-4 text-sm">No pending applications.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col flex-1 min-h-0">
          <CardHeader className="p-3 md:p-6 pb-1 md:pb-2 flex-shrink-0">
            <CardTitle className="text-sm md:text-lg font-headline flex items-center gap-2"><Zap className="h-4 w-4 md:h-5 md:w-5 text-primary"/>Ongoing Services</CardTitle>
            <CardDescription className="text-xs md:text-sm font-body">Live summary of active services.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 md:p-6 pt-1 flex-1 overflow-y-auto">
            {mockOngoingServices.length > 0 ? (
              mockOngoingServices.map(service => (
                <Card key={service.id} className="bg-card/50 border-border hover:shadow-sm transition-shadow mb-2 md:mb-3">
                  <CardHeader className="p-2 pb-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xs md:text-sm font-body flex items-center gap-2">
                        {service.type === 'Ride' ? <Car className="h-4 w-4 text-primary"/> : <PackageIcon className="h-4 w-4 text-primary"/>}
                        {service.type} to {service.destination}
                      </CardTitle>
                       <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent-foreground border border-accent">
                          {service.status}
                        </span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs p-2 pt-0 font-body text-muted-foreground space-y-0.5">
                    {service.vehicle && <p><strong>Vehicle:</strong> {service.vehicle}</p>}
                    {service.eta && <p><strong>Est. Time:</strong> {service.eta}</p>}
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground font-body text-center py-4 text-sm">No active services currently.</p>
            )}
          </CardContent>
        </Card>
      </section>
      
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0">
        <CardHeader className="p-3 md:p-6 pb-1 md:pb-2">
          <CardTitle className="text-sm md:text-lg font-headline">Service Coverage</CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6 pt-1">
           <div className="overflow-hidden rounded-md border border-border aspect-video md:aspect-[16/6]">
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
  );
}
