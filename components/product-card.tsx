import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.handle}`} className="rounded-lg border p-4">
      {product.featuredImage?.url ? (
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText ?? product.title}
          width={600}
          height={600}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="mb-3 h-48 w-full rounded object-cover"
        />
      ) : null}
      <h3 className="font-medium">{product.title}</h3>
      <p className="text-sm text-zinc-600">{product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}</p>
    </Link>
  );
}
