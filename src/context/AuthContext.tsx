
'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'admin' | 'passenger' | 'driver' | null;

interface AuthContextType {
  role: UserRole;
  login: (role: NonNullable<UserRole>, redirectTo?: string) => void;
  logout: (redirectTo?: string) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('userRole') as UserRole;
      if (storedRole) {
        setRole(storedRole);
      }
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((newRole: NonNullable<UserRole>, redirectTo?: string) => {
    try {
      localStorage.setItem('userRole', newRole);
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
    setRole(newRole);
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      // Default redirects
      if (newRole === 'admin') router.push('/admin-dashboard');
      else if (newRole === 'passenger') router.push('/passenger-dashboard');
      else if (newRole === 'driver') router.push('/driver-dashboard');
      else router.push('/');
    }
  }, [router]);

  const logout = useCallback((redirectTo: string = '/') => {
    try {
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error("Could not access localStorage:", error);
    }
    setRole(null);
    router.push(redirectTo);
  }, [router]);

  return (
    <AuthContext.Provider value={{ role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
