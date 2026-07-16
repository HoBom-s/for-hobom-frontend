const NICKNAME_CHARS = /^[가-힣a-zA-Z0-9_-]+$/;

/** Validate a nickname against the backend contract (2~20자, 한글/영문/숫자/_/-).
 *  Returns an error message, or null when valid — pure, so the dialog can show
 *  instant feedback without a round trip. */
export const validateNickname = (value: string): string | null => {
  const trimmed = value.trim();

  if (trimmed.length < 2) return "2자 이상 입력해 주세요.";
  if (trimmed.length > 20) return "20자 이하로 입력해 주세요.";
  if (!NICKNAME_CHARS.test(trimmed)) return "한글, 영문, 숫자, _, - 만 쓸 수 있어요.";

  return null;
};
