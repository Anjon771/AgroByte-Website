"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useAuth } from '@/components/auth-provider';
import { useLanguage } from '@/components/language-provider';
import { 
  Sprout, 
  Bell, 
  MessageSquare, 
  Menu, 
  X, 
  Search,
  Home,
  ShoppingBag,
  GraduationCap,
  Cpu,
  CloudSun
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : 'U';

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight hidden sm:inline-block">AgroByte</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1 flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search produce lots, disease diagnoses, academy courses..."
              className="w-full pl-9 bg-muted/40 rounded-xl border-muted-foreground/20 text-xs focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSearchBar(!showSearchBar)}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="rounded-xl">
            <Link href="/messages">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild className="rounded-xl">
            <Link href="/notifications">
              <div className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-mono font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
          
          <LanguageToggle />
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 ml-1 border border-primary/20">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-lg">
              <DropdownMenuLabel>
                <p className="font-semibold text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground font-normal capitalize">{user?.role || 'Member'}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              {user?.role === 'farmer' && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/diary">Krishi Diary</Link>
                </DropdownMenuItem>
              )}
              {user?.role === 'admin' && (
                <DropdownMenuItem asChild>
                  <Link href="/admin">Admin Panel</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {showSearchBar && (
        <div className="md:hidden px-4 py-2 border-b bg-card">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-muted/50 rounded-xl"
              autoFocus
            />
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-card animate-in p-4 space-y-2">
          <nav>
            <ul className="space-y-1 text-sm font-medium">
              <li>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-4 w-4 text-primary" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/marketplace" 
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4 text-accent" />
                  <span>Marketplace</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/learning" 
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <GraduationCap className="h-4 w-4 text-amber-500" />
                  <span>Learning</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/messages" 
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/ai-tools" 
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Cpu className="h-4 w-4 text-primary" />
                  <span>AI Tools</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/weather" 
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <CloudSun className="h-4 w-4 text-blue-500" />
                  <span>Weather</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}