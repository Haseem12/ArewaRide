
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPin, Users, CreditCard, History, Route, LayoutDashboard,
  LocateFixed, Gauge, LogIn, UserPlus, UserCircle, Cog, FileText,
  ShieldCheck, Car, LogOut, Home, Package, Briefcase, Ellipsis, Bus, Ticket
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const commonNavLinks = [
  { href: '/map', label: 'Real-Time Map', icon: MapPin, roles: ['admin', 'passenger', 'driver'] },
  { href: '/settings', label: 'Settings', icon: Cog, roles: ['admin', 'passenger', 'driver'] },
];

const roleSpecificLinks = {
  admin: [
    { href: '/admin-dashboard', label: 'Admin Dashboard', icon: ShieldCheck },
    { href: '/dispatch', label: 'Intelligent Dispatch', icon: Route },
    { href: '/drivers', label: 'Driver/Partner Profiles', icon: Briefcase },
  ],
  passenger: [
    { href: '/passenger-dashboard', label: 'My Dashboard', icon: UserCircle },
    { href: '/request-service', label: 'Request Local Service', icon: LocateFixed },
    { href: '/transport-booking', label: 'Book Inter-City Transport', icon: Bus },
    { href: '/my-bookings', label: 'My Inter-City Bookings', icon: Ticket },
    { href: '/history', label: 'Service History', icon: History },
    { href: '/payments', label: 'Secure Payments', icon: CreditCard },
  ],
  driver: [
    { href: '/driver-dashboard', label: 'Driver Dashboard', icon: Gauge },
    { href: '/history', label: 'Service History', icon: History },
  ],
};

const publicAuthLinks = [
   { href: '/login', label: 'Passenger Login', icon: LogIn },
   { href: '/driver/login', label: 'Driver/Partner Login', icon: Car },
   { href: '/admin/login', label: 'Admin Login', icon: ShieldCheck },
   { type: 'separator' as const },
   { href: '/register', label: 'Register (Passenger)', icon: UserPlus },
   { href: '/driver-application', label: 'Apply to Drive/Deliver', icon: FileText },
];

export function NavLinks() {
  const pathname = usePathname();
  const { role, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <SidebarMenu>
        {[...Array(5)].map((_, i) => (
          <SidebarMenuItem key={i}>
             <div className="flex items-center gap-2 p-2 w-full">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 flex-1 rounded" />
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }

  let navItemsToDisplay = [];

  if (role) {
    const baseRoleLinks = roleSpecificLinks[role] || [];
    navItemsToDisplay.push(...baseRoleLinks);
    navItemsToDisplay.push(...commonNavLinks.filter(link => link.roles.includes(role)));

    navItemsToDisplay.push({ href: '#logout', label: 'Logout', icon: LogOut, action: logout });

  } else {
    navItemsToDisplay.push(...publicAuthLinks);
  }

  const homeLink = role
    ? (role === 'admin' ? { href: '/admin-dashboard', label: 'Home', icon: Home}
      : role === 'passenger' ? { href: '/passenger-dashboard', label: 'Home', icon: Home}
      : { href: '/driver-dashboard', label: 'Home', icon: Home})
    : { href: '/', label: 'Home', icon: Home};

  if (!navItemsToDisplay.find(item => item.type !== 'separator' && item.href === homeLink.href )) {
     navItemsToDisplay = [homeLink, ...navItemsToDisplay];
  }


  navItemsToDisplay = navItemsToDisplay.filter((item, index, self) =>
    item.type === 'separator' ||
    index === self.findIndex((t) =>
      (t.type !== 'separator' && item.type !== 'separator' && t.href === item.href) ||
      (item.href === '#logout' && t.href === '#logout') // Keep unique logout
    )
  );

  return (
    <SidebarMenu className="p-2">
      {navItemsToDisplay.map((item, index) => {
        if (item.type === 'separator') {
          return <SidebarSeparator key={`sep-${index}`} className="my-2" />;
        }
        const Icon = item.icon;

        let displayIcon = Icon && <Icon className="h-5 w-5" />;
        if (item.href === '/request-service' && role === 'passenger') {
          displayIcon = (
            <div className="flex items-center">
              <LocateFixed className="h-5 w-5" />
            </div>
          );
        }

        const buttonContent = (
          <>
            {displayIcon}
            <span className="font-body">{item.label}</span>
          </>
        );

        const commonButtonClasses = cn(
          'font-body w-full justify-start text-base py-3',
           pathname === item.href && item.href !=='#logout' ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90' : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        );

        if (item.href === '#logout' && item.action) {
            return (
                 <SidebarMenuItem key="logout-action">
                    <SidebarMenuButton
                        onClick={item.action}
                        className={commonButtonClasses}
                        tooltip={item.label}
                    >
                        {buttonContent}
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );
        }


        return (
          <SidebarMenuItem key={item.href as string}>
            <Link href={item.href as string} asChild>
              <SidebarMenuButton
                className={commonButtonClasses}
                isActive={pathname === item.href}
                tooltip={item.label}
              >
               {buttonContent}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
