"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Sprout, 
  Cpu, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  CloudSun, 
  ScanLine, 
  Sparkles,
  Activity,
  Award
} from 'lucide-react';

const COMMODITY_TICKERS = [
  { crop: 'Organic Wheat (Hard Red)', price: '$224.50/MT', change: '+2.8%', up: true },
  { crop: 'Basmati Rice (Aromatic)', price: '$840.00/MT', change: '+1.4%', up: true },
  { crop: 'Non-GMO Soybeans', price: '$412.20/MT', change: '-0.6%', up: false },
  { crop: 'Hass Avocado (Grade A)', price: '$2.15/kg', change: '+3.9%', up: true },
  { crop: 'Fair-Trade Arabica Coffee', price: '$3.82/lb', change: '+4.1%', up: true },
];

export function LandingHero() {
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'market' | 'radar'>('diagnostic');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b">
      {/* Subtle organic ambient gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent/10 blur-3xl rounded-full" />
      </div>

      {/* Commodity Ticker Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-12">
        <div className="bg-muted/50 border rounded-xl py-2 px-3 overflow-x-auto scrollbar-none flex items-center gap-6 text-xs whitespace-nowrap">
          <div className="flex items-center gap-1.5 font-semibold text-primary shrink-0 pl-1">
            <Activity className="h-3.5 w-3.5 animate-pulse text-primary" />
            <span>LIVE COMMODITY INDEX:</span>
          </div>
          <div className="flex items-center gap-6 shrink-0 text-muted-foreground">
            {COMMODITY_TICKERS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-medium text-foreground">{item.crop}</span>
                <span className="font-mono font-semibold">{item.price}</span>
                <span className={`font-mono text-[11px] font-bold flex items-center ${item.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Sprout className="h-3.5 w-3.5" />
              <span>Next-Gen Agricultural Intelligence & Commerce</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Cultivate Smarter. <br />
              <span className="text-primary bg-clip-text">Trade Directly.</span> <br />
              Eliminate the Middleman.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              AgroByte unites over <strong className="text-foreground font-semibold">45,000+ growers, agronomists, and wholesale buyers</strong> on a single collaborative platform — featuring real-time AI disease scanning, fair-trade escrow marketplace, and hyperlocal crop weather advisory.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <Button size="lg" asChild className="gap-2 shadow-sm font-semibold h-12 px-6">
                <Link href="/marketplace">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Explore Direct Marketplace</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 h-12 px-6">
                <Link href="/ai-tools">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span>Test AI Crop Doctor</span>
                </Link>
              </Button>
            </div>

            {/* Trust points */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-primary">98.4%</p>
                <p className="text-xs text-muted-foreground">Diagnostic Accuracy</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-foreground">0%</p>
                <p className="text-xs text-muted-foreground">Broker Cut / Free Tier</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-mono text-accent">45,000+</p>
                <p className="text-xs text-muted-foreground">Verified Growers</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Telemetry Terminal */}
          <div className="lg:col-span-6 xl:col-span-5 w-full">
            <div className="relative rounded-2xl border bg-card p-4 sm:p-5 shadow-lg">
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    AgroByte System Hub
                  </span>
                </div>
                
                {/* Switchable Interactive Tabs */}
                <div className="flex p-0.5 rounded-lg bg-muted border text-xs font-medium">
                  <button 
                    onClick={() => setActiveTab('diagnostic')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'diagnostic' ? 'bg-background shadow-xs text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    AI Doctor
                  </button>
                  <button 
                    onClick={() => setActiveTab('market')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'market' ? 'bg-background shadow-xs text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Live Trade
                  </button>
                  <button 
                    onClick={() => setActiveTab('radar')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      activeTab === 'radar' ? 'bg-background shadow-xs text-primary font-bold' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Agro Weather
                  </button>
                </div>
              </div>

              {/* Tab 1: AI Doctor Interactive Demonstration */}
              {activeTab === 'diagnostic' && (
                <div className="space-y-3.5 animate-in">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border">
                    <Image
                      src="https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg"
                      alt="Agronomist scanning crop with digital terminal"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Vision bounding box overlay */}
                    <div className="absolute top-6 left-1/4 w-36 h-28 border-2 border-dashed border-accent/90 rounded-lg flex flex-col justify-between p-1.5 pointer-events-none animate-pulse">
                      <span className="text-[9px] font-mono bg-accent text-accent-foreground px-1 py-0.5 rounded font-bold self-start">
                        LEAF LESION DETECTED
                      </span>
                      <span className="text-[9px] font-mono bg-black/70 text-white px-1 py-0.5 rounded self-end">
                        CONF: 97.4%
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-0.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Instant Neural Vision Classification</span>
                      </div>
                      <p className="text-sm font-bold">Tomato Early Blight (Alternaria solani)</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/60 border text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Prescribed Intervention:</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                        Organic Compliant
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Apply organic copper hydroxide bio-spray within 48h. Prune lower canopy foliage at 15cm ground clearance to prevent splash reinfection.
                    </p>
                    <div className="pt-1 flex justify-end">
                      <Button size="sm" variant="secondary" className="h-7 text-xs gap-1" asChild>
                        <Link href="/ai-tools">
                          <ScanLine className="h-3.5 w-3.5" />
                          <span>Run Custom Scan</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Live Marketplace Demonstration */}
              {activeTab === 'market' && (
                <div className="space-y-3.5 animate-in">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden border">
                    <Image
                      src="https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg"
                      alt="Fresh agricultural harvest lot"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground flex items-center gap-1 shadow-sm">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Verified Farmer Lot</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs text-emerald-300 font-semibold">Direct Sourcing · Lot #4928</p>
                      <p className="text-sm font-bold">Heirloom Roma Tomatoes (Organic Certified)</p>
                      <p className="text-xs text-gray-200 mt-0.5">5,000 kg available · Ready for palletized dispatch</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/60 border text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-muted-foreground">Direct Farm Gate: </span>
                        <span className="text-base font-bold text-foreground font-mono">$1.45</span>
                        <span className="text-muted-foreground"> / kg</span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        +28% Farmer Gain vs Broker
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t">
                      <span className="text-muted-foreground">Escrow Payment Protection</span>
                      <Button size="sm" className="h-7 text-xs gap-1" asChild>
                        <Link href="/marketplace">
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>View Marketplace</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Agro Weather & Spray Window */}
              {activeTab === 'radar' && (
                <div className="space-y-3.5 animate-in">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-background to-accent/10 border space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CloudSun className="h-6 w-6 text-accent" />
                        <div>
                          <p className="text-sm font-bold text-foreground">Central Agrarian Valley</p>
                          <p className="text-xs text-muted-foreground">Micro-climate radar station #08</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold font-mono text-foreground">23.8°C</p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Optimal Range</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t">
                      <div className="p-2 rounded-lg bg-background border">
                        <p className="text-[11px] text-muted-foreground">Soil Moisture</p>
                        <p className="text-sm font-bold font-mono text-foreground">64%</p>
                      </div>
                      <div className="p-2 rounded-lg bg-background border">
                        <p className="text-[11px] text-muted-foreground">Wind Velocity</p>
                        <p className="text-sm font-bold font-mono text-foreground">6.2 km/h</p>
                      </div>
                      <div className="p-2 rounded-lg bg-background border">
                        <p className="text-[11px] text-muted-foreground">Evapotransp.</p>
                        <p className="text-sm font-bold font-mono text-foreground">3.8 mm/d</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                          Spraying Window: HIGHLY FAVORABLE
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">Until 17:30</span>
                    </div>
                  </div>

                  <div className="pt-1 flex justify-end">
                    <Button size="sm" variant="outline" className="h-7 text-xs gap-1" asChild>
                      <Link href="/weather">
                        <CloudSun className="h-3.5 w-3.5 text-primary" />
                        <span>Open Full Weather Radar</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* Bottom live stats footer */}
              <div className="mt-3 pt-3 border-t flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-accent" />
                  <span>ISO 22000 & Fair Trade Compliant</span>
                </span>
                <span className="font-mono">Sync: 12ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}