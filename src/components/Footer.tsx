'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 NorStore. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Shop Catalog
          </Link>
          <Link href="/contact" className="hover:text-slate-900 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
