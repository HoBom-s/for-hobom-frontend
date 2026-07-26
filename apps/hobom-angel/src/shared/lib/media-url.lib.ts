const ENV = import.meta.env as Record<string, string | undefined>;
const BASE = ENV["VITE_MEDIA_BASE_URL"];

/** Resolve a stored media object key to a displayable URL. Absolute URLs (mocks,
 *  already-public assets) pass through; bare keys are served off the CDN base. */
export const mediaUrl = (key: string): string => {
  if (/^https?:\/\//.test(key)) return key;
  if (BASE) return `${BASE.replace(/\/$/, "")}/${key.replace(/^\//, "")}`;

  return key;
};
