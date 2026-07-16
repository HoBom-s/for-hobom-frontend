export type VerifiedChannel = "EMAIL" | "PHONE";

/** How the member completed identity verification (shown on the profile). */
export const VERIFIED_CHANNEL_LABEL: Record<VerifiedChannel, string> = {
  EMAIL: "이메일 인증",
  PHONE: "휴대폰 인증",
};
