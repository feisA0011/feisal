import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata('Returns', 'Returns policy and customer support details.', '/returns');

export default function ReturnsPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold">Returns</h1>
      <p className="mt-2 text-zinc-600">This page is a starter template. Keep language informational and avoid medical claims.</p>
    </section>
  );
}
