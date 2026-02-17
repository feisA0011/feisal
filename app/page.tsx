import Image from 'next/image';
import Link from 'next/link';
import { Testimonials } from '@/components/Testimonials';
import { testimonials } from '@/content/testimonials';
import { getFeaturedCollections } from '@/lib/shopify/storefront';

export const revalidate = 300;

const HOME_TESTIMONIAL_COUNT = 3;

export default async function HomePage() {
  const collections = await getFeaturedCollections();

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-zinc-100 p-8">
        <Image
          src="https://cdn.shopify.com/s/files/1/0000/0001/files/hero.jpg"
          alt="CBD oils and wellness products"
          width={1200}
          height={600}
          className="mb-4 h-auto w-full rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <h1 className="text-3xl font-semibold">Green Panda CBD essentials for everyday balance</h1>
        <p className="mt-2 text-zinc-700">Third-party tested products. No medical claims, just transparent quality.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Featured collections</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.handle}`} className="rounded-lg border p-4">
              <h3 className="font-medium">{collection.title}</h3>
              <p className="text-sm text-zinc-600">{collection.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <Testimonials items={testimonials.slice(0, HOME_TESTIMONIAL_COUNT)} title="Customer testimonials" />
    </div>
  );
}
