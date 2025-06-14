
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { ShoppingBag } from 'lucide-react';

const CartSummary = () => {
  const { cartTotal, cartCount } = useCart();

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>Free</span> {/* Or calculate dynamically */}
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
          <Link href="/checkout">
            <ShoppingBag className="mr-2 h-5 w-5" /> Proceed to Checkout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
