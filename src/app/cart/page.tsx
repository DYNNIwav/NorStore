'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalCost, totalItems } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout-success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#f6f7fb] text-[#112038] border border-[#dfe3ea] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-6 h-6 stroke-[1.75]" />
        </div>
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-[#112038]">Your cart is empty</h1>
          <p className="text-xs text-[#6e7787]">
            Browse our catalog to add items to your shopping bag.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-[#112038] hover:bg-[#5e60ce] text-white font-semibold px-5 py-2 rounded-md transition-colors text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to shop</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#112038] tracking-tight">
          Shopping Cart ({totalItems})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#dfe3ea] rounded-lg divide-y divide-[#dfe3ea]/60 overflow-hidden">
            {items.map(({ product, quantity }) => {
              const unitPrice = product.discountedPrice ?? product.price;
              const hasDiscount = product.discountedPrice < product.price;
              const lineTotal = unitPrice * quantity;

              return (
                <div key={product.id} className="p-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-[#f6f7fb] shrink-0 border border-[#dfe3ea]"
                  >
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      href={`/product/${product.id}`}
                      className="font-semibold text-sm text-[#112038] hover:text-[#5e60ce] transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#112038]">
                        ${unitPrice.toFixed(2)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[11px] text-[#6e7787] line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#dfe3ea] rounded-md bg-[#f6f7fb] px-2 py-1 shrink-0">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="text-[#6e7787] hover:text-[#112038] p-0.5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-semibold text-[#112038]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="text-[#6e7787] hover:text-[#112038] p-0.5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="text-right shrink-0 min-w-[65px]">
                    <span className="block font-bold text-xs text-[#112038]">
                      ${lineTotal.toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="mt-1 text-[#6e7787] hover:text-[#dc2f3a] p-0.5 transition-colors"
                      aria-label={`Remove ${product.title} from cart`}
                    >
                      <Trash2 className="w-3.5 h-3.5 ml-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#6e7787] hover:text-[#112038] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-[#dfe3ea] rounded-lg p-5 space-y-5 lg:sticky lg:top-24">
          <h2 className="text-base font-bold text-[#112038]">Order Summary</h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-[#6e7787]">
              <span>Items ({totalItems})</span>
              <span className="text-[#1d2433] font-medium">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#6e7787]">
              <span>Shipping</span>
              <span className="text-[#14a37f] font-semibold">Free</span>
            </div>
            <div className="pt-3 border-t border-[#dfe3ea] flex justify-between font-bold text-sm text-[#112038]">
              <span>Total</span>
              <span className="text-[#5e60ce]">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#5e60ce] hover:bg-[#4d4fb8] text-white font-semibold py-2.5 px-4 rounded-md transition-colors text-xs"
          >
            <span>Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
