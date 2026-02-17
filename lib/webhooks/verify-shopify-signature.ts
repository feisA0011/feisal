import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyShopifyWebhookSignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) {
    return false;
  }

  const digest = createHmac('sha256', secret).update(payload, 'utf8').digest('base64');
  const received = Buffer.from(signature, 'utf8');
  const expected = Buffer.from(digest, 'utf8');

  if (received.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(received, expected);
}
