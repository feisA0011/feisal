import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { clearProcessedEvents, markEventProcessed } from '@/lib/webhooks/idempotency';
import { verifyShopifyWebhookSignature } from '@/lib/webhooks/verify-shopify-signature';

describe('verifyShopifyWebhookSignature', () => {
  const payload = JSON.stringify({ id: 1 });
  const secret = 'secret';
  const signature = createHmac('sha256', secret).update(payload, 'utf8').digest('base64');

  it('returns true for valid signature', () => {
    expect(verifyShopifyWebhookSignature(payload, signature, secret)).toBe(true);
  });

  it('returns false for invalid signature', () => {
    expect(verifyShopifyWebhookSignature(payload, 'invalid', secret)).toBe(false);
  });
});

describe('markEventProcessed', () => {
  it('enforces idempotency by event id', () => {
    clearProcessedEvents();
    expect(markEventProcessed('evt-1')).toBe(true);
    expect(markEventProcessed('evt-1')).toBe(false);
  });
});
