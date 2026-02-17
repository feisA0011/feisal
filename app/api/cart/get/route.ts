import { NextResponse } from 'next/server';
import { getCart } from '@/lib/shopify/cart';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get('cartId');
  if (!cartId) {
    return NextResponse.json({ error: 'cartId is required' }, { status: 400 });
  }

  const cart = await getCart(cartId);
  return NextResponse.json({ cart });
}
