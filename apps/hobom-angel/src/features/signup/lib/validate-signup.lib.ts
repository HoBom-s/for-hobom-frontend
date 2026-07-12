const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the backend Nickname VO: 2–20 chars of Korean/Latin letters, digits, _ or -.
const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣_-]{2,20}$/;

// Mobile number the server accepts: 010 + 8 digits, no separators.
const PHONE_PATTERN = /^010\d{8}$/;

// 8–72 chars mixing letters and digits. The server enforces the length bounds;
// the letter+digit combination is an additional client-side strength guard.
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;

/** Instant client-side email format check (server re-validates). */
export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email.trim());

/** 8–72 chars combining letters and digits. */
export const isValidPassword = (password: string): boolean => PASSWORD_PATTERN.test(password);

/** Instant nickname check matching the server rule (server re-validates + dedupes). */
export const isValidNickname = (nickname: string): boolean => NICKNAME_PATTERN.test(nickname.trim());

/** Real name is required and at most 50 chars. */
export const isValidRealName = (realName: string): boolean => {
  const trimmed = realName.trim();

  return trimmed.length >= 1 && trimmed.length <= 50;
};

/** Mobile number: 010 followed by 8 digits. */
export const isValidPhone = (phone: string): boolean => PHONE_PATTERN.test(phone.trim());
