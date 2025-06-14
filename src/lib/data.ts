
import type { Category, Product, Review, Address, PaymentMethod, Order } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Books', slug: 'books' },
  { id: '3', name: 'Clothing', slug: 'clothing' },
  { id: '4', name: 'Home & Kitchen', slug: 'home-kitchen' },
];

const sampleReviews: Review[] = [
  { id: 'r1', author: 'Jane Doe', rating: 5, comment: 'Absolutely love this product! Highly recommend.', date: '2023-05-15' },
  { id: 'r2', author: 'John Smith', rating: 4, comment: 'Good quality, but a bit pricey.', date: '2023-05-10' },
  { id: 'r3', author: 'Alice Brown', rating: 3, comment: 'It\'s okay, does the job.', date: '2023-05-20' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone Pro X',
    description: 'The latest Smartphone Pro X with advanced AI camera and super-fast processor. Experience the future of mobile technology.',
    price: 799.99,
    originalPrice: 899.99,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: categories[0], // Electronics
    brand: 'TechGiant',
    stock: 50,
    rating: 4.5,
    reviews: sampleReviews,
    attributes: { Color: 'Midnight Black', Storage: '256GB' },
    slug: 'smartphone-pro-x',
    dataAiHint: 'smartphone tech',
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in sound with these premium wireless headphones. Featuring active noise cancellation and 20-hour battery life.',
    price: 199.99,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: categories[0], // Electronics
    brand: 'AudioPhile',
    stock: 120,
    rating: 4.8,
    reviews: sampleReviews.slice(0,2),
    attributes: { Color: 'Space Gray', Connectivity: 'Bluetooth 5.0' },
    slug: 'wireless-noise-cancelling-headphones',
    dataAiHint: 'headphones audio',
  },
  {
    id: '3',
    name: 'The Cosmic Weaver - Sci-Fi Novel',
    description: 'A thrilling sci-fi adventure across galaxies. Winner of the Nebula Award.',
    price: 15.99,
    images: ['https://placehold.co/400x600.png'],
    category: categories[1], // Books
    brand: 'Galaxy Press',
    stock: 200,
    rating: 4.2,
    reviews: sampleReviews.slice(1,3),
    attributes: { Author: 'Dr. Elara Vance', Genre: 'Science Fiction' },
    slug: 'the-cosmic-weaver',
    dataAiHint: 'book novel',
  },
  {
    id: '4',
    name: 'Men\'s Classic Cotton T-Shirt',
    description: 'A comfortable and stylish t-shirt made from 100% premium cotton. Perfect for everyday wear.',
    price: 25.00,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: categories[2], // Clothing
    brand: 'UrbanThreads',
    stock: 300,
    rating: 4.0,
    reviews: sampleReviews.slice(0,1),
    attributes: { Color: 'Navy Blue', Size: 'M, L, XL' },
    slug: 'mens-classic-cotton-t-shirt',
    dataAiHint: 'shirt clothing',
  },
  {
    id: '5',
    name: 'Espresso Maker Deluxe',
    description: 'Brew barista-quality espresso at home with this easy-to-use deluxe espresso maker.',
    price: 129.50,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: categories[3], // Home & Kitchen
    brand: 'HomeBrew',
    stock: 75,
    rating: 4.6,
    reviews: sampleReviews,
    attributes: { Material: 'Stainless Steel', Capacity: '2 cups' },
    slug: 'espresso-maker-deluxe',
    dataAiHint: 'coffee machine',
  },
  {
    id: '6',
    name: 'Ultra HD 4K Smart TV 55"',
    description: 'Experience stunning visuals with this 55-inch 4K Smart TV. Built-in streaming apps and voice control.',
    price: 499.00,
    images: ['https://placehold.co/800x500.png'],
    category: categories[0], // Electronics
    brand: 'VisionMax',
    stock: 30,
    rating: 4.7,
    reviews: sampleReviews.slice(1,2),
    attributes: { Resolution: '4K UHD', ScreenSize: '55 inches' },
    slug: 'ultra-hd-4k-smart-tv-55',
    dataAiHint: 'television screen',
  },
  {
    id: '7',
    name: 'Learn Python Programming - For Beginners',
    description: 'A comprehensive guide to learning Python from scratch. Includes practical examples and exercises.',
    price: 29.99,
    images: ['https://placehold.co/400x600.png'],
    category: categories[1], // Books
    brand: 'CodeLearn Publishing',
    stock: 150,
    rating: 4.9,
    reviews: sampleReviews.slice(0,2),
    attributes: { Author: 'Alex Coder', SkillLevel: 'Beginner' },
    slug: 'learn-python-programming-for-beginners',
    dataAiHint: 'python book',
  },
  {
    id: '8',
    name: 'Women\'s Performance Running Shoes',
    description: 'Lightweight and breathable running shoes designed for maximum comfort and performance.',
    price: 89.95,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: categories[2], // Clothing
    brand: 'SwiftFoot',
    stock: 90,
    rating: 4.3,
    reviews: sampleReviews,
    attributes: { Color: 'Aqua Blue', Activity: 'Running' },
    slug: 'womens-performance-running-shoes',
    dataAiHint: 'shoes sneakers',
  },
];

export const getProductById = (id: string): Product | undefined => products.find(p => p.id === id);

export const defaultAddress: Address = {
  id: 'addr1',
  street: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zipCode: '90210',
  country: 'USA',
  isDefault: true,
};

export const defaultPaymentMethod: PaymentMethod = {
  id: 'pm1',
  type: 'credit_card',
  last4: '1234',
  isDefault: true,
};

export const mockOrders: Order[] = [
  {
    id: 'order1',
    date: '2023-10-15',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[2], quantity: 2 },
    ],
    total: products[0].price + products[2].price * 2,
    status: 'Delivered',
    shippingAddress: defaultAddress,
    billingAddress: defaultAddress,
    paymentMethod: defaultPaymentMethod,
  },
  {
    id: 'order2',
    date: '2023-11-01',
    items: [{ product: products[4], quantity: 1 }],
    total: products[4].price,
    status: 'Shipped',
    shippingAddress: defaultAddress,
    billingAddress: defaultAddress,
    paymentMethod: defaultPaymentMethod,
  },
];

export const featuredProducts = products.slice(0, 4);
