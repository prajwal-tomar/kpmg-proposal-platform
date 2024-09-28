'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);
    };
    checkSession();
  }, [supabase.auth]);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Attempting to log in user with email:", email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Sign in successful:", data);

      if (data.user) {
        try {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', data.user.id)
            .single();

          console.log("User role data:", roleData);

          if (roleError) {
            console.error('Error fetching user role:', roleError);
            router.push('/default-dashboard');
            return;
          }

          let redirectPath = '/default-dashboard';
          switch (roleData?.role) {
            case 'coordinator':
              redirectPath = '/coordinator-dashboard';
              break;
            case 'contributor':
              redirectPath = '/contributor-dashboard';
              break;
            case 'admin':
              redirectPath = '/admin';
              break;
            default:
              console.warn('Unknown user role:', roleData?.role);
          }

          console.log("Redirecting to:", redirectPath);
          router.push(redirectPath);
        } catch (roleError) {
          console.error('Error in role query:', roleError);
          router.push('/default-dashboard');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <h1 className="text-2xl font-bold text-[#00338D] my-6 text-center">
            Welcome to KPMG Proposal Platform
          </h1>
          <form onSubmit={handleEmailLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button 
              type="submit"
              className="w-full mt-6 bg-[#00338D] hover:bg-[#005EB8] text-white"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="mt-4 text-sm text-gray-500">
            Need help? Contact IT Support
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginComponent;
