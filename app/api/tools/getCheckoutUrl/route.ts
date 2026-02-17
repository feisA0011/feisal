import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getCart } from '@/lib/shopify/cart';
import { checkRateLimit } from '@/lib/security/rate-limit';

const schema = z.object({ cartId: z.string().min(1) });

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const rate = checkRateLimit(`tools:getCheckoutUrl:${ip}`, 30, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });

  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const cart = await getCart(parsed.data.cartId);
  if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 });

  return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
}
