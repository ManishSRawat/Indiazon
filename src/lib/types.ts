
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  external?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5 stars
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For discounts
  images: string[]; // URLs
  category: Category;
  brand?: string;
  stock: number;
  sku?: string;
  rating?: number; // Average rating
  reviews?: Review[];
  attributes?: Record<string, string>; // e.g. { "Color": "Blue", "Size": "M" }
  slug: string; // For URL generation
  dataAiHint?: string; // For placeholder image search
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed, e.g., addresses, paymentMethods
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal'; // Example types
  last4?: string; // For credit cards
  email?: string; // For PayPal
  isDefault?: boolean;
}

export interface Order {
  id:string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
}
