import { APPROVAL_TYPE_LABEL } from "@/entities/approval";
import type { ApprovalType, PendingApproval } from "@/entities/approval";

/** The card heading, e.g. "보호소 검증 요청". */
export const approvalHeadline = (type: ApprovalType): string => `${APPROVAL_TYPE_LABEL[type]} 요청`;

/** What the subject id refers to, per type. */
const SUBJECT_LABEL: Record<ApprovalType, string> = {
  SHELTER_VERIFICATION: "보호소",
  STAFF_PROMOTION: "대상 회원",
  ADOPTION: "신청서",
  FOSTER: "신청서",
};

/** A short, id-safe reference tag, e.g. "보호소 #a1b2c3". */
export const subjectTag = (approval: PendingApproval): string =>
  `${SUBJECT_LABEL[approval.type]} #${approval.subjectRef.slice(-6)}`;

/** A privacy-safe requester handle (no PII is exposed). */
export const maskRequester = (requesterId: string): string => `요청자 ${requesterId.slice(-6)}`;

/** A one-line hint drawn from the submit-time context (best-effort, id-safe). */
export const approvalContextLine = (approval: PendingApproval): string | null => {
  const context = approval.context ?? {};
  const animalId = typeof context.animalId === "string" ? context.animalId : null;
  const shelterId = typeof context.shelterId === "string" ? context.shelterId : null;

  if (animalId) return `대상 동물 #${animalId.slice(-6)}`;
  if (shelterId) return `소속 보호소 #${shelterId.slice(-6)}`;

  return null;
};

/** "7월 26일" — the request's submitted date, or null when absent. */
export const formatApprovalDate = (iso: string | null): string | null =>
  iso ? new Date(iso).toLocaleDateString("ko-KR", { month: "long", day: "numeric" }) : null;
