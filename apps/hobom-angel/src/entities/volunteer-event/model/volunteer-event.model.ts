export type VolunteerEventStatus = "OPEN" | "CLOSED" | "CANCELLED";

/** A shelter's volunteer event as the microsite renders it (§04 봉사 tab). */
export interface VolunteerEvent {
  id: string;
  title: string;
  description: string;
  /** ISO date the event starts. */
  startAt: string;
  /** ISO date the event ends. */
  endAt: string;
  capacity: number;
  signedUpCount: number;
  status: VolunteerEventStatus;
}

export const VOLUNTEER_STATUS_LABEL: Record<VolunteerEventStatus, string> = {
  OPEN: "모집 중",
  CLOSED: "마감",
  CANCELLED: "취소됨",
};
