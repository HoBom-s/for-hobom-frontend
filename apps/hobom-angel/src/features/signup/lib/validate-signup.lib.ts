const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the backend Nickname VO: 2–20 chars of Korean/Latin letters, digits, _ or -.
const NICKNAME_PATTERN = /^[A-Za-z0-9가-힣_-]{2,20}$/;

/** Instant client-side email format check (server re-validates). */
export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email.trim());

/** Instant nickname check matching the server rule (server re-validates + dedupes). */
export const isValidNickname = (nickname: string): boolean => NICKNAME_PATTERN.test(nickname.trim());
