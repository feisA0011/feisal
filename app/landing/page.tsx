import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Testimonials } from '@/components/Testimonials';
import { testimonials } from '@/content/testimonials';
import { buildMetadata } from '@/lib/seo/metadata';
import { getFeaturedProducts } from '@/lib/shopify/storefront';

export const revalidate = 180;

const HERO_IMAGE = {
  src: 'https://cdn.shopify.com/s/files/1/0000/0001/files/landing-hero.jpg',
  blurDataURL:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5Ij48ZmlsdGVyIGlkPSJiIiB4PSIwIiB5PSIwIj48ZmVHYXVzc2lhbkJsdXIgc3REZXZpYXRpb249IjIiIC8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjkiIGZpbGw9IiNlNWU3ZWIiIGZpbHRlcj0idXJsKCNiKSIvPjwvc3ZnPg=='
};

export const metadata = buildMetadata(
  'Landing',
  'Green Panda premium CBD storefront landing page with transparent sourcing and lab-report-first messaging.',
  '/landing'
);

export default async function LandingPage() {
  const featuredProducts = await getFeaturedProducts(6);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-2xl bg-zinc-100">
        <div className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-10">
          <div>
            <h1 className="text-4xl font-semibold leading-tight">Green Panda quality-first CBD essentials</h1>
            <p className="mt-3 text-zinc-700">
              Transparent sourcing, COA-first product information, and a fast Shopify-hosted checkout experience.
            </p>
            <Link href="/collections/all" className="mt-5 inline-block rounded bg-zinc-900 px-4 py-2 text-white">
              Shop featured products
            </Link>
          </div>
          <div className="relative">
            <Image
              src={HERO_IMAGE.src}
              alt="Green Panda premium CBD product lineup"
              width={1600}
              height={1000}
              priority
              placeholder="blur"
              blurDataURL={HERO_IMAGE.blurDataURL}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['EU-tested batches', 'Fast Denmark shipping', 'Shopify secure checkout'].map((badge) => (
          <div key={badge} className="rounded-lg border border-zinc-200 p-4 text-sm font-medium">
            {badge}
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-zinc-200 p-5">
        <h2 className="text-2xl font-semibold">COA & lab transparency</h2>
        <p className="mt-2 text-zinc-700">
          Every featured product includes laboratory documentation references and conservative product information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured products</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Testimonials items={testimonials.slice(0, 4)} title="Trusted by customers across Denmark" />

      <section className="rounded-xl bg-zinc-900 p-6 text-white">
        <h2 className="text-2xl font-semibold">Questions before ordering?</h2>
        <p className="mt-2 text-zinc-200">Read our FAQ for shipping, product information, and returns details.</p>
        <Link href="/faq" className="mt-4 inline-block underline">
          Visit FAQ
        </Link>
      </section>
    </div>
  );
}
