import { notFound } from 'next/navigation';
import { shopifyFetch } from '@/lib/shopify/client';
import {
  COLLECTION_BY_HANDLE_QUERY,
  FEATURED_COLLECTIONS_QUERY,
  PRODUCT_BY_HANDLE_QUERY
} from '@/lib/shopify/queries';
import type { Collection, Product } from '@/lib/shopify/types';

export async function getFeaturedCollections(): Promise<Collection[]> {
  try {
    const data = await shopifyFetch<{ collections: { nodes: Collection[] } }>({
      query: FEATURED_COLLECTIONS_QUERY,
      revalidate: 300,
      tags: ['collections']
    });
    return data.collections.nodes;
  } catch {
    return [];
  }
}

export async function getCollectionByHandle(handle: string): Promise<Collection> {
  const data = await shopifyFetch<{
    collection: Collection & { products: { nodes: Product[] } } | null;
  }>({
    query: COLLECTION_BY_HANDLE_QUERY,
    variables: { handle },
    revalidate: 300,
    tags: ['collections', `collection:${handle}`]
  });

  if (!data.collection) {
    notFound();
  }

  return {
    ...data.collection,
    products: data.collection.products.nodes
  };
}

export async function getProductByHandle(handle: string): Promise<Product & { variants: Array<{ id: string; title: string; availableForSale: boolean }> }> {
  const data = await shopifyFetch<{
    product: (Product & { variants: { nodes: Array<{ id: string; title: string; availableForSale: boolean }> } }) | null;
  }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    revalidate: 300,
    tags: ['products', `product:${handle}`]
  });

  if (!data.product) {
    notFound();
  }

  return {
    ...data.product,
    variants: data.product.variants.nodes
  };
}
