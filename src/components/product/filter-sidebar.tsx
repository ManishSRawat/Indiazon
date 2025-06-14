
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { categories as allCategories, products } from '@/lib/data'; // Assuming products are available for brand/price range derivation
import type { Category } from '@/lib/types';

const FilterSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('category') || []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Default max price
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.getAll('brand') || []);

  // Derive brands and max price from products for dynamic filtering
  useEffect(() => {
    const uniqueBrands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[];
    setBrands(uniqueBrands.sort());
    const maxProductPrice = Math.max(...products.map(p => p.price), 1000); // Ensure a minimum max
    setPriceRange([0, Math.ceil(maxProductPrice / 100) * 100]); // Round up to nearest 100
  }, []);
  
  useEffect(() => {
    // Initialize from URL params
    const currentCategories = searchParams.getAll('category');
    setSelectedCategories(currentCategories);

    const currentBrands = searchParams.getAll('brand');
    setSelectedBrands(currentBrands);

    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const initialMinPrice = minPriceParam ? parseInt(minPriceParam) : priceRange[0];
    const initialMaxPrice = maxPriceParam ? parseInt(maxPriceParam) : priceRange[1];
    if (minPriceParam || maxPriceParam) {
        setPriceRange([initialMinPrice, initialMaxPrice]);
    }

  }, [searchParams, priceRange[0], priceRange[1]]);


  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleBrandChange = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName) ? prev.filter(name => name !== brandName) : [...prev, brandName]
    );
  };

  const handlePriceChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.delete('category');
    selectedCategories.forEach(catId => params.append('category', catId));

    params.delete('brand');
    selectedBrands.forEach(brand => params.append('brand', brand));
    
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    // Reset price range to initial if derived, or a sensible default
    const maxProductPrice = Math.max(...products.map(p => p.price), 1000);
    setPriceRange([0, Math.ceil(maxProductPrice / 100) * 100]);
    router.push(pathname); // Clears all query params
  };


  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2 font-headline">Category</h3>
          <div className="space-y-2">
            {allCategories.map((category: Category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.slug)}
                  onCheckedChange={() => handleCategoryChange(category.slug)}
                />
                <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
              </div>
            ))}
          </div>
        </div>

        {brands.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2 font-headline">Brand</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="font-semibold mb-2 font-headline">Price Range</h3>
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            min={0}
            max={Math.max(...products.map(p => p.price), 1000)} // Use dynamic max price
            step={10}
            value={priceRange}
            onValueChange={(value) => handlePriceChange(value as [number, number])}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-4">
          <Button onClick={applyFilters} className="w-full bg-primary hover:bg-primary/90">Apply Filters</Button>
          <Button onClick={clearFilters} variant="outline" className="w-full">Clear Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
