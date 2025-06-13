
import DriverLoginForm from './DriverLoginForm';

export default function DriverLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-background/90 to-muted/85">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold text-foreground">Driver Login</h1>
        <p className="text-lg text-muted-foreground font-body">Access your ArewaRide & Logistics Driver Dashboard.</p>
      </header>
      <DriverLoginForm />
    </div>
  );
}
