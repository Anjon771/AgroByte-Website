"use client";

import React from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Feed } from '@/components/dashboard/feed';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/auth-provider';
import { Sprout, TrendingUp, Sun, Droplets, AlertTriangle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  const currentUser = user || {
    id: 'demo_farmer_1',
    name: 'Tariq Rahman',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full space-y-8">
          
          {/* Welcome Banner with Real-time Field Telemetry */}
          <div className="rounded-2xl border bg-card p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Farm Operations Active · GPS Hub Online</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Here is your farm daily overview and verified community agronomy field reports.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button asChild size="sm" className="rounded-xl shadow-xs font-semibold">
                  <Link href="/ai-tools">
                    <Sprout className="h-4 w-4 mr-1.5" />
                    Scan Foliage
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="rounded-xl">
                  <Link href="/marketplace">
                    Marketplace
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Micro Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t">
              <div className="p-3.5 rounded-xl bg-muted/40 border space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  <span>Field Microclimate</span>
                </div>
                <div className="text-lg font-bold text-foreground">26°C · Sunny</div>
                <div className="text-[10px] text-muted-foreground">Optimal spraying window</div>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Droplets className="h-3.5 w-3.5 text-blue-500" />
                  <span>Soil Moisture</span>
                </div>
                <div className="text-lg font-bold text-foreground">68% Available</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Adequate root zone</div>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Wheat Mandi Index</span>
                </div>
                <div className="text-lg font-bold text-foreground">$234 / Ton</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+2.8% this week</div>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  <span>Regional Alert</span>
                </div>
                <div className="text-lg font-bold text-foreground">Rust Spore Risk</div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Low to Medium</div>
              </div>
            </div>
          </div>

          <Feed />
        </main>
      </div>
    </div>
  );
}