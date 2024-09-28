'use client'

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClientComponentClient();

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else if (pathname !== '/login') {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        if (pathname !== '/login') {
          router.push('/login');
        }
      }
    });

    checkAuth();

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [supabase, router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!isAuthenticated && pathname !== '/login') {
    return null; // Don't render children if not authenticated and not on login page
  }

  return <>{children}</>;
}