import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata('Shipping', 'Shipping policy and customer support details.', '/shipping');

export default function ShippingPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Shipping</h1>
      <p className="mt-2 text-zinc-600">This page is a starter template. Keep language informational and avoid medical claims.</p>
    </section>
  );
}
