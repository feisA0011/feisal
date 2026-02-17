const REDACT_KEYS = ['authorization', 'token', 'secret', 'cookie', 'checkoutUrl'];

function redact(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (REDACT_KEYS.some((k) => key.toLowerCase().includes(k.toLowerCase()))) {
        return [key, '[REDACTED]'];
      }
      return [key, value];
    })
  );
}

export function logInfo(message: string, context: Record<string, unknown> = {}) {
  console.info(message, redact(context));
}

export function logError(message: string, context: Record<string, unknown> = {}) {
  console.error(message, redact(context));
}
