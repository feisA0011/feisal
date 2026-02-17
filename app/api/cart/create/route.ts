import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createCart } from '@/lib/shopify/cart';
import { ShopifyClientError } from '@/lib/shopify/client';
import { checkRateLimit } from '@/lib/security/rate-limit';

const schema = z.object({
  lines: z
    .array(z.object({ merchandiseId: z.string().min(1), quantity: z.number().int().positive() }))
    .optional()
});

export async function POST(request: Request) {
  try {
    const ip = (await headers()).get('x-forwarded-for') ?? 'unknown';
    const rate = checkRateLimit(`cart:create:${ip}`, 20, 60_000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter ?? 60) } });
    }

    const parsed = schema.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const cart = await createCart(parsed.data.lines ?? []);
    (await cookies()).set('cartId', cart.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 14
    });

    return NextResponse.json({ cart });
  } catch (error) {
    if (error instanceof ShopifyClientError) {
      return NextResponse.json({ error: error.message }, { status: error.status ?? 502 });
    }
    return NextResponse.json({ error: 'Unexpected error while creating cart' }, { status: 500 });
  }
}
