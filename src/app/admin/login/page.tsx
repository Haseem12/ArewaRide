
import AdminLoginForm from './AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-background/90 to-muted/85">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold text-foreground">Admin Login</h1>
        <p className="text-lg text-muted-foreground font-body">Access the ArewaRide & Logistics Admin Dashboard.</p>
      </header>
      <AdminLoginForm />
    </div>
  );
}
