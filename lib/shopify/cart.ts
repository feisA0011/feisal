import { z } from 'zod';
import { shopifyFetch, ShopifyClientError } from '@/lib/shopify/client';
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_QUERY
} from '@/lib/shopify/queries';
import type { Cart } from '@/lib/shopify/types';

const lineInputSchema = z.object({ merchandiseId: z.string().min(1), quantity: z.number().int().positive() });
const lineUpdateSchema = z.object({ id: z.string().min(1), quantity: z.number().int().positive() });

function normalizeCart(raw: {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: { nodes: Cart['lines'] };
}): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    lines: raw.lines.nodes
  };
}

function assertUserErrors(errors: Array<{ message: string }>) {
  if (errors.length > 0) {
    throw new ShopifyClientError(errors[0].message, 400, errors);
  }
}

export async function createCart(lines: unknown): Promise<Cart> {
  const parsed = z.array(lineInputSchema).parse(lines ?? []);
  const data = await shopifyFetch<{
    cartCreate: { cart: { id: string; checkoutUrl: string; totalQuantity: number; lines: { nodes: Cart['lines'] } } | null; userErrors: Array<{ message: string }> };
  }>({ query: CART_CREATE_MUTATION, variables: { lines: parsed }, cache: 'no-store' });
  assertUserErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) throw new ShopifyClientError('Failed to create cart', 500);
  return normalizeCart(data.cartCreate.cart);
}

export async function addCartLines(cartId: string, lines: unknown): Promise<Cart> {
  const parsed = z.array(lineInputSchema).min(1).parse(lines);
  const data = await shopifyFetch<{ cartLinesAdd: { cart: { id: string; checkoutUrl: string; totalQuantity: number; lines: { nodes: Cart['lines'] } } | null; userErrors: Array<{ message: string }> } }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines: parsed },
    cache: 'no-store'
  });
  assertUserErrors(data.cartLinesAdd.userErrors);
  if (!data.cartLinesAdd.cart) throw new ShopifyClientError('Failed to add cart lines', 500);
  return normalizeCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(cartId: string, lines: unknown): Promise<Cart> {
  const parsed = z.array(lineUpdateSchema).min(1).parse(lines);
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: { id: string; checkoutUrl: string; totalQuantity: number; lines: { nodes: Cart['lines'] } } | null; userErrors: Array<{ message: string }> } }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines: parsed },
    cache: 'no-store'
  });
  assertUserErrors(data.cartLinesUpdate.userErrors);
  if (!data.cartLinesUpdate.cart) throw new ShopifyClientError('Failed to update cart lines', 500);
  return normalizeCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: unknown): Promise<Cart> {
  const parsed = z.array(z.string().min(1)).min(1).parse(lineIds);
  const data = await shopifyFetch<{ cartLinesRemove: { cart: { id: string; checkoutUrl: string; totalQuantity: number; lines: { nodes: Cart['lines'] } } | null; userErrors: Array<{ message: string }> } }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds: parsed },
    cache: 'no-store'
  });
  assertUserErrors(data.cartLinesRemove.userErrors);
  if (!data.cartLinesRemove.cart) throw new ShopifyClientError('Failed to remove cart lines', 500);
  return normalizeCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: { id: string; checkoutUrl: string; totalQuantity: number; lines: { nodes: Cart['lines'] } } | null }>({
    query: CART_QUERY,
    variables: { cartId },
    cache: 'no-store'
  });

  return data.cart ? normalizeCart(data.cart) : null;
}
