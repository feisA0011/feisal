# Green Panda Storefront (Headless Shopify + Next.js)

Production-grade headless Shopify storefront scaffold for a Denmark CBD store.

## Stack

- Next.js App Router + TypeScript (`strict`)
- Tailwind CSS v4
- Shopify Storefront GraphQL API
- Vitest for deterministic unit tests
- Sentry for server/client observability + app error boundary capture
- Netlify deployment via Next.js plugin (OpenNext-compatible runtime path)

## Non-negotiables

- Payments happen **only** in Shopify Checkout (`checkoutUrl`).
- No payment data is processed or stored in this app.
- No medical claims in storefront copy.

## Implemented MVP Surface

### Pages

- `/` home
- `/collections/[handle]` PLP
- `/products/[handle]` PDP
- `/cart`
- `/guides/[slug]`
- `/shipping`, `/returns`, `/faq`, `/privacy`, `/terms`

### APIs

- Cart: `/api/cart/create|add|update|remove|get|checkout-url`
- Revalidation: `/api/revalidate`
- Shopify webhooks: `/api/webhooks/shopify`
- Tool endpoints:
  - `/api/tools/searchProducts`
  - `/api/tools/getProduct`
  - `/api/tools/createCart`
  - `/api/tools/addToCart`
  - `/api/tools/getCheckoutUrl`

## Security and reliability

- Strict security headers in `next.config.ts` (CSP/HSTS/XFO/Permissions-Policy/etc).
- In-memory rate limiting for mutation + tool + webhook endpoints.
- Shopify webhook HMAC signature verification.
- Webhook idempotency guard (`x-shopify-event-id`).
- Redacted logger helper for sensitive fields.

## SEO and performance defaults

- SSR/ISR-first route rendering with page-level `revalidate`.
- Product JSON-LD on PDP, plus a compliance/COA section scaffold.
- Canonical + OpenGraph metadata helpers.
- `robots.ts` + `sitemap.ts` included.
- `next/image` with AVIF/WebP and responsive `sizes`.

## Environment variables

Copy `.env.example` to `.env.local` and fill values:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_API_VERSION` (default set in code)
- `SHOPIFY_WEBHOOK_SECRET`
- `REVALIDATE_SECRET`
- `SENTRY_DSN` (optional)
- `NEXT_PUBLIC_SENTRY_DSN` (optional)

## Local development

```bash
pnpm install
pnpm dev
```

Validation:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

## Netlify deployment

1. Connect repository in Netlify.
2. Ensure env vars above are configured in Netlify UI.
3. Build command: `pnpm build` (also set in `netlify.toml`).
4. Add webhook in Shopify Admin pointing to:
   - `https://<your-domain>/api/webhooks/shopify`
5. For on-demand revalidate, call:
   - `POST /api/revalidate` with `{"secret":"...","tags":[...],"paths":[...]}`.

## Notes

- Current rate limiting/idempotency storage is in-memory for MVP scaffolding. For multi-instance production durability, move to a shared store (e.g., Redis/Upstash).
- Tool endpoints are intentionally minimal and validated; no raw GraphQL passthrough or admin mutations.
