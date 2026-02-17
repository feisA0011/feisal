'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl py-12">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-zinc-600">We have logged this error. Please try again.</p>
      <button
        className="mt-4 rounded bg-zinc-900 px-4 py-2 text-white"
        onClick={() => reset()}
        type="button"
      >
        Retry
      </button>
    </div>
  );
}
