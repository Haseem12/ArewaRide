
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Wifi, WifiOff, Zap } from 'lucide-react';

type DriverStatus = 'Online' | 'Offline' | 'Busy';

export default function DriverStatusControl() {
  const [status, setStatus] = useState<DriverStatus>('Offline');
  const { toast } = useToast();

  const handleStatusChange = (newStatus: DriverStatus) => {
    setStatus(newStatus);
    toast({
      title: 'Status Updated',
      description: `You are now ${newStatus}.`,
      variant: newStatus === 'Online' ? 'default' : newStatus === 'Busy' ? 'destructive' : 'default',
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="p-3 md:p-6 pb-1 md:pb-2">
        <CardTitle className="text-sm md:text-lg font-headline">Manage Your Availability</CardTitle>
        <CardDescription className="text-xs md:text-sm font-body">Set your status to receive requests.</CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-6 pt-1">
        <RadioGroup
          value={status}
          onValueChange={(value: string) => handleStatusChange(value as DriverStatus)}
          className="grid grid-cols-3 gap-2 font-body"
        >
          {(['Online', 'Busy', 'Offline'] as DriverStatus[]).map((s) => (
            <Label
              key={s}
              htmlFor={`status-${s.toLowerCase()}`}
              className={`flex flex-col items-center justify-center rounded-md border-2 p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                status === s ? 'border-primary bg-primary/10' : 'border-muted'
              }`}
            >
              <RadioGroupItem value={s} id={`status-${s.toLowerCase()}`} className="sr-only" />
              {s === 'Online' && <Wifi className={`mb-1 h-5 w-5 ${status === s ? 'text-primary' : 'text-muted-foreground'}`} />}
              {s === 'Busy' && <Zap className={`mb-1 h-5 w-5 ${status === s ? 'text-primary' : 'text-muted-foreground'}`} />}
              {s === 'Offline' && <WifiOff className={`mb-1 h-5 w-5 ${status === s ? 'text-primary' : 'text-muted-foreground'}`} />}
              <span className="block w-full text-center text-xs font-medium">{s}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
