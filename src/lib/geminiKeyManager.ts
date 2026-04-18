const MIN_RETRY_DELAY_MS = 200;
const MAX_RETRY_DELAY_MS = 500;

let currentKeyIndex = 0;

export const GEMINI_KEYS_EXHAUSTED_MESSAGE = "All API keys exhausted. Try later.";

export class GeminiKeysExhaustedError extends Error {
  constructor(message = GEMINI_KEYS_EXHAUSTED_MESSAGE) {
    super(message);
    this.name = "GeminiKeysExhaustedError";
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomRetryDelayMs(): number {
  const range = MAX_RETRY_DELAY_MS - MIN_RETRY_DELAY_MS;
  return MIN_RETRY_DELAY_MS + Math.floor(Math.random() * (range + 1));
}

function hashToIndex(seed: string, size: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return size > 0 ? hash % size : 0;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

function getErrorStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") return null;

  const withStatus = error as { status?: unknown; statusCode?: unknown; code?: unknown };
  const candidates = [withStatus.status, withStatus.statusCode, withStatus.code];

  for (const value of candidates) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return null;
}

export function isQuotaOrRateLimitError(error: unknown): boolean {
  const status = getErrorStatus(error);
  if (status === 429) return true;

  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("resource_exhausted") ||
    message.includes("too many requests")
  );
}

function parseGeminiApiKeys(): string[] {
  const rawKeys = process.env.GEMINI_API_KEYS || "";
  return rawKeys
    .split(",")
    .map((key) => key.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

export function hasGeminiApiKeys(): boolean {
  return parseGeminiApiKeys().length > 0;
}

export async function executeWithGeminiKeyRotation<T>(
  operation: (apiKey: string, meta: { attempt: number; maxRetries: number; keyIndex: number }) => Promise<T>,
  options?: { userSeed?: string }
): Promise<T> {
  const keys = parseGeminiApiKeys();
  if (keys.length === 0) {
    throw new Error("GEMINI_API_KEYS is not configured.");
  }

  const maxRetries = keys.length;
  let lastRotationError: unknown = null;
  const startIndex = options?.userSeed
    ? hashToIndex(options.userSeed, keys.length)
    : currentKeyIndex % keys.length;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const keyIndex = (startIndex + (attempt - 1)) % keys.length;
    const apiKey = keys[keyIndex];

    try {
      return await operation(apiKey, { attempt, maxRetries, keyIndex });
    } catch (error) {
      if (!isQuotaOrRateLimitError(error)) {
        // Non-quota failures should bubble immediately.
        throw error;
      }

      lastRotationError = error;
      const reason = getErrorMessage(error);
      console.warn(
        `[GeminiKeyManager] Quota/rate issue on key index ${keyIndex}. Attempt ${attempt}/${maxRetries}. Reason: ${reason}`
      );

      currentKeyIndex = (currentKeyIndex + 1) % keys.length;
      if (attempt < maxRetries) {
        await sleep(randomRetryDelayMs());
      }
    }
  }

  throw new GeminiKeysExhaustedError(
    lastRotationError ? `${GEMINI_KEYS_EXHAUSTED_MESSAGE}` : GEMINI_KEYS_EXHAUSTED_MESSAGE
  );
}
