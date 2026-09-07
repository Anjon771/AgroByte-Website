"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

export type UserRole = 'general' | 'farmer' | 'buyer' | 'expert' | 'teacher' | 'weather' | 'admin';

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ user: SupabaseUser | null; session: Session | null; }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local fallback user first
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('agrobyte_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          setIsLoading(false);
        } catch {
          // ignore parsing error
        }
      }
    }

    // Timeout safety so loading spinner never blocks the app indefinitely
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const res = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              const appUser: AppUser = {
                id: session.user.id,
                name: profile.name,
                email: session.user.email!,
                role: profile.role,
                avatar: profile.avatar_url
              };
              setUser(appUser);
              if (typeof window !== 'undefined') {
                localStorage.setItem('agrobyte_user', JSON.stringify(appUser));
              }
            }
          } catch {
            // Profile fetch error, continue
          }
        }
        setIsLoading(false);
      });
      subscription = res.data.subscription;
    } catch {
      setIsLoading(false);
    }

    return () => {
      clearTimeout(timer);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
      if (isPlaceholder) {
        const demoUser: AppUser = {
          id: 'demo-user-1',
          name: email.split('@')[0] || 'Demo User',
          email,
          role: 'farmer',
        };
        setUser(demoUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('agrobyte_user', JSON.stringify(demoUser));
        }
        router.push('/dashboard');
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const isPlaceholder = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
      if (isPlaceholder) {
        const demoUser: AppUser = {
          id: 'demo-' + Date.now(),
          name,
          email,
          role,
        };
        setUser(demoUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('agrobyte_user', JSON.stringify(demoUser));
        }
        return { user: { id: demoUser.id, email: demoUser.email } as any, session: null };
      }

      // First, sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user data returned');

      // Create profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            name,
            role,
            email,
          },
        ]);

      if (profileError) {
        // If profile creation fails, delete the auth user to maintain consistency
        await supabase.auth.admin.deleteUser(data.user.id);
        throw new Error('Failed to create user profile. Please try again.');
      }

      return { user: data.user, session: data.session };
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('agrobyte_user');
      }
      try {
        await supabase.auth.signOut();
      } catch {
        // ignore sign out error
      }
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}