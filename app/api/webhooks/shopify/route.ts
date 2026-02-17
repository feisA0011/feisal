import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { markEventProcessed } from '@/lib/webhooks/idempotency';
import { verifyShopifyWebhookSignature } from '@/lib/webhooks/verify-shopify-signature';

function topicToTags(topic: string): string[] {
  if (topic.startsWith('products/')) return ['products'];
  if (topic.startsWith('collections/')) return ['collections'];
  if (topic.startsWith('inventory_levels/')) return ['products'];
  return ['collections', 'products'];
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const rate = checkRateLimit(`webhook:shopify:${ip}`, 60, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  if (!env.SHOPIFY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const payload = await request.text();
  const signature = request.headers.get('x-shopify-hmac-sha256');
  const eventId = request.headers.get('x-shopify-event-id') ?? '';
  const topic = request.headers.get('x-shopify-topic') ?? 'unknown';

  if (!verifyShopifyWebhookSignature(payload, signature, env.SHOPIFY_WEBHOOK_SECRET)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  if (eventId && !markEventProcessed(eventId)) {
    return NextResponse.json({ ok: true, deduplicated: true });
  }

  for (const tag of topicToTags(topic)) {
    revalidateTag(tag);
  }

  return NextResponse.json({ ok: true });
}
