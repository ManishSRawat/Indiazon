
"use client";

import { useEffect, useState }dart';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getProductById, products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import RatingStars from '@/components/common/rating-stars';
import ProductImageGallery from '@/components/product/product-image-gallery';
import CustomerReviews from '@/components/product/customer-reviews';
import AiRecommendations from '@/components/product/ai-recommendations';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.id === 'string' ? params.id : '';
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (slug) {
      // In a real app, you'd fetch by slug. Here we find by slug from mock data.
      const foundProduct = allProducts.find(p => p.slug === slug);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Handle product not found, maybe redirect or show a 404 component
        console.error("Product not found for slug:", slug);
      }
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="aspect-square w-full rounded-md" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + change, product.stock)));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <ProductImageGallery images={product.images} altText={product.name} dataAiHint={product.dataAiHint} />
        
        <div className="space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            {product.rating && <RatingStars rating={product.rating} />}
            {product.reviews && <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>}
          </div>

          <p className="text-3xl font-semibold text-primary">
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="ml-3 text-lg text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </p>

          {product.stock > 0 && product.stock < 10 && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-600">Only {product.stock} left in stock!</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}

          <p className="text-foreground/80 leading-relaxed">{product.description.substring(0,150)}...</p>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock}>+</Button>
            </div>
            <Button 
              size="lg" 
              className="flex-grow bg-accent hover:bg-accent/90 text-accent-foreground" 
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Official Brand Warranty</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-md">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-md">
              <Truck className="h-5 w-5 text-orange-600" />
              <span>Fast Delivery</span>
            </div>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-headline">Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><strong>Brand:</strong> {product.brand || 'N/A'}</li>
                  <li><strong>Category:</strong> {product.category.name}</li>
                  <li><strong>SKU:</strong> {product.sku || 'N/A'}</li>
                  {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-headline">Full Description</AccordionTrigger>
              <AccordionContent>
                {product.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Separator className="my-12" />
      
      <CustomerReviews reviews={product.reviews} productName={product.name} />
      
      <AiRecommendations currentProduct={product} />
    </div>
  );
}
