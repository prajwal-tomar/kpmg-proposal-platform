'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, User } from 'lucide-react';

type UserRole = 'coordinator' | 'contributor';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: Record<UserRole, NavLink[]> = {
  coordinator: [
    { name: 'Dashboard', href: '/coordinator-dashboard' },
    { name: 'Create New Proposal', href: '/new-proposal' },
    { name: 'Team Overview', href: '/team' },
  ],
  contributor: [
    { name: 'Dashboard', href: '/contributor-dashboard' },
    { name: 'My Tasks', href: '/my-tasks' },
    { name: 'Upload Response', href: '/upload' },
  ],
};

const Header = ({ userRole = 'coordinator' }: { userRole?: UserRole }) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* KPMG Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/kpmg-logo.png"
              alt="KPMG Logo"
              width={150}
              height={60}
              className="h-24 w-auto"
              priority
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            {navLinks[userRole].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === link.href
                    ? 'text-[#005EB8] border-b-2 border-[#005EB8]'
                    : 'text-[#00338D] hover:text-[#0091DA]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center">
            {/* Search Bar (for Coordinators) */}
            {userRole === 'coordinator' && (
              <div className="relative mr-4">
                <Input
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:border-transparent ${
                    searchExpanded ? 'w-64' : 'w-48'
                  } transition-all duration-300`}
                  onFocus={() => setSearchExpanded(true)}
                  onBlur={() => setSearchExpanded(false)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            )}

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-[#00338D]" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#470A68] rounded-full">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>New task assigned</DropdownMenuItem>
                <DropdownMenuItem>Feedback requested</DropdownMenuItem>
                <DropdownMenuItem>Proposal milestone reached</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-4">
                  <User className="h-5 w-5 text-[#00338D]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-[#6D2077]">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
