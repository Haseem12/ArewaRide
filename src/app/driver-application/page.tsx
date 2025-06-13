
import DriverApplicationForm from './DriverApplicationForm';

export default function DriverApplicationPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Become an ArewaRide & Logistics Driver/Partner</h1>
        <p className="text-muted-foreground font-body">Join our team of professional drivers and delivery partners. Fill out the application below.</p>
      </header>
      <DriverApplicationForm />
    </div>
  );
}
