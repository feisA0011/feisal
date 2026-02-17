import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildMetadata(`Guide: ${slug}`, 'Educational guide content scaffold.', `/guides/${slug}`);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <article>
      <h1 className="text-3xl font-semibold">Guide: {slug}</h1>
      <p className="mt-2 text-zinc-600">Content hub scaffold for editorial guides.</p>
    </article>
  );
}
