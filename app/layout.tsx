import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'Green Panda',
    template: '%s | Green Panda'
  },
  description: 'Premium CBD products with transparent sourcing and fast Denmark shipping.',
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
