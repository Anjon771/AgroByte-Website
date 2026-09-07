"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Cpu, 
  ShoppingBag, 
  CloudSun, 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  Droplets,
  Wind,
  Search
} from 'lucide-react';

const SAMPLE_PATHOLOGIES = [
  {
    id: 'sds',
    crop: 'Soybean',
    disease: 'Sudden Death Syndrome (SDS)',
    pathogen: 'Fusarium virguliforme',
    confidence: '96.2%',
    treatment: 'Apply fluopyram seed treatment; enhance drainage.',
    img: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg'
  },
  {
    id: 'rust',
    crop: 'Wheat',
    disease: 'Stripe Leaf Rust',
    pathogen: 'Puccinia striiformis',
    confidence: '94.8%',
    treatment: 'Early foliar tebuconazole application; rust-resistant cultivars.',
    img: 'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg'
  },
  {
    id: 'blight',
    crop: 'Tomato',
    disease: 'Late Blight',
    pathogen: 'Phytophthora infestans',
    confidence: '98.5%',
    treatment: 'Organic copper hydroxide spray; remove infected lower leaves.',
    img: 'https://images.pexels.com/photos/7658420/pexels-photo-7658420.jpeg'
  }
];

export function LandingFeatures() {
  const [activePathology, setActivePathology] = useState(SAMPLE_PATHOLOGIES[0]);

  return (
    <section id="features" className="w-full py-16 md:py-28 bg-muted/20 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Four Pillars of AgroByte</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Everything Required to Modernize Your Farm Yield & Bottom Line
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Eliminate guesswork in your fields. AgroByte blends state-of-the-art computer vision, verified direct-to-consumer trading, and hyperlocal agro-meteorology into one streamlined workspace.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: Interactive AI Diagnostic Doctor (Span 7) */}
          <div className="md:col-span-7 rounded-2xl border bg-card p-6 sm:p-8 flex flex-col justify-between shadow-xs card-hover">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Sub-second Neural Inference
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  AI Crop Pathology & Instant Treatment Protocol
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Identify 80+ crop diseases in under 800 milliseconds. Get dual-stream recommendations: certified organic biological interventions or targeted synthetic treatments.
                </p>
              </div>

              {/* Interactive Pathology Tester */}
              <div className="mt-4 pt-4 border-t space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Try Sample Leaf Diagnostic:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PATHOLOGIES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActivePathology(item)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                        activePathology.id === item.id 
                          ? 'bg-primary text-primary-foreground border-primary shadow-xs' 
                          : 'bg-muted/50 hover:bg-muted text-foreground'
                      }`}
                    >
                      {item.crop}: {item.disease}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-3 p-4 rounded-xl bg-muted/40 border">
                  <div className="sm:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden border">
                    <Image
                      src={activePathology.img}
                      alt={activePathology.disease}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                      Conf: {activePathology.confidence}
                    </div>
                  </div>
                  <div className="sm:col-span-7 flex flex-col justify-center space-y-1.5 text-xs">
                    <span className="text-primary font-bold">{activePathology.crop} · {activePathology.pathogen}</span>
                    <h4 className="text-sm font-bold text-foreground">{activePathology.disease}</h4>
                    <p className="text-muted-foreground leading-snug">
                      <strong className="text-foreground">Protocol: </strong>{activePathology.treatment}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t mt-6">
              <span className="text-xs text-muted-foreground">Trained on 1.2M validated field specimens</span>
              <Button variant="ghost" size="sm" asChild className="gap-1 text-primary">
                <Link href="/ai-tools">
                  <span>Open Full AI Scanner</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bento Item 2: Fair-Trade Escrow Marketplace (Span 5) */}
          <div className="md:col-span-5 rounded-2xl border bg-card p-6 sm:p-8 flex flex-col justify-between shadow-xs card-hover">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                  Escrow Protected
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Direct Farm-to-Buyer Wholesale Commerce
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Bypass predatory regional cartels. Farmers receive 100% of agreed lot prices upon delivery verification, with automated bill of lading and logistics tracking.
                </p>
              </div>

              <div className="space-y-2.5 pt-3">
                <div className="p-3 rounded-xl border bg-muted/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="font-semibold text-foreground">Verified Organic Produce</span>
                  </div>
                  <span className="font-mono text-emerald-600 font-bold">0% Comm.</span>
                </div>
                <div className="p-3 rounded-xl border bg-muted/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">Live Commodity Price Discovery</span>
                  </div>
                  <span className="text-muted-foreground">Real-Time</span>
                </div>
                <div className="p-3 rounded-xl border bg-muted/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-foreground">Stripe & Local Bank Payouts</span>
                  </div>
                  <span className="text-muted-foreground">Instant</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t mt-6 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Over $12M traded safely</span>
              <Button size="sm" asChild className="gap-1">
                <Link href="/marketplace">
                  <span>Browse Lots</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bento Item 3: Hyperlocal Agro-Weather Radar (Span 4) */}
          <div className="md:col-span-4 rounded-2xl border bg-card p-6 sm:p-7 flex flex-col justify-between shadow-xs card-hover">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <CloudSun className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Micro-Climate Agro Weather
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Real-time spraying window calculations based on leaf wetness, wind drift velocity, soil temperature, and upcoming rain probability.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-muted/40 border text-center">
                  <p className="text-[11px] text-muted-foreground">Dew Point</p>
                  <p className="font-mono font-bold text-foreground text-sm">11.4°C</p>
                </div>
                <div className="p-2.5 rounded-lg bg-muted/40 border text-center">
                  <p className="text-[11px] text-muted-foreground">Spraying Suitability</p>
                  <p className="font-mono font-bold text-emerald-600 text-sm">94% (High)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t mt-4">
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <Link href="/weather">View Weather Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Bento Item 4: Farmer Knowledge Academy (Span 4) */}
          <div className="md:col-span-4 rounded-2xl border bg-card p-6 sm:p-7 flex flex-col justify-between shadow-xs card-hover">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Krishi Masterclasses & Field Guides
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Access 140+ expert-led video modules covering drip fertigation, organic pest deterrence, soil micro-biome restoration, and export compliance.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border text-xs space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Regenerative Soil Health</span>
                  <span className="text-primary">12 Lessons</span>
                </div>
                <p className="text-muted-foreground text-[11px]">Led by Dr. Amina Khalid (Senior Agronomist)</p>
              </div>
            </div>

            <div className="pt-4 border-t mt-4">
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <Link href="/learning">Explore Academy Courses</Link>
              </Button>
            </div>
          </div>

          {/* Bento Item 5: Agrarian Community & Discussion (Span 4) */}
          <div className="md:col-span-4 rounded-2xl border bg-card p-6 sm:p-7 flex flex-col justify-between shadow-xs card-hover">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Global Farmer Cooperative Feed
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Share photos, compare regional harvest yields, ask peers about local pest outbreaks, and celebrate agricultural milestones together.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border text-xs flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                  🌾
                </div>
                <div>
                  <p className="font-semibold text-foreground">Krishi Diary & Field Logs</p>
                  <p className="text-[11px] text-muted-foreground">Real-time collaboration across 38 countries</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t mt-4">
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <Link href="/dashboard">Join Community Feed</Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}