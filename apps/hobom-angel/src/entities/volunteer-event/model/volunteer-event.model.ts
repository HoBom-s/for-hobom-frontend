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

/** Remaining open spots, floored at 0. */
export const spotsLeft = (event: VolunteerEvent): number =>
  Math.max(event.capacity - event.signedUpCount, 0);

/** Whether the event is accepting signups (open and has room). */
export const isSignUpOpen = (event: VolunteerEvent): boolean =>
  event.status === "OPEN" && spotsLeft(event) > 0;
