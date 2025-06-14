
"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { getProductRecommendations, ProductRecommendationsOutput, ProductRecommendationsInput } from '@/ai/flows/product-recommendations';
import ProductCard from './product-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';

interface AiRecommendationsProps {
  currentProduct: Product;
}

const AiRecommendations = ({ currentProduct }: AiRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<ProductRecommendationsOutput['recommendedProducts'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const input: ProductRecommendationsInput = {
          productName: currentProduct.name,
          productDescription: currentProduct.description,
          productCategory: currentProduct.category.name,
          productImageUrl: currentProduct.images[0],
        };
        const result = await getProductRecommendations(input);
        // Simulate full product objects for display
        const hydratedRecommendations = result.recommendedProducts.map((rec, index) => ({
          ...rec,
          id: `rec-${currentProduct.id}-${index}`, // Create a unique ID
          price: Math.floor(Math.random() * (200 - 20 + 1)) + 20, // Random price for demo
          images: [rec.imageUrl || 'https://placehold.co/400x400.png'],
          category: { id: rec.category.toLowerCase().replace(' ', '-'), name: rec.category, slug: rec.category.toLowerCase().replace(' ', '-') },
          slug: rec.name.toLowerCase().replace(/\s+/g, '-'),
          stock: Math.floor(Math.random() * 100),
          rating: Math.random() * (5 - 3) + 3, // Random rating between 3 and 5
          dataAiHint: rec.name.split(' ').slice(0,2).join(' ').toLowerCase()
        }));
        setRecommendations(hydratedRecommendations as any); // Cast for now, as we're mocking full product structure
      } catch (err) {
        console.error("Failed to fetch AI recommendations:", err);
        setError("Could not load recommendations at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentProduct]);

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 font-headline flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-accent" /> You Might Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
             <div key={index} className="space-y-2">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
       <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 font-headline flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-accent" /> You Might Also Like
        </h2>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null; // Don't show the section if no recommendations
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 font-headline flex items-center">
        <Sparkles className="mr-2 h-6 w-6 text-accent" /> You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map(product => (
          // We are casting `product` to `Product` type. This is a simplification for the demo.
          // In a real app, you'd ensure the AI output matches your Product type or transform it.
          <ProductCard key={product.id || product.name} product={product as unknown as Product} />
        ))}
      </div>
    </div>
  );
};

export default AiRecommendations;
