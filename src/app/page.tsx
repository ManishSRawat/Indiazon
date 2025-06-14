
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/product-card';
import { featuredProducts, categories } from '@/lib/data';
import { ArrowRight, ShoppingBag, Search, ShieldCheck, Truck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-background to-background py-16 md:py-24 rounded-lg shadow-sm overflow-hidden">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-headline">
            Welcome to <span className="text-primary">Indiazon</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover a world of products at your fingertips. Quality, value, and convenience, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/products">
                Shop All Products <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                Explore Categories <Search className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-1/3 -left-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute -top-1/3 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-2000" />
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold font-headline">Featured Products</h2>
          <Button variant="link" asChild className="text-primary hover:text-primary/80">
            <Link href="/products">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center font-headline">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative aspect-[4/3] md:aspect-video overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={`https://placehold.co/400x300.png?text=${category.name.replace(' ', '+')}`}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={category.name.toLowerCase()}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center p-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white text-center font-headline">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Shop With Us Section */}
      <section className="py-12 bg-secondary/50 rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center font-headline">Why Shop With Indiazon?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-background rounded-lg shadow">
              <ShoppingBag className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 font-headline">Wide Selection</h3>
              <p className="text-muted-foreground">Thousands of products across various categories.</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow">
              <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 font-headline">Secure Shopping</h3>
              <p className="text-muted-foreground">Your data and transactions are always safe with us.</p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow">
              <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 font-headline">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your orders delivered quickly to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
