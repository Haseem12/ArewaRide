
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CreditCard, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const paymentFormSchema = z.object({
  paymentMethod: z.enum(["card", "wallet"], {
    required_error: "You need to select a payment method.",
  }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardHolderName: z.string().optional(),
}).refine(data => {
  if (data.paymentMethod === "card") {
    return !!data.cardNumber && !!data.expiryDate && !!data.cvv && !!data.cardHolderName;
  }
  return true;
}, {
  message: "Card details are required for card payment.",
  path: ["cardNumber"],
});

export default function PaymentsPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  });

  function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    console.log(values);
    toast({
      title: "Payment Details Updated",
      description: `Your preferred payment method is ${values.paymentMethod}.`,
      variant: "default",
    });
    // In a real app, you'd save this to user profile.
    // If it were an actual payment for a service, the message would be different.
  }

  const paymentMethod = form.watch("paymentMethod");

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Secure Payments</h1>
        <p className="text-muted-foreground font-body">Manage your payment methods for rides and deliveries.</p>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Choose Payment Method</CardTitle>
              <CardDescription className="font-body">Select your preferred payment method for services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 font-body"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-primary" /> Pay with Credit/Debit Card
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="wallet" />
                        </FormControl>
                        <FormLabel className="font-normal flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-primary" /> Pay with ArewaRide & Logistics Wallet (Balance: ₦10,500)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold font-headline text-foreground">Card Details</h3>
                  <FormField
                    control={form.control}
                    name="cardHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body">Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. John Doe" {...field} className="font-body"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-body">Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0000 0000 0000 0000" {...field} className="font-body"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} className="font-body"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-body">CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} className="font-body"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
                    Save Card Details
                  </Button>
                </div>
              )}
               {paymentMethod === "wallet" && (
                 <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
                    Set Wallet as Default
                  </Button>
               )}
            </CardContent>
            {/* Footer removed as submit buttons are now contextual */}
          </Card>
        </form>
      </Form>
    </div>
  );
}
