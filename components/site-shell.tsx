import Link from 'next/link';
import type { ReactNode } from 'react';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-zinc-200">
        <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/" className="font-semibold">
            Green Panda
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/collections/all">Shop</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-4">{children}</main>
      <footer className="border-t border-zinc-200 p-4 text-sm text-zinc-600">
        <div className="mx-auto flex max-w-6xl gap-4">
          <Link href="/shipping">Shipping</Link>
          <Link href="/returns">Returns</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
    </>
  );
}
