
import TransportBookingClient from './TransportBookingClient';
import { MOCK_SCHEDULES, CITIES } from '@/types/transport';

export default function TransportBookingPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Inter-City Transport Booking</h1>
        <p className="text-muted-foreground font-body">Find and book transport schedules between major cities.</p>
      </header>
      <TransportBookingClient initialSchedules={MOCK_SCHEDULES} cities={CITIES as unknown as string[]} />
    </div>
  );
}
