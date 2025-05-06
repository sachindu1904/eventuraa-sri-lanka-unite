
import React, { useState } from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be at least 16 digits'),
  cardHolder: z.string().min(3, 'Please enter card holder name'),
  expiryDate: z.string().min(5, 'Please enter a valid expiry date (MM/YY)'),
  cvv: z.string().min(3, 'CVV must be at least 3 digits'),
});

type PaymentMethod = 'visa' | 'mastercard' | 'paypal' | 'ezCash' | 'unionpay' | 'alipay';

interface PaymentMethodSelectorProps {
  onPaymentMethodSelect: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod;
}

const PaymentMethodSelector = ({ onPaymentMethodSelect, selectedMethod }: PaymentMethodSelectorProps) => {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const formatCardNumber = (value: string) => {
    // Remove spaces and non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length >= 3) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    } else if (digits.length === 2) {
      return `${digits}/`;
    }
    
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setValue('cardNumber', formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    form.setValue('expiryDate', formatted);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div 
          className={cn(
            "border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all relative",
            selectedMethod === 'visa' 
              ? "border-[#1A3A63] bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onPaymentMethodSelect('visa')}
        >
          <div className="h-10 w-full flex items-center justify-center">
            <div className="bg-[#1A1F71] text-white font-bold italic text-xl px-2 py-1 rounded">VISA</div>
          </div>
          <span className="text-sm mt-2">Visa Card</span>
          {selectedMethod === 'visa' && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute top-2 right-2" />
          )}
        </div>
        
        <div 
          className={cn(
            "border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all relative",
            selectedMethod === 'mastercard' 
              ? "border-[#1A3A63] bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onPaymentMethodSelect('mastercard')}
        >
          <div className="h-10 w-full flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded-full opacity-80 mr-[-8px]"></div>
              <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
            </div>
          </div>
          <span className="text-sm mt-2">Mastercard</span>
          {selectedMethod === 'mastercard' && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute top-2 right-2" />
          )}
        </div>
        
        <div 
          className={cn(
            "border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all relative",
            selectedMethod === 'paypal' 
              ? "border-[#1A3A63] bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onPaymentMethodSelect('paypal')}
        >
          <div className="h-10 w-full flex items-center justify-center">
            <div className="text-[#003087] font-bold text-lg">Pay<span className="text-[#009cde]">Pal</span></div>
          </div>
          <span className="text-sm mt-2">PayPal</span>
          {selectedMethod === 'paypal' && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute top-2 right-2" />
          )}
        </div>
        
        <div 
          className={cn(
            "border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all relative",
            selectedMethod === 'ezCash' 
              ? "border-[#1A3A63] bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onPaymentMethodSelect('ezCash')}
        >
          <div className="h-10 w-full flex items-center justify-center">
            <div className="text-red-600 font-bold text-lg">eZ Cash</div>
          </div>
          <span className="text-sm mt-2">Mobile Money</span>
          {selectedMethod === 'ezCash' && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute top-2 right-2" />
          )}
        </div>
        
        {/* New UnionPay option for Chinese tourists */}
        <div 
          className={cn(
            "border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all relative",
            selectedMethod === 'unionpay' 
              ? "border-[#1A3A63] bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onPaymentMethodSelect('unionpay')}
        >
          <div className="h-10 w-full flex items-center justify-center">
            <div className="text-[#00447c] font-bold text-base border border-[#00447c] px-1 py-0.5 rounded">
              UnionPay
            </div>
          </div>
          <span className="text-sm mt-2">China Union Pay</span>
          {selectedMethod === 'unionpay' && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute top-2 right-2" />
          )}
        </div>
        
        {/* New Alipay option for Asian tourists */}
        <div 
          className={cn(
            "border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all relative",
            selectedMethod === 'alipay' 
              ? "border-[#1A3A63] bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          )}
          onClick={() => onPaymentMethodSelect('alipay')}
        >
          <div className="h-10 w-full flex items-center justify-center">
            <div className="text-[#00a0e9] font-bold text-base">
              Alipay
            </div>
          </div>
          <span className="text-sm mt-2">Alipay</span>
          {selectedMethod === 'alipay' && (
            <CheckCircle className="h-5 w-5 text-green-500 absolute top-2 right-2" />
          )}
        </div>
      </div>
      
      {(selectedMethod === 'visa' || selectedMethod === 'mastercard' || selectedMethod === 'unionpay') && (
        <div className="mt-6 border rounded-md p-4 bg-white">
          <h4 className="font-medium mb-4 flex items-center">
            {selectedMethod === 'visa' && (
              <div className="bg-[#1A1F71] text-white font-bold italic text-xl px-2 py-1 rounded mr-2">VISA</div>
            )}
            {selectedMethod === 'mastercard' && (
              <div className="flex items-center mr-2">
                <div className="w-6 h-6 bg-red-500 rounded-full opacity-80 mr-[-8px]"></div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-80"></div>
              </div>
            )}
            {selectedMethod === 'unionpay' && (
              <div className="text-[#00447c] font-bold text-base border border-[#00447c] px-1 py-0.5 rounded mr-2">
                UnionPay
              </div>
            )}
            Card Details
          </h4>
          
          <Form {...form}>
            <form className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={form.watch('cardNumber')}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    className="mt-1"
                  />
                  {form.formState.errors.cardNumber && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.cardNumber.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="cardHolder">Cardholder Name</Label>
                  <Input
                    id="cardHolder"
                    placeholder="John Smith"
                    {...form.register('cardHolder')}
                    className="mt-1"
                  />
                  {form.formState.errors.cardHolder && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.cardHolder.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={form.watch('expiryDate')}
                      onChange={handleExpiryDateChange}
                      maxLength={5}
                      className="mt-1"
                    />
                    {form.formState.errors.expiryDate && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.expiryDate.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="123"
                      maxLength={4}
                      {...form.register('cvv')}
                      className="mt-1"
                    />
                    {form.formState.errors.cvv && (
                      <p className="text-sm text-red-500 mt-1">{form.formState.errors.cvv.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-sm text-gray-600">Your payment is secured with SSL encryption</span>
              </div>
            </form>
          </Form>
        </div>
      )}
      
      {selectedMethod === 'paypal' && (
        <div className="mt-6 border rounded-md p-6 bg-white text-center">
          <div className="text-[#003087] font-bold text-2xl mb-4">Pay<span className="text-[#009cde]">Pal</span></div>
          <p className="text-gray-600 mb-6">Click the button below to securely pay with PayPal.</p>
          <button className="bg-[#0070ba] hover:bg-[#003087] text-white py-3 px-6 rounded-md w-full transition-colors">
            Continue to PayPal
          </button>
          <p className="mt-4 text-sm text-gray-500">You will be redirected to PayPal to complete your payment securely.</p>
        </div>
      )}
      
      {selectedMethod === 'ezCash' && (
        <div className="mt-6 border rounded-md p-6 bg-white">
          <div className="text-red-600 font-bold text-2xl mb-4 text-center">eZ Cash</div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                placeholder="+94 7XX XXX XXX"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter your PIN"
                className="mt-1"
              />
            </div>
            <p className="text-sm text-gray-500">You will receive a verification code on your phone to complete the payment.</p>
          </div>
        </div>
      )}
      
      {selectedMethod === 'alipay' && (
        <div className="mt-6 border rounded-md p-6 bg-white text-center">
          <div className="text-[#00a0e9] font-bold text-2xl mb-4">Alipay</div>
          <div className="border-4 border-gray-200 inline-block p-4 mx-auto mb-6">
            <div className="bg-gray-200 w-48 h-48 flex items-center justify-center">
              QR Code
            </div>
          </div>
          <p className="text-gray-600">Scan the QR code with the Alipay app to complete your payment.</p>
          <p className="mt-4 text-sm text-gray-500">For assistance, please contact our support team.</p>
        </div>
      )}
      
      {selectedMethod === 'unionpay' && (
        <div className="mt-6 border rounded-md p-4 bg-white">
          <div className="mb-4 flex items-center">
            <div className="text-[#00447c] font-bold text-base border border-[#00447c] px-1 py-0.5 rounded mr-2">
              UnionPay
            </div>
            <h4 className="font-medium">Card Details</h4>
          </div>
          
          <div className="bg-blue-50 p-3 rounded mb-4 border border-blue-100">
            <p className="text-sm text-blue-800 flex items-start">
              <svg className="h-5 w-5 mr-2 mt-0.5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              All UnionPay cards are accepted. No additional fees for international transactions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
