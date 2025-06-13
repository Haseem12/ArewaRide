
// src/ai/flows/optimize-route.ts
'use server';
/**
 * @fileOverview A route optimization AI agent for rides and deliveries.
 *
 * - optimizeRoute - A function that handles the route optimization process.
 * - OptimizeRouteInput - The input type for the optimizeRoute function.
 * - OptimizeRouteOutput - The return type for the optimizeRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeRouteInputSchema = z.object({
  startLocation: z
    .string()
    .describe('The starting location for the route (pickup point for ride or package).'),
  endLocation: z.string().describe('The destination for the route (drop-off point for ride or package).'),
  trafficConditions: z
    .string()
    .describe('Real-time traffic conditions along the route.'),
  roadConditions: z.string().describe('Road conditions along the route.'),
  serviceType: z.enum(['ride', 'delivery']).optional().describe('The type of service: ride or delivery. This can influence optimization priorities.'),
});
export type OptimizeRouteInput = z.infer<typeof OptimizeRouteInputSchema>;

const OptimizeRouteOutputSchema = z.object({
  optimizedRoute: z.string().describe('The optimized route considering traffic, road conditions, and service type.'),
  estimatedTravelTime: z.string().describe('The estimated travel time for the optimized route.'),
  recommendations: z.string().describe('Recommendations for the driver/partner based on the route and service type.'),
});
export type OptimizeRouteOutput = z.infer<typeof OptimizeRouteOutputSchema>;

export async function optimizeRoute(input: OptimizeRouteInput): Promise<OptimizeRouteOutput> {
  return optimizeRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeRoutePrompt',
  input: {schema: OptimizeRouteInputSchema},
  output: {schema: OptimizeRouteOutputSchema},
  prompt: `You are an expert route optimizer specializing in finding the fastest and most efficient routes for both passenger rides and package deliveries.

You will use this information to determine the optimal route, and estimate the travel time.
Consider real-time traffic and road conditions when optimizing the route.
{{#if serviceType}}
Also consider that this is for a {{{serviceType}}}.
{{/if}}

Start Location: {{{startLocation}}}
End Location: {{{endLocation}}}
Traffic Conditions: {{{trafficConditions}}}
Road Conditions: {{{roadConditions}}}`,
});

const optimizeRouteFlow = ai.defineFlow(
  {
    name: 'optimizeRouteFlow',
    inputSchema: OptimizeRouteInputSchema,
    outputSchema: OptimizeRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
