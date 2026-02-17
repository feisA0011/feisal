import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata('Terms', 'Terms policy and customer support details.', '/terms');

export default function TermsPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Terms</h1>
      <p className="mt-2 text-zinc-600">This page is a starter template. Keep language informational and avoid medical claims.</p>
    </section>
  );
}
