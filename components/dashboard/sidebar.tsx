"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth-provider';
import { cn } from '@/lib/utils';
import { 
  Home, 
  ShoppingBag, 
  GraduationCap, 
  MessageSquare, 
  Cpu, 
  CloudSun, 
  BookOpen, 
  Presentation, 
  ShieldAlert,
  Sparkles,
  Leaf
} from 'lucide-react';

const sidebarLinks = [
  {
    title: 'Home Feed',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Marketplace',
    href: '/marketplace',
    icon: ShoppingBag,
    badge: 'Live',
  },
  {
    title: 'Academy',
    href: '/learning',
    icon: GraduationCap,
  },
  {
    title: 'Field Discussions',
    href: '/messages',
    icon: MessageSquare,
  },
  {
    title: 'AI Diagnostic Doctor',
    href: '/ai-tools',
    icon: Cpu,
    highlight: true,
  },
  {
    title: 'Agro Weather',
    href: '/weather',
    icon: CloudSun,
  }
];

// Role-specific links
const farmerLinks = [
  {
    title: 'Krishi Farm Diary',
    href: '/dashboard/diary',
    icon: BookOpen,
  }
];

const teacherLinks = [
  {
    title: 'Curriculum & Courses',
    href: '/dashboard/courses',
    icon: Presentation,
  }
];

const adminLinks = [
  {
    title: 'Admin Oversight',
    href: '/admin',
    icon: ShieldAlert,
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Get role-specific links based on user role
  const getRoleSpecificLinks = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'farmer':
        return farmerLinks;
      case 'teacher':
        return teacherLinks;
      case 'admin':
        return adminLinks;
      default:
        return [];
    }
  };
  
  const roleSpecificLinks = getRoleSpecificLinks();
  
  return (
    <aside className="hidden md:block w-64 border-r min-h-[calc(100vh-4rem)] bg-card/50 p-4 shrink-0">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
            Navigation
          </p>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group',
                    isActive
                      ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                      : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                    <span>{link.title}</span>
                  </div>
                  {link.badge && (
                    <span className={cn(
                      "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                    )}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {roleSpecificLinks.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
              Role Controls ({user?.role})
            </p>
            <nav className="space-y-1">
              {roleSpecificLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group',
                      isActive
                        ? 'bg-primary text-primary-foreground font-semibold shadow-xs'
                        : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    )}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                    <span>{link.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Agronomic Quick Tip Card */}
        <div className="p-3.5 rounded-2xl border bg-muted/30 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Leaf className="h-3.5 w-3.5" />
            <span>Seasonal Tip</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Optimal tebuconazole application window closes in 48h before the forecasted rainfall.
          </p>
        </div>
      </div>
    </aside>
  );
}