import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowLeft, Tag } from 'lucide-react';
import { getProductById } from '@/services/api';
import { AddToCartButton } from '@/components/AddToCartButton';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;
  try {
    product = await getProductById(id);
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  const hasDiscount = product.discountedPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-10">
      {/* Back link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#6e7787] hover:text-[#112038] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to catalog</span>
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-white border border-[#dfe3ea]">
          <Image
            src={product.image.url}
            alt={product.image.alt || product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-[#5e60ce] text-white text-xs font-semibold tracking-wide px-2.5 py-0.5 rounded-sm">
              −{discountPercent}%
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#f6f7fb] border border-[#dfe3ea] px-2 py-0.5 rounded text-[#1d2433] text-xs font-medium">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating > 0 ? product.rating.toFixed(1) : 'No reviews'}</span>
              </div>
              <span className="text-xs text-[#6e7787]">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#112038] tracking-tight">
              {product.title}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-6 border-b border-[#dfe3ea]">
            <span className="text-2xl font-bold text-[#112038]">
              ${product.discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-[#6e7787] line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6e7787]">
              Description
            </h2>
            <p className="text-sm text-[#1d2433] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="space-y-1.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6e7787]">
                Categories
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-[#f6f7fb] border border-[#dfe3ea] text-[#1d2433] text-xs px-2.5 py-1 rounded font-medium capitalize"
                  >
                    <Tag className="w-3 h-3 text-[#6e7787]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Component */}
          <div className="pt-2">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-8 border-t border-[#dfe3ea] space-y-4">
        <h2 className="text-lg font-bold text-[#112038]">
          Customer Reviews ({product.reviews?.length || 0})
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-md border border-[#dfe3ea] p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#112038]">
                    {rev.username}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-neutral-200 text-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[#1d2433] leading-relaxed">
                  {rev.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-[#6e7787] bg-white border border-[#dfe3ea] rounded-md">
            No customer reviews yet for this product.
          </div>
        )}
      </section>
    </div>
  );
}
