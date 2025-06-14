
"use client";

import { useState } from 'react';
import { defaultPaymentMethod } from '@/lib/data';
import type { PaymentMethod } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit2, Trash2, CreditCard, CheckCircle } from 'lucide-react';
// Mock data and actions for now

const PaymentMethodsList = () => {
  // In a real app, fetch payment methods for the logged-in user
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([defaultPaymentMethod]);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);

  const handleSetDefault = (paymentMethodId: string) => {
    setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: pm.id === paymentMethodId })));
    // API call
  };

  const handleDelete = (paymentMethodId: string) => {
    setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
    // API call
  };

  if (paymentMethods.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Payment Methods</CardTitle>
          <CardDescription>You haven&apos;t added any payment methods yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Payment Method
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Payment Methods</CardTitle>
        <CardDescription>Manage your saved payment methods.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.map(pm => (
          <Card key={pm.id} className="p-4 shadow-sm flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">
                  {pm.type === 'credit_card' ? `Card ending in •••• ${pm.last4}` : 'PayPal Account'}
                </p>
                {pm.type === 'credit_card' && <p className="text-sm text-muted-foreground">Expires XX/XX</p> }
                {pm.type === 'paypal' && <p className="text-sm text-muted-foreground">{pm.email}</p>}
                 {pm.isDefault && (
                    <div className="mt-1 flex items-center text-xs text-green-600">
                        <CheckCircle className="mr-1 h-3 w-3" /> Default
                    </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
             {!pm.isDefault && (
                <Button variant="link" size="sm" onClick={() => handleSetDefault(pm.id)} className="p-0 h-auto text-primary">
                    Set as Default
                </Button>
             )}
              <Button variant="ghost" size="icon" onClick={() => setEditingPaymentMethod(pm)} aria-label="Edit payment method">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(pm.id)} aria-label="Delete payment method">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
      </CardContent>
      <CardFooter>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Payment Method
        </Button>
      </CardFooter>
      {/* Add Modal/Dialog for editing/adding payment method here */}
    </Card>
  );
};

export default PaymentMethodsList;
