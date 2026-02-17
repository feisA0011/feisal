import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/env', () => ({
  env: {
    SHOPIFY_STORE_DOMAIN: 'test.myshopify.com',
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: 'token',
    SHOPIFY_API_VERSION: '2025-01'
  }
}));

import { ShopifyClientError, shopifyFetch } from '@/lib/shopify/client';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('shopifyFetch', () => {
  it('returns data on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ data: { ok: true } }) }));
    const result = await shopifyFetch<{ ok: boolean }>({ query: '{ shop { name } }' });
    expect(result.ok).toBe(true);
  });

  it('retries once and succeeds', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ data: { ok: true } }) });
    vi.stubGlobal('fetch', fetchMock);

    const result = await shopifyFetch<{ ok: boolean }>({ query: '{}', retries: 1 });
    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('throws ShopifyClientError for GraphQL errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ errors: [{ message: 'bad' }] }) })
    );

    await expect(shopifyFetch({ query: '{}' })).rejects.toBeInstanceOf(ShopifyClientError);
  });
});
