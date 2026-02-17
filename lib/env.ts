import { z } from 'zod';

const baseSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().min(1).optional(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string().min(1).optional(),
  SHOPIFY_API_VERSION: z.string().default('2025-01'),
  SHOPIFY_WEBHOOK_SECRET: z.string().min(1).optional(),
  REVALIDATE_SECRET: z.string().min(1).optional(),
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

const validated = baseSchema.parse({
  SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
  SHOPIFY_WEBHOOK_SECRET: process.env.SHOPIFY_WEBHOOK_SECRET,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  SENTRY_DSN: process.env.SENTRY_DSN,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NODE_ENV: process.env.NODE_ENV
});

function assertRequiredServerEnv() {
  if (validated.NODE_ENV === 'test') {
    return;
  }

  const missing: string[] = [];
  if (!validated.SHOPIFY_STORE_DOMAIN) missing.push('SHOPIFY_STORE_DOMAIN');
  if (!validated.SHOPIFY_STOREFRONT_ACCESS_TOKEN) missing.push('SHOPIFY_STOREFRONT_ACCESS_TOKEN');
  if (!validated.SHOPIFY_WEBHOOK_SECRET) missing.push('SHOPIFY_WEBHOOK_SECRET');
  if (!validated.REVALIDATE_SECRET) missing.push('REVALIDATE_SECRET');

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

assertRequiredServerEnv();

export const env = validated;
