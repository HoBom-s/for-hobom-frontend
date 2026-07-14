/**
 * Serialize a flat params object into a URL query string (`?a=1&b=2`), skipping
 * `null`/`undefined`/empty-string values. Returns `""` when nothing is left to
 * send, so it can be appended to a path unconditionally.
 *
 * Takes a plain `object` (rather than `Record<string, …>`) so typed DTO
 * interfaces pass without an index-signature dance; values are stringified.
 */
export const toQueryString = (params: object): string => {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;

    query.set(key, String(value));
  }

  const serialized = query.toString();

  return serialized ? `?${serialized}` : "";
};
