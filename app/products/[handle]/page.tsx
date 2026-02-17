import Image from 'next/image';
import type { Metadata } from 'next';
import { RatingStars } from '@/components/RatingStars';
import { Testimonials } from '@/components/Testimonials';
import { testimonials } from '@/content/testimonials';
import { buildMetadata } from '@/lib/seo/metadata';
import { productJsonLd } from '@/lib/seo/jsonld';
import { getAggregateRating, getTestimonialsForProduct } from '@/lib/testimonials';
import { getProductByHandle } from '@/lib/shopify/storefront';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  return buildMetadata(`Product: ${handle}`, 'Product details and transparency information.', `/products/${handle}`);
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  const productTestimonials = getTestimonialsForProduct(testimonials, handle);
  const aggregateRating = getAggregateRating(productTestimonials);

  const jsonLd = productJsonLd({
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    price: product.priceRange.minVariantPrice.amount,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    aggregateRating
  });

  return (
    <div className="space-y-8">
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
          {aggregateRating ? (
            <div className="mt-4 rounded-lg border border-zinc-200 p-3 text-sm">
              <p className="font-medium">Customer rating summary</p>
              <div className="mt-1 flex items-center gap-2">
                <RatingStars rating={aggregateRating.ratingValue} />
                <span className="text-zinc-700">
                  {aggregateRating.ratingValue}/5 from {aggregateRating.reviewCount} review{aggregateRating.reviewCount > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ) : null}
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

      <Testimonials items={productTestimonials} title="Verified customer reviews" />
    </div>
  );
}
