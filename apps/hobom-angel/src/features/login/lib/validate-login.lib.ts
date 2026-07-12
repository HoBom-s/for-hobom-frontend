const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Instant client-side email format check (the server re-validates). */
export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email.trim());
