import type { Metadata } from 'next';
import { ProductCard } from '@/components/product-card';
import { buildMetadata } from '@/lib/seo/metadata';
import { getCollectionByHandle } from '@/lib/shopify/storefront';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  return buildMetadata(`Collection: ${handle}`, 'Explore curated CBD products.', `/collections/${handle}`);
}

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  return (
    <div>
      <h1 className="text-3xl font-semibold">{collection.title}</h1>
      <p className="mt-1 text-zinc-600">{collection.description}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {(collection.products ?? []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
