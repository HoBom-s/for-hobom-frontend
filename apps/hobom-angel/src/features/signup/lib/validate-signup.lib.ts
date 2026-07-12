const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Instant client-side email format check (server re-validates). */
export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email.trim());

/** A verification code is exactly six digits. */
export const isValidCode = (code: string): boolean => /^\d{6}$/.test(code);

export interface ProfileValues {
  nickname: string;
  password: string;
}

export interface ProfileErrors {
  nickname?: string;
  password?: string;
}

/** Validate the profile step; returns a per-field error map (empty when valid). */
export const validateProfile = ({ nickname, password }: ProfileValues): ProfileErrors => {
  const errors: ProfileErrors = {};

  if (nickname.trim().length === 0) {
    errors.nickname = "닉네임을 입력해주세요.";
  }

  if (password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 해요.";
  }

  return errors;
};
