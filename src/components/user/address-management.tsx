
"use client";

import { useState } from 'react';
// import { defaultAddress } from '@/lib/data'; // Removed default import
import type { Address } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit2, Trash2, Home } from 'lucide-react';
// Mock a form for adding/editing addresses, or use a dialog
// For now, just displaying and mock actions

const AddressManagement = () => {
  // In a real app, fetch addresses for the logged-in user
  const [addresses, setAddresses] = useState<Address[]>([]); // Initialize with empty array
  const [editingAddress, setEditingAddress] = useState<Address | null>(null); // For a modal/form

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === addressId })));
    // API call to update default address
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    // API call to delete address
  };

  if (addresses.length === 0) {
    return (
       <Card>
        <CardHeader>
            <CardTitle className="font-headline">Manage Addresses</CardTitle>
            <CardDescription>You haven&apos;t added any addresses yet.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
            </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Manage Addresses</CardTitle>
        <CardDescription>Add, edit, or remove your shipping addresses.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.map(address => (
          <Card key={address.id} className="p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{address.street}</p>
                <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-sm text-muted-foreground">{address.country}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingAddress(address)} aria-label="Edit address">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)} aria-label="Delete address">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            {address.isDefault && (
              <div className="mt-2 flex items-center text-sm text-green-600">
                <Home className="mr-1 h-4 w-4" /> Default Address
              </div>
            )}
            {!address.isDefault && (
              <Button variant="link" size="sm" onClick={() => handleSetDefault(address.id)} className="mt-2 p-0 h-auto text-primary">
                Set as Default
              </Button>
            )}
          </Card>
        ))}
      </CardContent>
      <CardFooter>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </CardFooter>
      {/* Add Modal/Dialog for editing/adding address here, using `editingAddress` state */}
    </Card>
  );
};

export default AddressManagement;
