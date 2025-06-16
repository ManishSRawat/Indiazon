
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/product-card';
import FilterSidebar from '@/components/product/filter-sidebar';
import { products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from 'lucide-react';

function ProductListings() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const categories = searchParams.getAll('category');
    const brands = searchParams.getAll('brand');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || Number.MAX_SAFE_INTEGER.toString());

    let tempProducts = allProducts;

    if (searchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.category.name.toLowerCase().includes(searchQuery) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery))
      );
    }

    if (categories.length > 0) {
      tempProducts = tempProducts.filter(product => categories.includes(product.category.slug));
    }

    if (brands.length > 0) {
      tempProducts = tempProducts.filter(product => product.brand && brands.includes(product.brand));
    }
    
    tempProducts = tempProducts.filter(product => product.price >= minPrice && product.price <= maxPrice);

    // Simulate network delay for loading state
    setTimeout(() => {
      setFilteredProducts(tempProducts);
      setIsLoading(false);
    }, 300);

  }, [searchParams]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline text-center md:text-left">
        {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'All Products'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <FilterSidebar />
        </div>
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle className="font-headline">No Products Found</AlertTitle>
              <AlertDescription>
                Try adjusting your search or filter criteria.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}


export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <ProductListings />
    </Suspense>
  );
}
