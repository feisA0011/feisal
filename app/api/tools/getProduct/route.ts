import { NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { getProductByHandle } from '@/lib/shopify/storefront';

const schema = z.object({ handle: z.string().min(1) });

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const rate = checkRateLimit(`tools:getProduct:${ip}`, 30, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });

  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const product = await getProductByHandle(parsed.data.handle);
  return NextResponse.json({
    product: {
      id: product.id,
      handle: product.handle,
      title: product.title,
      availableForSale: product.availableForSale,
      price: product.priceRange.minVariantPrice
    }
  });
}
