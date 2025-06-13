
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState, useTransition } from "react";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "passenger@arewaride.com", // Default for simulation
      password: "password", // Default for simulation
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    startTransition(async () => {
      console.log("Passenger Login data:", values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      login('passenger', '/passenger-dashboard');
      
      toast({
        title: "Login Successful (Simulated)",
        description: "Redirecting to your dashboard...",
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
              <User className="h-7 w-7"/> Passenger Log In
            </CardTitle>
            <CardDescription className="font-body text-center">
              Access your ArewaRide passenger account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground" />Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g., you@example.com" {...field} className="font-body"/>
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
              Log In
            </Button>
            <p className="text-sm text-muted-foreground font-body">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
