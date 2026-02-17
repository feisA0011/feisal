import { describe, expect, it } from 'vitest';
import { checkRateLimit, clearRateLimits } from '@/lib/security/rate-limit';

describe('checkRateLimit', () => {
  it('blocks requests after limit', () => {
    clearRateLimits();
    const key = 'unit:test';
    expect(checkRateLimit(key, 2, 60_000).allowed).toBe(true);
    expect(checkRateLimit(key, 2, 60_000).allowed).toBe(true);
    expect(checkRateLimit(key, 2, 60_000).allowed).toBe(false);
  });
});
