import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata('Privacy', 'Privacy policy and customer support details.', '/privacy');

export default function PrivacyPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Privacy</h1>
      <p className="mt-2 text-zinc-600">This page is a starter template. Keep language informational and avoid medical claims.</p>
    </section>
  );
}
