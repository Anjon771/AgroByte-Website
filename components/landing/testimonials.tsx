"use client";

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Quote, Star, ArrowUpRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Bypassing the regional produce broker cartel through AgroByte increased my net farm gate margin by 42%. The escrow system ensures I receive guaranteed wire payouts the moment the shipment dock signs off.",
    name: "Rajiv Patel",
    role: "Organic Horticulture Grower",
    farm: "Sunburst Farms · 85 Acres",
    metric: "+42% Net Margin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    location: "Punjab, India"
  },
  {
    quote: "When sudden yellowing hit my greenhouse tomatoes, the AI crop doctor diagnosed Early Blight within two seconds and prescribed a copper hydroxide protocol. Saved nearly $34,000 worth of harvest.",
    name: "Sarah Lindqvist",
    role: "Protected Agriculture Specialist",
    farm: "Nordic Greens · 12 Hectares",
    metric: "Saved 90% Yield",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    location: "Skåne, Sweden"
  },
  {
    quote: "We source heirloom grains and cold-pressed olive oils directly from 28 certified growers on AgroByte for our restaurant group. The batch lab certificates and cold-chain logging are superior to any broker.",
    name: "Elena Rostova",
    role: "Procurement & Culinary Director",
    farm: "Artisan Hospitality Group",
    metric: "$180k Direct Sourced",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    location: "Valencia, Spain"
  }
];

export function LandingTestimonials() {
  return (
    <section className="w-full py-16 md:py-24 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Agrarian Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Proven Results Across Fields & Continents
          </h2>
          <p className="text-base text-muted-foreground">
            Hear how growers, cooperatives, and commercial buyers leverage AgroByte daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <Card key={index} className="flex flex-col justify-between border bg-card p-6 rounded-2xl shadow-xs card-hover">
              <CardContent className="p-0 space-y-4">
                {/* Metric pill and rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {item.metric}
                  </span>
                </div>

                {/* Quote text */}
                <div className="relative">
                  <p className="text-sm text-foreground/90 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </CardContent>

              {/* Author footer */}
              <div className="pt-5 border-t mt-6 flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-full overflow-hidden border border-primary/30 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                    <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{item.role}</p>
                  <p className="text-[11px] text-muted-foreground/80 font-mono truncate">{item.farm} · {item.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}