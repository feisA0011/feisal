import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata('Faq', 'Faq policy and customer support details.', '/faq');

export default function FaqPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Faq</h1>
      <p className="mt-2 text-zinc-600">This page is a starter template. Keep language informational and avoid medical claims.</p>
    </section>
  );
}
