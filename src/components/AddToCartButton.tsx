'use client';

import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Quantity Stepper */}
      <div className="flex items-center justify-between border border-[#dfe3ea] rounded-md bg-white px-3 py-2 w-full sm:w-32">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="text-[#6e7787] hover:text-[#112038] transition-colors p-1"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="font-semibold text-[#112038] text-xs">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="text-[#6e7787] hover:text-[#112038] transition-colors p-1"
          aria-label="Increase quantity"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#112038] hover:bg-[#5e60ce] text-white font-semibold text-sm py-2.5 px-6 rounded-md transition-colors"
      >
        <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
        <span>Add to cart</span>
      </button>
    </div>
  );
}
