/**
 * Mask a phone number, keeping the leading prefix and the last four digits.
 *
 * Non-digits are stripped first, so `01012341234` and `010-1234-1234` both
 * become `010-****-1234`. Numbers shorter than seven digits are fully masked.
 *
 * @param phone - The phone number to mask.
 *
 * @category String
 */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (digits.length < 7) return "*".repeat(Math.max(digits.length, 1));

  const head = digits.slice(0, 3);
  const tail = digits.slice(-4);
  const middle = "*".repeat(digits.length - 7);

  return `${head}-${middle}-${tail}`;
}
