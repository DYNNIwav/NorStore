import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#dfe3ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#112038]">
            NorStore
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-5">
            <Link
              href="/"
              className="text-sm font-semibold text-[#5e60ce]"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-[#1d2433] hover:text-[#5e60ce] transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative p-2 text-[#112038] hover:text-[#5e60ce] transition-colors flex items-center"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
