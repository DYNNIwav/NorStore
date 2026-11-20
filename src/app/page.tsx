import { getProducts } from '@/services/api';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Product } from '@/types';

export default async function HomePage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred while loading products.';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Catalog Header */}
      <section className="text-center max-w-xl mx-auto space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#112038]">
          Store Catalog
        </h1>
        <p className="text-xs sm:text-sm text-[#6e7787]">
          Explore our curated collection of quality products.
        </p>
      </section>

      {/* Main Content */}
      {error ? (
        <div className="bg-white border border-[#dc2f3a]/40 text-[#dc2f3a] p-6 rounded-lg text-center max-w-md mx-auto text-sm">
          <p className="font-semibold">Unable to load products</p>
          <p className="text-xs mt-1 text-[#6e7787]">{error}</p>
        </div>
      ) : (
        <ProductCatalog initialProducts={products} />
      )}
    </div>
  );
}
