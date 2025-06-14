
"use client";

import Link from 'next/link';
import Logo from '@/components/common/logo';
import SearchBar from '@/components/common/search-bar';
import UserProfileIcon from '@/components/user/user-profile-icon';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { NavItem } from '@/lib/types';
import { useState } from 'react';
import { categories } from '@/lib/data'; // Import categories

// Transform categories from data.ts into NavItem structure
const dynamicNavItems: NavItem[] = categories.map(category => ({
  title: category.name,
  href: `/products?category=${category.slug}`,
}));


const Header = () => {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        <div className="hidden md:flex flex-1 justify-center px-8">
          <SearchBar />
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {dynamicNavItems.slice(0,2).map((item) => ( // Show first 2 categories from dynamic list
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/cart" aria-label="Shopping Cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <UserProfileIcon />
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 pt-8">
                <div className="px-4 mb-4">
                   <SearchBar />
                </div>
                  {dynamicNavItems.map((item) => ( // Use full dynamic list for mobile menu
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-lg font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground rounded-md"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
