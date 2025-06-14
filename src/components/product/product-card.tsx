
"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import RatingStars from '@/components/common/rating-stars';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`} aria-label={`View details for ${product.name}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={product.dataAiHint || "product image"}
          />
        </Link>
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Sale
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="text-lg font-headline mb-1 leading-tight hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category.name}</p>
        {product.rating && <RatingStars rating={product.rating} />}
        <p className="text-xl font-semibold text-primary mt-2">
          ${product.price.toFixed(2)}
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
