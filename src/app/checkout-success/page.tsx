'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const num = `NOR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-[#14a37f] text-white flex items-center justify-center mx-auto">
        <Check className="w-5 h-5 stroke-[2.5]" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold text-[#112038] tracking-tight">
          Order Confirmed
        </h1>
        <p className="text-[#6e7787] text-xs">
          Thank you for your purchase. We have received your order and are preparing it for shipment.
        </p>
      </div>

      {orderNumber && (
        <div className="inline-block bg-white border border-[#dfe3ea] px-3.5 py-1.5 rounded-md text-xs font-medium text-[#1d2433]">
          Order reference: <strong className="font-semibold text-[#112038]">{orderNumber}</strong>
        </div>
      )}

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[#112038] hover:bg-[#5e60ce] text-white font-semibold px-5 py-2 rounded-md transition-colors text-xs"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
