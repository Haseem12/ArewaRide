
import type { Metadata } from 'next';
import './globals.css';
import AppLayout from '@/components/AppLayout';

export const metadata: Metadata = {
  title: 'ArewaRide and Logistics',
  description: 'Your reliable ride-hailing and logistics service.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -10, // Ensure it's behind all content
            opacity: 0.1, // Adjust for desired map visibility (e.g., 0.1 for subtle, up to 0.5 for more visible)
            pointerEvents: 'none', // Disable interaction with the map
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62632.12863686458!2d7.6493964!3d11.1499703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1749563178169!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Background Map"
          ></iframe>
        </div>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
