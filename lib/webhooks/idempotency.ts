const processed = new Map<string, number>();
const TTL_MS = 1000 * 60 * 60;

export function markEventProcessed(eventId: string): boolean {
  const now = Date.now();
  for (const [key, value] of processed.entries()) {
    if (value < now) {
      processed.delete(key);
    }
  }

  if (processed.has(eventId)) {
    return false;
  }

  processed.set(eventId, now + TTL_MS);
  return true;
}

export function clearProcessedEvents() {
  processed.clear();
}
