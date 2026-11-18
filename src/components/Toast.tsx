'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 bg-neutral-900 text-white rounded-md px-3.5 py-2.5 text-xs shadow-md"
        >
          <span className="truncate">{toast.message}</span>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-neutral-400 hover:text-white p-0.5"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
