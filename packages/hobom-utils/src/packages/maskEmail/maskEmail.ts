/**
 * Mask an email's local part, keeping its first character and the full domain.
 *
 * `foxmon1524@gmail.com` → `f*********@gmail.com`. A single-character local part
 * becomes `*`. Input without a usable local part (`@x.com`, no `@`) is fully
 * masked.
 *
 * @param email - The email address to mask.
 *
 * @category String
 */
export function maskEmail(email: string): string {
  const at = email.indexOf("@");

  if (at <= 0) return "*".repeat(Math.max(email.length, 1));

  const local = email.slice(0, at);
  const domain = email.slice(at);

  if (local.length === 1) return `*${domain}`;

  const first = local[0] ?? "";

  return `${first}${"*".repeat(local.length - 1)}${domain}`;
}
