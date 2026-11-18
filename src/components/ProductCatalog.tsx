'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ProductCard';
import { SearchBar } from '@/components/SearchBar';

interface ProductCatalogProps {
  initialProducts: Product[];
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

export function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialProducts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ['all', ...Array.from(tags)];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTag !== 'all') {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [initialProducts, searchQuery, selectedTag, sortBy]);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <SearchBar
        products={initialProducts}
        onFilterChange={(q) => setSearchQuery(q)}
      />

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#dfe3ea] text-xs">
        {/* Category Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-[#112038] text-white'
                  : 'bg-white text-[#6e7787] hover:text-[#112038] border border-[#dfe3ea]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <label htmlFor="sort-select" className="text-[#6e7787] font-medium">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-white border border-[#dfe3ea] rounded-md px-2.5 py-1 text-xs text-[#1d2433] outline-none focus:border-[#5e60ce]"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#dfe3ea] rounded-lg">
          <p className="text-sm font-semibold text-[#112038]">No products found</p>
          <p className="text-xs text-[#6e7787] mt-1">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
