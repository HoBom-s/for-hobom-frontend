/** `POST /auth/signup` body. Tokens come back as httpOnly cookies, not in the body. */
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
