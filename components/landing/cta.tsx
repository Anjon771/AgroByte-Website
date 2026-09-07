"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sprout, Sparkles, Shield, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LandingCTA() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      router.push(`/auth/signup?email=${encodeURIComponent(email)}`);
    } else {
      router.push('/auth/signup');
    }
  };

  return (
    <section className="w-full py-20 md:py-32 bg-muted/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(46,125,50,0.15),rgba(255,255,255,0))]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border bg-card/95 backdrop-blur-sm p-8 sm:p-14 shadow-lg text-center space-y-8 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Sprout className="h-4 w-4" />
              <span>Ready for the Next Generation of Agriculture?</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Cultivate Smarter. Trade Direct. Protect Every Harvest.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Join over 45,000 independent growers and commercial buyers modernizing their farms with AI diagnostics and escrow-backed fair trade.
            </p>
          </div>

          {/* Quick Start Form */}
          <form onSubmit={handleStart} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your farm or business email..."
              className="flex-1 px-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            />
            <Button type="submit" size="lg" className="rounded-xl px-6 font-semibold shadow-xs">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          {/* Value badges */}
          <div className="pt-4 border-t flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Escrow buyer protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Free instant AI diagnosis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}