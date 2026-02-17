import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { removeCartLines } from '@/lib/shopify/cart';
import { ShopifyClientError } from '@/lib/shopify/client';

const schema = z.object({
  cartId: z.string().min(1),
  lineIds: z.array(z.string().min(1)).min(1)
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const rate = checkRateLimit(`cart:remove:${ip}`, 40, 60_000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter ?? 60) } });
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const cart = await removeCartLines(parsed.data.cartId, parsed.data.lineIds);
    return NextResponse.json({ cart });
  } catch (error) {
    if (error instanceof ShopifyClientError) {
      return NextResponse.json({ error: error.message }, { status: error.status ?? 502 });
    }
    return NextResponse.json({ error: 'Unexpected error while removing cart lines' }, { status: 500 });
  }
}
