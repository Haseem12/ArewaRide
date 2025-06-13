
'use client';

import type React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Settings, LogOut } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Logo from '@/components/Logo';
import { NavLinks } from '@/components/NavLinks';
import { Toaster } from "@/components/ui/toaster";
import { Button } from '@/components/ui/button';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import BottomNavigationBar from '@/components/BottomNavigationBar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { role, logout, isLoading } = useAuth();
  const isMobile = useIsMobile();

  const noNavRoutes = [
    '/',
    '/login',
    '/register',
    '/admin/login',
    '/driver/login',
    '/driver-application'
  ];

  const shouldShowNavigation = !noNavRoutes.includes(pathname) || (role && noNavRoutes.includes(pathname) && pathname !== '/');
  
  // Conditionally show bottom nav
  const showBottomNav = isMobile && shouldShowNavigation && role;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background/95">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!role && noNavRoutes.includes(pathname)) {
    return (
      <>
        <main className="flex-1 bg-transparent text-foreground">
          {pathname === '/' ? <div className="p-0">{children}</div> : children}
        </main>
        <Toaster />
      </>
    );
  }


  if (!shouldShowNavigation) {
     return (
      <>
        <main className="flex-1 bg-transparent text-foreground">
          {children}
        </main>
        <Toaster />
      </>
    );
  }


  return (
    <SidebarProvider defaultOpen={true}>
      {!isMobile && (
      <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r bg-sidebar/97">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Logo className="text-sidebar-primary-foreground group-data-[collapsible=icon]:hidden" />
            <div className="group-data-[collapsible=icon]:block hidden">
                 <Logo className="text-sidebar-primary-foreground" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <NavLinks />
        </SidebarContent>
        <SidebarFooter className="p-4">
           {role && (
            <>
              <Link href="/settings" asChild>
                <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Settings className="h-5 w-5 mr-2 group-data-[collapsible=icon]:mr-0" />
                    <span className="group-data-[collapsible=icon]:hidden font-body">Settings</span>
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => logout()} className="w-full justify-start group-data-[collapsible=icon]:justify-center text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <LogOut className="h-5 w-5 mr-2 group-data-[collapsible=icon]:mr-0" />
                <span className="group-data-[collapsible=icon]:hidden font-body">Logout</span>
              </Button>
            </>
           )}
          <div className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden font-body mt-2">
            © {new Date().getFullYear()} ArewaRide & Logistics
          </div>
        </SidebarFooter>
      </Sidebar>
      )}
      <SidebarInset className={cn("bg-background/95", showBottomNav ? "pb-16" : "")}>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
          <div className="flex items-center">
            {isMobile && shouldShowNavigation && role ? null : <SidebarTrigger className="md:hidden" /> }
          </div>
          <div className="flex items-center gap-2">
            {role && (
              <Link href="/settings" passHref>
                <Button variant="ghost" size="icon" aria-label="Settings">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
      {showBottomNav && <BottomNavigationBar />}
    </SidebarProvider>
  );
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  )
}

const Loader2 = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
