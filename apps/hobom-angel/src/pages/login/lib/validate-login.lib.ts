export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

// Intentionally lenient — the server is the source of truth; this is just an
// instant client-side format check (spec §검증: 즉시 형식검증·서버 재검증).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate the login form; returns a per-field error map (empty when valid). */
export const validateLogin = ({ email, password }: LoginValues): LoginErrors => {
  const errors: LoginErrors = {};

  if (email.trim().length === 0) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "올바른 이메일 형식이 아니에요.";
  }

  if (password.length === 0) {
    errors.password = "비밀번호를 입력해주세요.";
  }

  return errors;
};
