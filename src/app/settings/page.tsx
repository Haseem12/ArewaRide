
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cog } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <Cog className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground font-body">Manage your application preferences and account settings.</p>
        </div>
      </header>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Account Settings</CardTitle>
          <CardDescription className="font-body">Update your profile information and password.</CardDescription>
        </CardHeader>
        <CardContent className="font-body">
          <p>Profile settings will go here.</p>
          {/* Add form fields for name, email, password change, etc. */}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Notification Preferences</CardTitle>
          <CardDescription className="font-body">Choose how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="font-body">
          <p>Notification toggles and options will go here.</p>
          {/* Add switches for email notifications, push notifications, etc. */}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Theme Settings</CardTitle>
          <CardDescription className="font-body">Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="font-body">
          <p>Theme selection (light/dark) will go here.</p>
          {/* Add options to switch themes */}
        </CardContent>
      </Card>
    </div>
  );
}
