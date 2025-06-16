
"use client";

import { useAuth } from '@/contexts/auth-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import OrderHistory from '@/components/user/order-history';
import AddressManagement from '@/components/user/address-management';
import PaymentMethodsList from '@/components/user/payment-methods-list'; // Renamed to avoid conflict
import { User, Settings, ShoppingBag, MapPin, CreditCard, LogOut } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

import { Suspense } from 'react';
export default function AccountPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  
  // Local state for profile editing
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);


  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (user) {
        setName(user.name);
        setEmail(user.email);
    }
    const tabParam = searchParams.get('tab');
    if (tabParam) {
        setActiveTab(tabParam);
    }

  }, [user, authLoading, router, searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/account?tab=${value}`, { scroll: false });
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to update profile
    console.log("Updating profile:", { name, email });
    // Potentially update user in AuthContext
    setIsEditingProfile(false);
    // toast({ title: "Profile Updated" });
  };


  if (authLoading || !user) {
    return (
        <div className="container mx-auto py-12">
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/4" />
                <Skeleton className="h-8 w-1/2" />
                <div className="grid grid-cols-4 gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    );
  }


  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">My Account</h1>
        <p className="text-muted-foreground">Manage your profile, orders, and settings.</p>
      </div>

      <Suspense fallback={<div>Loading account details...</div>}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2"><Settings className="h-4 w-4" />Profile</TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2"><ShoppingBag className="h-4 w-4" />Orders</TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2"><MapPin className="h-4 w-4" />Addresses</TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2"><CreditCard className="h-4 w-4" />Payment</TabsTrigger>
          <TabsTrigger value="logout" onClick={logout} className="text-destructive flex items-center gap-2"><LogOut className="h-4 w-4" />Logout</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditingProfile} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditingProfile} />
                </div>
                {isEditingProfile ? (
                    <div className="flex gap-2">
                        <Button type="submit">Save Changes</Button>
                        <Button variant="outline" onClick={() => { setIsEditingProfile(false); setName(user.name); setEmail(user.email); }}>Cancel</Button>
                    </div>
                ) : (
                    <Button onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
                )}
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="addresses">
          <AddressManagement />
        </TabsContent>

        <TabsContent value="payment">
          <PaymentMethodsList />
        </TabsContent>
        
        {/* Logout is handled by the trigger, no content needed for this tab */}
        <TabsContent value="logout"></TabsContent> 
      </Tabs>
      </Suspense>
    </div>
  );
}
