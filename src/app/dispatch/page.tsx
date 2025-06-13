
import DispatchForm from './DispatchForm';

export default function DispatchPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-headline font-bold text-foreground">Intelligent Dispatch</h1>
        <p className="text-muted-foreground font-body">AI-powered route optimization for rides and deliveries based on real-time conditions.</p>
      </header>
      <DispatchForm />
    </div>
  );
}
