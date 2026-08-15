export type ApplicationKind = "ADOPTION" | "FOSTER";

/** Adoption + foster lifecycles share these; RETURNED is adoption-only. */
export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | "WITHDRAWN" | "RETURNED";

/** List-row projection — no answers, so the queue stays lightweight. */
export interface ApplicationSummary {
  id: string;
  kind: ApplicationKind;
  animalId: string;
  shelterId: string;
  applicantId: string;
  status: ApplicationStatus;
  questionnaireVersion: number;
  /** Foster only — the planned end date (null = 무기한 / adoption). */
  plannedEndDate: string | null;
  createdAt: string | null;
}

/** One submitted answer — `values` is always a string list. */
export interface ApplicationAnswer {
  questionId: string;
  values: string[];
}

/** Single-application projection: the summary plus the submitted answers. */
export interface ApplicationDetail extends ApplicationSummary {
  answers: ApplicationAnswer[];
  /** The shelter's reject reason, present once REJECTED. */
  decidedReason: string | null;
}

/** A cursor page of a shelter's applications. */
export interface ApplicationPage {
  applications: ApplicationSummary[];
  nextCursor: string | null;
  hasNext: boolean;
}

export const KIND_LABEL: Record<ApplicationKind, string> = {
  ADOPTION: "입양",
  FOSTER: "임시보호",
};

export const STATUS_LABEL: Record<ApplicationStatus, string> = {
  PENDING: "심사 중",
  APPROVED: "승인",
  REJECTED: "반려",
  WITHDRAWN: "신청 취소",
  RETURNED: "반환",
};

/** Maps to `Hb.Chip` colors. */
export const STATUS_COLOR: Record<ApplicationStatus, "warning" | "success" | "error" | "default" | "secondary"> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "error",
  WITHDRAWN: "default",
  RETURNED: "secondary",
};
