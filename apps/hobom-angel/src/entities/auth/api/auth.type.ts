/**
 * Auth wire + UI types. The raw shapes mirror the backend Auth DTOs verbatim;
 * the UI model is what the app renders. Session tokens live in HTTP-only cookies
 * set by the backend, so they are deliberately absent from the UI model.
 */

/** `POST /auth/signup` body. */
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  realName: string;
  phone: string;
}

/** `POST /auth/login` body. */
export interface LoginRequest {
  email: string;
  password: string;
}

interface RawTokenPair {
  accessToken: string;
  refreshToken: string;
}

/** `POST /auth/signup` response. */
export interface RawSignUpResponse {
  userId: string;
  nickname: string;
  tokens: RawTokenPair;
}

/** The session identity the app renders after a successful signup. */
export interface AuthSession {
  userId: string;
  nickname: string;
}
