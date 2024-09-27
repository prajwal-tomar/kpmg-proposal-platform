'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement email/password login logic here
    console.log("Email login initiated with:", email);
  };

  const handleSSOLogin = () => {
    // Implement SSO login logic here
    console.log("SSO login initiated");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        {/* <div className="pt-5">
        <Image
              src="/images/kpmg-logo.png"
              alt="KPMG Logo"
              width={150}
              height={60}
              className="h-24 w-auto"
              priority
            />
        </div> */}
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
            <Button 
              type="submit"
              className="w-full mt-6 bg-[#00338D] hover:bg-[#005EB8] text-white"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="w-full text-center mb-4">
            <span className="text-gray-500">or</span>
          </div>
          <Button 
            variant="outline"
            className="w-full border-[#00338D] text-[#00338D] hover:bg-[#00338D] hover:text-white"
            onClick={handleSSOLogin}
          >
            Sign in with SSO
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-8 text-sm text-gray-500">
        Need help? Contact IT Support
      </p>
    </div>
  );
};

export default LoginComponent;
