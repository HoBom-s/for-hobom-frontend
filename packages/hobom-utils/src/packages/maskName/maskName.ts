/**
 * Mask a personal name, revealing only the first and last characters.
 *
 * `홍길동` → `홍*동`, `남궁민수` → `남**수`, `김철` → `김*`, `A` → `*`, `""` → `""`.
 * Counts by code point so surrogate-pair characters aren't split.
 *
 * @param name - The name to mask.
 *
 * @category String
 */
export function maskName(name: string): string {
  const chars = Array.from(name);
  const length = chars.length;

  if (length === 0) return "";
  if (length === 1) return "*";

  const first = chars[0] ?? "";

  if (length === 2) return `${first}*`;

  const last = chars[length - 1] ?? "";

  return `${first}${"*".repeat(length - 2)}${last}`;
}
