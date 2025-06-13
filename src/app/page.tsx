
'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role) {
      if (role === 'admin') router.replace('/admin-dashboard');
      else if (role === 'passenger') router.replace('/passenger-dashboard');
      else if (role === 'driver') router.replace('/driver-dashboard');
    }
  }, [role, isLoading, router]);

  if (isLoading || role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 text-center bg-gradient-to-br from-background/90 to-muted/85">
        <Logo className="text-5xl text-primary mb-12" />
        <p className="text-lg text-muted-foreground">Loading your experience...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 text-center bg-gradient-to-br from-background/90 to-muted/85">
      <div className="mb-12">
        <Logo className="text-5xl text-primary" />
      </div>

      <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6">
        Welcome to ArewaRide & Logistics
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground font-body max-w-2xl mb-10">
        Your reliable and efficient ride-hailing and logistics service. Get where you need to go, or send what you need to send, safely and comfortably.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-3xl w-full">
        <Link href="/login" passHref className="w-full">
          <Button size="lg" className="w-full text-lg py-3 px-8 font-body bg-primary hover:bg-primary/90 text-primary-foreground">
            Passenger Login
          </Button>
        </Link>
        <Link href="/driver/login" passHref className="w-full">
          <Button size="lg" variant="outline" className="w-full text-lg py-3 px-8 font-body border-primary text-primary hover:bg-primary/10">
            Driver Login
          </Button>
        </Link>
         <Link href="/admin/login" passHref className="w-full sm:col-span-2 lg:col-span-1">
          <Button size="lg" variant="secondary" className="w-full text-lg py-3 px-8 font-body">
            Admin Login
          </Button>
        </Link>
      </div>
       <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-6 mb-12">
         <Link href="/register" passHref>
          <Button size="md" variant="link" className="text-lg font-body text-primary">
            Register as Passenger
          </Button>
        </Link>
        <Link href="/driver-application" passHref>
          <Button size="md" variant="link" className="text-lg font-body text-primary">
            Apply to Drive / Deliver
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden">
        <Image
          src="https://placehold.co/1000x500.png"
          alt="ArewaRide and Logistics in action"
          width={1000}
          height={500}
          className="object-cover w-full"
          data-ai-hint="modern city street delivery"
          priority
        />
      </div>
      <p className="text-sm text-muted-foreground mt-4 font-body">Image is illustrative.</p>
    </div>
  );
}
