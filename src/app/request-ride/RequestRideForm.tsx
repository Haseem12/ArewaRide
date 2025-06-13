
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent } from "react";
import { Loader2, Navigation, Users, Car, CheckCircle, Package, Bike } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const requestServiceFormSchema = z.object({
  serviceType: z.enum(["ride", "delivery"], {
    required_error: "Please select a service type.",
  }),
  pickupLocation: z.string().min(3, "Pickup location must be at least 3 characters."),
  dropoffLocation: z.string().min(3, "Drop-off location must be at least 3 characters."),
  passengers: z.string().optional(), // Optional, only relevant for rides
  vehicleType: z.enum(["standard", "comfort", "xl", "bike", "van"], { // Added bike/van for delivery
    required_error: "You need to select a vehicle type.",
  }),
  packageDetails: z.string().optional(), // Optional, only for delivery
}).refine(data => {
  if (data.serviceType === "ride" && !data.passengers) {
    return false;
  }
  return true;
}, {
  message: "Number of passengers is required for a ride.",
  path: ["passengers"],
}).refine(data => {
  if (data.serviceType === "delivery" && (!data.packageDetails || data.packageDetails.length < 5)) {
    return false;
  }
  return true;
}, {
  message: "Package details (min 5 characters) are required for delivery.",
  path: ["packageDetails"],
});

type ServiceEstimate = {
  fare: string;
  pickupTime: string;
  serviceType: "ride" | "delivery";
};

export default function RequestServiceForm() {
  const [isLoadingEstimate, setIsLoadingEstimate] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [serviceEstimate, setServiceEstimate] = useState<ServiceEstimate | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof requestServiceFormSchema>>({
    resolver: zodResolver(requestServiceFormSchema),
    defaultValues: {
      serviceType: "ride",
      pickupLocation: "",
      dropoffLocation: "",
      vehicleType: "standard",
      packageDetails: "",
    },
  });

  const currentServiceType = form.watch("serviceType");

  async function onSubmitEstimate(values: z.infer<typeof requestServiceFormSchema>) {
    setIsLoadingEstimate(true);
    setServiceEstimate(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setServiceEstimate({
      fare: `₦${(Math.random() * 3000 + 1000).toFixed(0)} - ₦${(Math.random() * 2000 + 4000).toFixed(0)}`,
      pickupTime: `${Math.floor(Math.random() * 10) + 3}-${Math.floor(Math.random() * 5) + 13} minutes`,
      serviceType: values.serviceType,
    });
    toast({
      title: `${values.serviceType === "ride" ? "Ride" : "Delivery"} Estimate Ready!`,
      description: "Review the details below and confirm your booking.",
    });
    setIsLoadingEstimate(false);
  }

  async function handleConfirmBooking(event: FormEvent) {
    event.preventDefault();
    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast({
      title: `${serviceEstimate?.serviceType === "ride" ? "Ride" : "Delivery"} Booked Successfully!`,
      description: `Your ${serviceEstimate?.serviceType === "ride" ? "driver" : "partner"} is on the way. You can track them in the app.`,
      variant: "default",
    });
    setServiceEstimate(null);
    form.reset({ serviceType: currentServiceType, pickupLocation: "", dropoffLocation: "", vehicleType: currentServiceType === 'ride' ? "standard" : "bike", packageDetails: "" });
    setIsBooking(false);
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitEstimate)}>
          <Card className="shadow-lg w-full">
            <CardHeader>
              <CardTitle className="font-headline">Enter Service Details</CardTitle>
              <CardDescription className="font-body">Specify your pickup, drop-off, and service preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-body">Service Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("vehicleType", value === "ride" ? "standard" : "bike");
                          form.setValue("passengers", undefined);
                          form.setValue("packageDetails", "");
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ride" />
                          </FormControl>
                          <FormLabel className="font-normal font-body flex items-center gap-2"><Car className="h-4 w-4 text-primary"/>Ride</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="delivery" />
                          </FormControl>
                          <FormLabel className="font-normal font-body flex items-center gap-2"><Package className="h-4 w-4 text-primary"/>Delivery</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center gap-2"><Navigation className="h-4 w-4 text-primary"/>Pickup Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., National Stadium, Surulere" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dropoffLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body flex items-center gap-2"><Navigation className="h-4 w-4 text-primary transform rotate-90"/>Drop-off Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ikeja City Mall" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentServiceType === "ride" && (
                  <FormField
                    control={form.control}
                    name="passengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body flex items-center gap-2"><Users className="h-4 w-4 text-primary"/>Passengers</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="font-body">
                              <SelectValue placeholder="Select number of passengers" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={String(num)} className="font-body">{num} Passenger{num > 1 ? 's' : ''}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body flex items-center gap-2">
                        {currentServiceType === 'ride' ? <Car className="h-4 w-4 text-primary"/> : <Bike className="h-4 w-4 text-primary" />}
                        Vehicle Type
                        </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="font-body">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentServiceType === "ride" ? (
                            <>
                              <SelectItem value="standard" className="font-body">Standard Car</SelectItem>
                              <SelectItem value="comfort" className="font-body">Comfort Car</SelectItem>
                              <SelectItem value="xl" className="font-body">XL Car (Extra Large)</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="bike" className="font-body">Motorcycle/Bike</SelectItem>
                              <SelectItem value="van" className="font-body">Small Van</SelectItem>
                              <SelectItem value="standard" className="font-body">Car (for larger packages)</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {currentServiceType === "delivery" && (
                <FormField
                  control={form.control}
                  name="packageDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body flex items-center gap-2"><Package className="h-4 w-4 text-primary"/>Package Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Small envelope, fragile items, approx. 2kg box. Receiver: John Doe, 08012345678" {...field} className="font-body"/>
                      </FormControl>
                      <FormDescription className="font-body">Briefly describe the package and any special instructions.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoadingEstimate || isBooking} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
                {isLoadingEstimate ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Get Estimate
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {isLoadingEstimate && (
        <Card className="shadow-lg mt-6 animate-pulse">
          <CardHeader>
            <CardTitle className="font-headline">Fetching Estimates...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardContent>
        </Card>
      )}

      {serviceEstimate && !isLoadingEstimate && (
        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="font-headline text-accent flex items-center gap-2"><CheckCircle className="h-6 w-6"/>Estimate Ready!</CardTitle>
            <CardDescription className="font-body">Review your {serviceEstimate.serviceType} estimate below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 font-body">
            <div>
              <h3 className="font-semibold">Estimated Fare:</h3>
              <p className="text-lg text-primary">{serviceEstimate.fare}</p>
            </div>
            <div>
              <h3 className="font-semibold">Estimated Pickup Time:</h3>
              <p className="text-muted-foreground">{serviceEstimate.pickupTime}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleConfirmBooking} disabled={isBooking} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-body">
              {isBooking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Confirm {serviceEstimate.serviceType === "ride" ? "Ride" : "Delivery"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
