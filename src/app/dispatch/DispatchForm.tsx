
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { optimizeRoute, type OptimizeRouteInput, type OptimizeRouteOutput } from "@/ai/flows/optimize-route";
import { useState } from "react";
import { Loader2, Map, Clock, MessageSquare, Car, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dispatchFormSchema = z.object({
  startLocation: z.string().min(3, "Start location must be at least 3 characters."),
  endLocation: z.string().min(3, "End location must be at least 3 characters."),
  trafficConditions: z.string().min(5, "Traffic conditions must be at least 5 characters."),
  roadConditions: z.string().min(5, "Road conditions must be at least 5 characters."),
  serviceType: z.enum(["ride", "delivery"], {
    required_error: "Please select a service type for optimization context.",
  }),
});

export default function DispatchForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeRouteOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof dispatchFormSchema>>({
    resolver: zodResolver(dispatchFormSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      trafficConditions: "Normal",
      roadConditions: "Good",
      serviceType: "ride",
    },
  });

  async function onSubmit(values: z.infer<typeof dispatchFormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await optimizeRoute(values as OptimizeRouteInput);
      setResult(response);
      toast({
        title: "Route Optimized",
        description: `The optimal route for the ${values.serviceType} has been calculated.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error optimizing route:", error);
      toast({
        title: "Optimization Failed",
        description: "Could not optimize the route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="shadow-lg w-full">
            <CardHeader>
              <CardTitle className="font-headline">Route Optimization Input</CardTitle>
              <CardDescription className="font-body">Enter details to find the optimal route for a ride or delivery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-body">Service Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ride" />
                          </FormControl>
                          <FormLabel className="font-normal font-body flex items-center gap-1"><Car className="h-4 w-4"/>Ride</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="delivery" />
                          </FormControl>
                          <FormLabel className="font-normal font-body flex items-center gap-1"><Package className="h-4 w-4"/>Delivery</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Start Location (Pickup)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ikeja Bus Stop" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">End Location (Drop-off)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lekki Conservation Centre" {...field} className="font-body"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trafficConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Traffic Conditions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Heavy traffic on Third Mainland Bridge" {...field} className="font-body"/>
                    </FormControl>
                    <FormDescription className="font-body">
                      Describe current traffic conditions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roadConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body">Road Conditions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Potholes on Agege Motor Road" {...field} className="font-body"/>
                    </FormControl>
                     <FormDescription className="font-body">
                      Describe current road conditions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Optimize Route
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {isLoading && (
        <Card className="shadow-lg mt-6 animate-pulse">
          <CardHeader>
            <CardTitle className="font-headline">Optimizing...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </CardContent>
        </Card>
      )}

      {result && !isLoading && (
        <Card className="shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="font-headline text-accent">Optimized Route Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 font-body">
            <div>
              <h3 className="font-semibold flex items-center gap-2"><Map className="h-5 w-5 text-primary" /> Optimized Route:</h3>
              <p className="ml-7 text-muted-foreground">{result.optimizedRoute}</p>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Estimated Travel Time:</h3>
              <p className="ml-7 text-muted-foreground">{result.estimatedTravelTime}</p>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" /> Recommendations:</h3>
              <p className="ml-7 text-muted-foreground">{result.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
