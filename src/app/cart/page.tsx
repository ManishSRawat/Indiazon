
"use client";

import CartItem from '@/components/cart/cart-item';
import CartSummary from '@/components/cart/cart-summary';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CartPage() {
  const { cartItems, clearCart, isLoading } = useCart();

  if (isLoading) {
    return <div className="text-center py-10">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
         <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <Alert className="max-w-md mx-auto">
            <AlertTitle className="font-headline text-2xl">Your Cart is Empty</AlertTitle>
            <AlertDescription className="mt-2 text-lg">
            Looks like you haven&apos;t added anything to your cart yet.
            </AlertDescription>
        </Alert>
        <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Your Shopping Cart</h1>
        <Button variant="outline" onClick={clearCart} className="text-destructive hover:bg-destructive/10 border-destructive hover:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-card p-6 rounded-lg shadow-sm">
          {cartItems.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
