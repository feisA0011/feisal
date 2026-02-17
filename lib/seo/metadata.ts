import type { Metadata } from 'next';

export function buildMetadata(title: string, description: string, canonicalPath: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalPath
    }
  };
}
