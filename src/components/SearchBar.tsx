'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { Product } from '@/types';

interface SearchBarProps {
  products: Product[];
  onFilterChange?: (query: string) => void;
}

export function SearchBar({ products, onFilterChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(val.trim().length > 0);
    if (onFilterChange) {
      onFilterChange(val);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange('');
    }
  };

  const matchingProducts = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6e7787]" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim().length > 0 && setIsOpen(true)}
          placeholder="Search products..."
          className="w-full pl-10 pr-9 py-2 bg-white border border-[#dfe3ea] focus:border-[#5e60ce] rounded-md text-sm text-[#1d2433] placeholder-[#6e7787] outline-none transition-colors"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e7787] hover:text-[#1d2433] p-0.5"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Container */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-md border border-[#dfe3ea] shadow-md overflow-hidden z-30 max-h-80 overflow-y-auto">
          {matchingProducts.length > 0 ? (
            <div className="divide-y divide-[#dfe3ea]/50">
              {matchingProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-[#f6f7fb] transition-colors group"
                >
                  <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-[#f6f7fb] shrink-0 border border-[#dfe3ea]">
                    <Image
                      src={product.image.url}
                      alt={product.image.alt || product.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#112038] group-hover:text-[#5e60ce] truncate">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-[#6e7787] truncate">
                      ${product.discountedPrice.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-[#6e7787]">
              No products found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
