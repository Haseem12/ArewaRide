
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState, useTransition } from "react";
import { Loader2, Mail, Lock, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const loginFormSchema = z.object({
  driverId: z.string().min(1, "Driver ID or Email is required."), // Can be email or a specific driver ID
  password: z.string().min(1, "Password is required."),
});

export default function DriverLoginForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      driverId: "driver@arewaride.com", // Default for simulation
      password: "password", // Default for simulation
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    startTransition(async () => {
      console.log("Driver Login data:", values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login('driver', '/driver-dashboard');
      
      toast({
        title: "Driver Login Successful (Simulated)",
        description: "Redirecting to Driver Dashboard...",
        variant: "default",
      });
    });
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center text-primary flex items-center justify-center gap-2">
              <Car className="h-7 w-7" /> Driver Portal
            </CardTitle>
            <CardDescription className="font-body text-center">
              Enter your driver credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="driverId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />Driver ID / Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Driver ID or Email" {...field} className="font-body"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground" />Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="font-body"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Log In as Driver
            </Button>
             <p className="text-sm text-muted-foreground font-body">
              Not a driver yet?{' '}
              <Link href="/driver-application" className="font-medium text-primary hover:underline">
                Apply to drive
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
