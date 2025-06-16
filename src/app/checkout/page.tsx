
"use client";

import { useState } from 'react';
import ShippingForm, { type ShippingFormData } from '@/components/checkout/shipping-form';
import PaymentForm, { type PaymentFormData } from '@/components/checkout/payment-form';
import OrderSummaryCheckout from '@/components/checkout/order-summary-checkout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';

// Dummy form refs for triggering submit programmatically
import { useForm } from 'react-hook-form'; // Need this for the ref type

export default function CheckoutPage() {
  const { clearCart, cartItems } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // We need to instantiate form hooks here to get the submit function references
  // This is a common pattern when forms are separate components but submitted by a parent.
  const shippingForm = useForm<ShippingFormData>();
  const paymentForm = useForm<PaymentFormData>();


  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Trigger validation and get data from child forms
    const shippingValid = await shippingForm.trigger();
    const paymentValid = await paymentForm.trigger();

    if (!shippingValid || !paymentValid) {
      toast({
        title: "Form Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }
    
    // Get form data if valid
    // const shippingData = shippingForm.getValues();
    // const paymentData = paymentForm.getValues();

    // Simulate API call
    setTimeout(() => {
      console.log('Order placed with data:', {
        /* shipping: shippingData, payment: paymentData, items: cartItems */
      });
      clearCart();
      setOrderPlaced(true);
      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. Your order has been confirmed.",
        variant: "default",
        duration: 5000,
      });
      setIsProcessing(false);
      // Optional: Redirect to an order confirmation page
      // router.push('/order-confirmation?orderId=dummy123');
    }, 2000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    router.push('/cart'); // Redirect to cart if empty, unless order was just placed
    return <div className="text-center py-10">Your cart is empty. Redirecting...</div>;
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto py-12 text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4 font-headline">Thank You for Your Order!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your order has been successfully placed. You will receive a confirmation email shortly.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <a href="/products">Continue Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          {/* Pass the form instances to children or use context/refs for submission */}
          {/* For simplicity, we'll assume the forms are controlled by this parent via internal state or passed submit handlers */}
          <ShippingForm onSubmit={(data) => console.log("Shipping Data:", data)} />
          <PaymentForm onSubmit={(data) => console.log("Payment Data:", data)} />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <OrderSummaryCheckout />
          <Button
            size="lg"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <CreditCard className="mr-2 h-5 w-5 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" /> Place Order
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
