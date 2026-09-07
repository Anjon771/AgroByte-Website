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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth, UserRole } from '@/components/auth-provider';
import { Sprout } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
  role: z.enum(['general', 'farmer', 'buyer', 'expert', 'teacher', 'weather', 'admin'] as const),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const { toast } = useToast();
  const { signup } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'general',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await signup(data.name, data.email, data.password, data.role);
      toast({
        title: 'Verification email sent!',
        description: 'Please check your email for the verification code.',
      });
      router.push(`/auth/verify?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: 'Registration failed',
        description: error.message || 'There was a problem creating your account.',
        variant: 'destructive',
      });
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
          <p className="text-xs text-muted-foreground">Join the global agricultural and regenerative intelligence community</p>
        </div>
        
        <Card className="rounded-2xl border bg-card shadow-xs overflow-hidden">
          <CardHeader className="p-6 pb-4 text-center">
            <CardTitle className="text-2xl font-black text-foreground">Create account</CardTitle>
            <CardDescription className="text-xs">
              Access AI foliar diagnostics, local weather index, and trade markets
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Tariq Rahman" className="rounded-xl text-xs h-10" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="tariq@agrobyte.farm" className="rounded-xl text-xs h-10" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" className="rounded-xl text-xs h-10" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" className="rounded-xl text-xs h-10" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">I am a</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl text-xs h-10">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="farmer">Farmer / Cultivator</SelectItem>
                          <SelectItem value="buyer">Grain & Crop Buyer</SelectItem>
                          <SelectItem value="expert">Agricultural Scientist</SelectItem>
                          <SelectItem value="teacher">Educator / Agronomist</SelectItem>
                          <SelectItem value="weather">Meteorology Specialist</SelectItem>
                          <SelectItem value="general">General Agrarian</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-xl font-semibold h-10 shadow-xs mt-2" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="p-6 border-t bg-muted/20 flex justify-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}