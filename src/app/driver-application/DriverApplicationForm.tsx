
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useTransition } from "react";
import { Loader2, User, Mail, Phone, CalendarDays, Car, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => String(currentYear - i));

const driverApplicationSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").regex(/^\+?[0-9\s-()]*$/, "Invalid phone number format."),
  yearsExperience: z.string().min(1, "Years of experience is required."),
  vehicleMake: z.string().min(2, "Vehicle make is required."),
  vehicleModel: z.string().min(1, "Vehicle model is required."),
  vehicleYear: z.string().min(4, "Vehicle year is required."),
  licensePlate: z.string().min(3, "License plate is required.").max(10, "License plate too long."),
  address: z.string().min(10, "Address must be at least 10 characters."),
  shortBio: z.string().min(20, "Short bio must be at least 20 characters.").max(500, "Bio is too long, 500 characters max."),
});

export default function DriverApplicationForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof driverApplicationSchema>>({
    resolver: zodResolver(driverApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      yearsExperience: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleYear: "",
      licensePlate: "",
      address: "",
      shortBio: "",
    },
  });

  async function onSubmit(values: z.infer<typeof driverApplicationSchema>) {
    startTransition(async () => {
      console.log("Driver Application Data:", values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Application Submitted!",
        description: "Thank you for applying to ArewaRide & Logistics. We will review your application and get back to you soon.",
        variant: "default",
      });
      form.reset();
    });
  }

  return (
    <Card className="w-full shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Driver/Partner Application</CardTitle>
            <CardDescription className="font-body">
              Please provide accurate information. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground" />Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Musa Aliyu" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., musa.aliyu@example.com" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center"><Phone className="mr-2 h-4 w-4 text-muted-foreground" />Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., +234 801 234 5678" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />Years of Driving/Delivery Experience</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="font-body">
                            <SelectValue placeholder="Select years of experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[...Array(20)].map((_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)} className="font-body">{i + 1} Year{i + 1 > 1 ? 's' : ''}</SelectItem>
                          ))}
                           <SelectItem value="20+" className="font-body">20+ Years</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body flex items-center">Full Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your full residential address" {...field} className="font-body"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="text-lg font-semibold font-headline text-foreground border-t pt-4">Vehicle Information (for driving/delivery)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="vehicleMake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center"><Car className="mr-2 h-4 w-4 text-muted-foreground" />Vehicle Make</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Toyota, Keke, Bike" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Camry, Cargo, Delivery Van" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="vehicleYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Vehicle Year</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="font-body">
                            <SelectValue placeholder="Select vehicle year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year} className="font-body">{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="licensePlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center"><Hash className="mr-2 h-4 w-4 text-muted-foreground" />License Plate / Vehicle ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., LAG-123AB" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="shortBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body flex items-center">Short Bio / Relevant Experience</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe your driving/delivery experience and why you want to join ArewaRide & Logistics." {...field} className="font-body h-32"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit Application
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
