
"use client";

import { mockOrders } from '@/lib/data';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const OrderHistory = () => {
  // In a real app, fetch orders for the logged-in user
  const orders: Order[] = mockOrders;

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Order History</CardTitle>
          <CardDescription>You haven&apos;t placed any orders yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getStatusVariant = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'default'; // Greenish, using default for now
      case 'Shipped': return 'secondary'; // Bluish
      case 'Pending': return 'outline'; // Yellowish/orangish
      case 'Cancelled': return 'destructive';
      default: return 'outline';
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Order History</CardTitle>
        <CardDescription>View your past orders and their status.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total Items</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.substring(0,6)}...</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="link" size="sm" asChild className="text-primary">
                    <Link href={`/account/orders/${order.id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
