import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/shopify/cart', () => ({
  getCart: vi.fn().mockResolvedValue({ id: '1', checkoutUrl: 'https://checkout', totalQuantity: 0, lines: [] })
}));

import { POST } from '@/app/api/tools/getCheckoutUrl/route';

describe('POST /api/tools/getCheckoutUrl', () => {
  it('validates payload', async () => {
    const response = await POST(new Request('http://localhost/api/tools/getCheckoutUrl', { method: 'POST', body: '{}' }));
    expect(response.status).toBe(400);
  });

  it('returns checkout URL', async () => {
    const response = await POST(
      new Request('http://localhost/api/tools/getCheckoutUrl', {
        method: 'POST',
        body: JSON.stringify({ cartId: 'gid://shopify/Cart/1' })
      })
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ checkoutUrl: 'https://checkout' });
  });
});
