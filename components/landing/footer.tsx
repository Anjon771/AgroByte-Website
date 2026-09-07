import React from 'react';
import Link from 'next/link';
import { Sprout, ShieldCheck, Globe, Activity } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="w-full py-12 md:py-16 bg-card border-t text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">AgroByte</span>
            </Link>
            
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              The modern agricultural intelligence and decentralized trade platform connecting independent farmers, certified agronomists, and commercial wholesale buyers worldwide.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AgroByte Grid: All 12 Regional Hubs Operational</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Ecosystem</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/marketplace" className="hover:text-primary transition-colors">
                  Wholesale Marketplace
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="hover:text-primary transition-colors">
                  AI Disease Diagnosis
                </Link>
              </li>
              <li>
                <Link href="/weather" className="hover:text-primary transition-colors">
                  Agro Weather Radar
                </Link>
              </li>
              <li>
                <Link href="/learning" className="hover:text-primary transition-colors">
                  Krishi Academy
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Farmer Community Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Compliance */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Compliance & Safety</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Escrow Guarantee (ISO 22000)
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Phytosanitary Certificates
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Fair Farm Margin Index
                </span>
              </li>
              <li>
                <span className="hover:text-primary transition-colors cursor-pointer">
                  Cold-Chain Traceability
                </span>
              </li>
            </ul>
          </div>

          {/* Account & Access */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Account</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/auth/login" className="hover:text-primary transition-colors">
                  Grower Portal Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-primary transition-colors">
                  Register Farm Account
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Operational Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AgroByte Agritech Inc. Precision farming & direct agriculture exchange.</p>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:text-foreground">Privacy Protocol</span>
            <span className="cursor-pointer hover:text-foreground">Terms of Exchange</span>
            <span className="cursor-pointer hover:text-foreground">Security Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}