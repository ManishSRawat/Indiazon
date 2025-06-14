
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          width={80}
          height={80}
          className="rounded-md object-cover aspect-square"
          data-ai-hint={item.product.dataAiHint || "product"}
        />
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.product.slug}`}>
          <h3 className="font-semibold hover:text-primary transition-colors font-headline">{item.product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">Price: ${item.product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2 w-28">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          min="1"
          max={item.product.stock}
          className="h-8 w-12 text-center px-1"
          aria-label={`Quantity for ${item.product.name}`}
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity + 1)} disabled={item.quantity >= item.product.stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold w-20 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)} aria-label={`Remove ${item.product.name} from cart`}>
        <X className="h-5 w-5 text-muted-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};

export default CartItem;
