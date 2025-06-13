
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-background/90 to-muted/85">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-headline font-bold text-foreground">Welcome Back!</h1>
        <p className="text-lg text-muted-foreground font-body">Log in to access your ArewaRide & Logistics account.</p>
      </header>
      <LoginForm />
    </div>
  );
}
