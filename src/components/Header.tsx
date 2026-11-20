'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navLinks = [
    { href: '/', label: 'Shop' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#dfe3ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#112038]">
            NorStore
          </span>
        </Link>

        {/* Navigation & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex items-center gap-3 sm:gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#5e60ce] font-semibold'
                      : 'text-[#1d2433] hover:text-[#5e60ce]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/cart"
            className="relative p-2 text-[#112038] hover:text-[#5e60ce] transition-colors flex items-center"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5e60ce] text-white text-[11px] font-semibold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
