
import RequestServiceForm from './RequestServiceForm';

export default function RequestServicePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Request a Ride or Delivery</h1>
        <p className="text-muted-foreground font-body">Book your next ride or schedule a delivery with ArewaRide & Logistics.</p>
      </header>
      <RequestServiceForm />
    </div>
  );
}
