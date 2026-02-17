import Image from 'next/image';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import { productJsonLd } from '@/lib/seo/jsonld';
import { getProductByHandle } from '@/lib/shopify/storefront';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  return buildMetadata(`Product: ${handle}`, 'Product details and transparency information.', `/products/${handle}`);
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  const jsonLd = productJsonLd({
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    price: product.priceRange.minVariantPrice.amount,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
  });

  return (
    <article className="grid gap-6 md:grid-cols-2">
      {product.featuredImage?.url ? (
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText ?? product.title}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-xl object-cover"
        />
      ) : null}
      <div>
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-zinc-700">{product.description}</p>
        <p className="mt-4 text-lg font-medium">
          {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
        </p>
        <p className="mt-1 text-sm text-zinc-600">Availability: {product.availableForSale ? 'In stock' : 'Out of stock'}</p>
        <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          <p className="font-medium">Compliance & transparency</p>
          <p className="mt-1">You must be of legal age in your jurisdiction to purchase CBD products.</p>
          <a className="mt-2 inline-block underline" href="#" rel="nofollow">
            View certificate of analysis (COA)
          </a>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
