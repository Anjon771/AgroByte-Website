"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth-provider';
import { Sprout, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: 'Login successful',
        description: 'Welcome back to AgroByte!',
      });
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your email and password and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'farmer' | 'expert') => {
    setIsLoading(true);
    const demoEmail = role === 'farmer' ? 'farmer.john@agrobyte.farm' : 'sarah.ahmed@agrobyte.farm';
    form.setValue('email', demoEmail);
    form.setValue('password', 'password123');
    
    try {
      await login(demoEmail, 'password123');
      toast({
        title: `Signed in as Demo ${role === 'farmer' ? 'Farmer' : 'Agronomist'}`,
        description: 'Redirecting to your farm dashboard...',
      });
      router.push('/dashboard');
    } catch {
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 p-2 rounded-2xl bg-card border shadow-xs hover:border-primary/50 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-foreground pr-2">AgroByte</span>
          </Link>
          <p className="text-xs text-muted-foreground">The Regenerative Agricultural Intelligence Operating System</p>
        </div>
        
        <Card className="rounded-2xl border bg-card shadow-xs overflow-hidden">
          <CardHeader className="p-6 pb-4 text-center">
            <CardTitle className="text-2xl font-black text-foreground">Welcome back</CardTitle>
            <CardDescription className="text-xs">
              Sign in to manage your farm sensors, diagnostics, and harvest lots.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-0 space-y-5">
            {/* Quick One-Tap Demo Access */}
            <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-foreground">
                <span className="flex items-center gap-1.5 text-primary">
                  <UserCheck className="h-4 w-4" />
                  Instant Preview Access
                </span>
                <span className="text-[10px] text-muted-foreground">No password needed</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl text-xs h-8 bg-card"
                  onClick={() => handleDemoLogin('farmer')}
                  disabled={isLoading}
                >
                  Farmer Account
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl text-xs h-8 bg-card"
                  onClick={() => handleDemoLogin('expert')}
                  disabled={isLoading}
                >
                  Agronomist Account
                </Button>
              </div>
            </div>

            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 rounded-xl p-1 bg-muted">
                <TabsTrigger value="email" className="rounded-lg text-xs font-semibold">Email</TabsTrigger>
                <TabsTrigger value="phone" className="rounded-lg text-xs font-semibold">Phone SMS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="email">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="farmer@agrobyte.farm" className="rounded-xl text-xs h-10" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel className="text-xs font-semibold">Password</FormLabel>
                            <Link href="#" onClick={(e) => { e.preventDefault(); toast({ title: 'Password Reset', description: 'Reset instructions have been sent to your registered email.' }); }} className="text-xs text-primary hover:underline font-medium">
                              Forgot?
                            </Link>
                          </div>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" className="rounded-xl text-xs h-10" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full rounded-xl font-semibold h-10 shadow-xs mt-2" disabled={isLoading}>
                      {isLoading ? 'Authenticating...' : 'Sign in to AgroByte'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="phone">
                <div className="p-6 rounded-xl border border-dashed text-center space-y-2">
                  <p className="text-xs text-muted-foreground">Cellular SMS OTP login available in regional deployment regions.</p>
                  <Button variant="outline" size="sm" className="rounded-xl text-xs" onClick={() => toast({ title: 'SMS Verification', description: 'SMS Gateway operational for connected telecom providers.' })}>
                    Request OTP
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="p-6 border-t bg-muted/20 flex justify-center">
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account yet?{' '}
              <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}