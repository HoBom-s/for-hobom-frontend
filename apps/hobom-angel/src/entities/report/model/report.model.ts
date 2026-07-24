export type ReportTargetType = "ANIMAL" | "SHELTER" | "USER";
export type ReportReason =
  | "ANIMAL_ABUSE"
  | "FAKE_SHELTER"
  | "INAPPROPRIATE_CONTENT"
  | "USER_MISCONDUCT"
  | "OTHER";
export type ReportStatus = "PENDING" | "RESOLVED";
/** The operator's verdict: dismiss (no action) or uphold (action taken). */
export type ReportResolution = "DISMISSED" | "UPHELD";

export interface Report {
  id: string;
  reporterId: string;
  targetType: ReportTargetType;
  targetRef: string;
  reason: ReportReason;
  detail: string;
  status: ReportStatus;
  resolution: ReportResolution | null;
  resolvedAt: string | null;
}

export const TARGET_LABEL: Record<ReportTargetType, string> = {
  ANIMAL: "동물",
  SHELTER: "보호소",
  USER: "회원",
};

export const REASON_LABEL: Record<ReportReason, string> = {
  ANIMAL_ABUSE: "동물 학대",
  FAKE_SHELTER: "허위 보호소",
  INAPPROPRIATE_CONTENT: "부적절한 콘텐츠",
  USER_MISCONDUCT: "이용자 부정행위",
  OTHER: "기타",
};

export const RESOLUTION_LABEL: Record<ReportResolution, string> = {
  DISMISSED: "기각",
  UPHELD: "조치",
};
