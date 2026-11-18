'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const hasDiscount = product.discountedPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article className="group flex flex-col bg-white border border-[#dfe3ea] rounded-lg overflow-hidden transition-all hover:border-[#5e60ce]/50">
      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-[#f6f7fb] overflow-hidden">
        <Image
          src={product.image.url}
          alt={product.image.alt || product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-102 transition-transform duration-200"
        />

        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 bg-[#5e60ce] text-white text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded-sm">
            −{discountPercent}%
          </span>
        )}

        <div className="absolute bottom-2.5 right-2.5 bg-white/95 px-1.5 py-0.5 rounded-xs flex items-center gap-1 text-[11px] font-medium text-[#1d2433] shadow-xs">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating > 0 ? product.rating.toFixed(1) : 'New'}</span>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-[#112038] group-hover:text-[#5e60ce] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-[#6e7787] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#dfe3ea]/60 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#112038]">
              ${product.discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[#6e7787] line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="text-xs font-semibold bg-[#112038] hover:bg-[#5e60ce] text-white px-3 py-1.5 rounded transition-colors"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
