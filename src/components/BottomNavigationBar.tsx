
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, Package, History, DollarSign, Users, Route, ShieldCheck, MapPin, Gauge, Briefcase, Bus, LocateFixed, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth, type UserRole } from '@/context/AuthContext';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const getBottomBarNavItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case 'passenger':
      return [
        { href: '/passenger-dashboard', label: 'Home', icon: Home },
        { href: '/request-service', label: 'Local', icon: LocateFixed },
        { href: '/transport-booking', label: 'InterCity', icon: Bus },
        { href: '/my-bookings', label: 'Tickets', icon: Ticket },
      ];
    case 'driver':
      return [
        { href: '/driver-dashboard', label: 'Home', icon: Home },
        { href: '/driver-dashboard', label: 'Requests', icon: Gauge }, 
        { href: '/map', label: 'Map', icon: MapPin },
        { href: '/history', label: 'History', icon: History },
      ];
    case 'admin':
      return [
        { href: '/admin-dashboard', label: 'Home', icon: Home },
        { href: '/dispatch', label: 'Dispatch', icon: Route },
        { href: '/drivers', label: 'Partners', icon: Briefcase },
        { href: '/map', label: 'Map', icon: MapPin },
      ];
    default:
      return [];
  }
};

export default function BottomNavigationBar() {
  const { role } = useAuth();
  const pathname = usePathname();

  if (!role) {
    return null;
  }

  const mainNavItems = getBottomBarNavItems(role);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/95 text-foreground shadow-top md:hidden">
      {mainNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && !['/passenger-dashboard', '/driver-dashboard', '/admin-dashboard'].includes(item.href)) || (['/passenger-dashboard', '/driver-dashboard', '/admin-dashboard'].includes(item.href) && pathname === item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center p-2 rounded-md transition-colors h-full w-full',
              isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
            )}
          >
            <Icon className="h-6 w-6 mb-0.5" />
            <span className="text-xs font-body">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
