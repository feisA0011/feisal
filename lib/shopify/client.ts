import { env } from '@/lib/env';

export class ShopifyClientError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ShopifyClientError';
  }
}

export async function shopifyFetch<TData>(params: {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number;
  timeoutMs?: number;
  retries?: number;
}): Promise<TData> {
  const timeoutMs = params.timeoutMs ?? 5000;
  const retries = params.retries ?? 1;
  const endpoint = env.SHOPIFY_STORE_DOMAIN
    ? `https://${env.SHOPIFY_STORE_DOMAIN}/api/${env.SHOPIFY_API_VERSION}/graphql.json`
    : '';

  if (!endpoint || !env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new ShopifyClientError('Shopify environment is not configured.');
  }

  let attempts = 0;
  while (attempts <= retries) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
        body: JSON.stringify({ query: params.query, variables: params.variables ?? {} }),
        cache: params.cache,
        next: params.tags || params.revalidate ? { tags: params.tags, revalidate: params.revalidate } : undefined
      });

      const body = (await response.json()) as { data?: TData; errors?: Array<{ message: string }> };
      if (!response.ok) {
        throw new ShopifyClientError('Shopify request failed.', response.status, body);
      }
      if (body.errors?.length) {
        throw new ShopifyClientError('Shopify returned GraphQL errors.', response.status, body.errors);
      }
      if (!body.data) {
        throw new ShopifyClientError('Shopify returned an empty response.', response.status);
      }
      clearTimeout(timeout);
      return body.data;
    } catch (error) {
      clearTimeout(timeout);
      attempts += 1;
      if (attempts > retries) {
        if (error instanceof ShopifyClientError) {
          throw error;
        }
        throw new ShopifyClientError('Shopify request failed unexpectedly.', undefined, String(error));
      }
    }
  }

  throw new ShopifyClientError('Shopify request exhausted retries.');
}
