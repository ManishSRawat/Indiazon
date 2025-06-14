
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const paymentSchema = z.object({
  cardNumber: z.string().length(16, "Card number must be 16 digits").regex(/^\d{16}$/, "Invalid card number"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().min(3, "CVV must be 3-4 digits").max(4).regex(/^\d{3,4}$/, "Invalid CVV"),
  cardHolderName: z.string().min(2, "Cardholder name is required"),
  billingSameAsShipping: z.boolean().default(true),
  // Optional billing address fields if different
  billingAddress: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZipCode: z.string().optional(),
  billingCountry: z.string().optional(),
}).superRefine((data, ctx) => {
    if (!data.billingSameAsShipping) {
        if (!data.billingAddress || data.billingAddress.length < 5) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Billing address is required", path: ["billingAddress"]});
        }
        if (!data.billingCity || data.billingCity.length < 2) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Billing city is required", path: ["billingCity"]});
        }
        // Add similar checks for other billing fields
    }
});


type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
}

const PaymentForm = ({ onSubmit }: PaymentFormProps) => {
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolderName: '',
      billingSameAsShipping: true,
    },
  });

  const billingSameAsShipping = form.watch('billingSameAsShipping');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="•••• •••• •••• ••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="billingSameAsShipping"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Billing address is the same as shipping address
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {!billingSameAsShipping && (
              <div className="space-y-6 mt-4 border-t pt-4">
                <h4 className="font-semibold font-headline">Billing Address</h4>
                 <FormField
                    control={form.control}
                    name="billingAddress"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                            <Input placeholder="456 Billing Ave" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                {/* Add other billing address fields here similarly */}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
export type { PaymentFormData };
