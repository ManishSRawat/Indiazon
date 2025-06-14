
"use client";

import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const OrderSummaryCheckout = () => {
  const { cartItems, cartTotal } = useCart();

  return (
    <Card className="sticky top-24 shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4 mb-4">
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex items-center gap-4">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover aspect-square"
                  data-ai-hint={item.product.dataAiHint || "product"}
                />
                <div className="flex-grow">
                  <p className="font-semibold text-sm">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>Free</span>
          </div>
          {/* Add taxes if applicable */}
          <div className="flex justify-between font-semibold text-lg pt-2 border-t mt-2">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCheckout;
