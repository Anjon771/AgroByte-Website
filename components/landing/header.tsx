"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/components/language-provider';
import { useAuth } from '@/components/auth-provider';
import { 
  Menu, 
  X, 
  Sprout, 
  ShoppingBag, 
  Cpu, 
  CloudSun, 
  GraduationCap, 
  Users2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { href: '/ai-tools', label: 'AI Crop Doctor', icon: Cpu, badge: 'AI' },
    { href: '/weather', label: 'Agro Weather', icon: CloudSun },
    { href: '/learning', label: 'Academy', icon: GraduationCap },
    { href: '/dashboard', label: 'Community', icon: Users2 },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b shadow-xs' 
          : 'bg-background/60 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <Sprout className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight flex items-center gap-1.5">
              AgroByte
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Ecosystem
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  isActive 
                    ? 'text-primary bg-primary/10 font-semibold' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <Icon className="h-4 w-4 opacity-70" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1 rounded-sm bg-accent text-accent-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="hidden md:flex items-center space-x-3">
          <LanguageToggle />
          <ThemeToggle />
          
          {user ? (
            <Button size="sm" asChild className="gap-1.5">
              <Link href="/dashboard">
                <span>Dashboard</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">{t('cta.login')}</Link>
              </Button>
              <Button size="sm" asChild className="gap-1.5 shadow-xs">
                <Link href="/auth/signup">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b bg-background/95 backdrop-blur-md px-4 py-4 space-y-3 animate-in">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t flex flex-col gap-2">
            <div className="flex items-center justify-between py-1">
              <span className="text-xs text-muted-foreground">Display Language</span>
              <LanguageToggle />
            </div>

            {user ? (
              <Button className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/auth/login">{t('cta.login')}</Link>
                </Button>
                <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                  <Link href="/auth/signup">Join Free</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}