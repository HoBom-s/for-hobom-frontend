export type VolunteerEventStatus = "OPEN" | "CLOSED" | "CANCELLED";

export type VolunteerType = "GENERAL" | "OVERSEAS";

/** The viewer's own live signup state. The backend only surfaces "live" states
 *  (a rejected/withdrawn signup reads back as null). */
export type VolunteerSignupStatus = "PENDING" | "APPROVED";

/** Flight/transport details, present only for OVERSEAS 이동봉사 events. */
export interface VolunteerTransport {
  departure: string;
  arrival: string;
  /** ISO datetime of the flight. */
  flightAt: string;
  animalCount: number;
  qualification: string | null;
}

/** A shelter's volunteer event as the microsite renders it (§04 봉사 tab). */
export interface VolunteerEvent {
  id: string;
  shelterId: string;
  title: string;
  description: string;
  /** ISO date the event starts. */
  startAt: string;
  /** ISO date the event ends. */
  endAt: string;
  capacity: number;
  signedUpCount: number;
  status: VolunteerEventStatus;
  type: VolunteerType;
  /** Transport details for OVERSEAS events; null for GENERAL. */
  transport: VolunteerTransport | null;
  /** The viewer's own signup id, used to withdraw; null if not signed up. */
  mySignupId: string | null;
  /** The viewer's live signup status, or null if not signed up. */
  mySignupStatus: VolunteerSignupStatus | null;
}

export const VOLUNTEER_STATUS_LABEL: Record<VolunteerEventStatus, string> = {
  OPEN: "모집 중",
  CLOSED: "마감",
  CANCELLED: "취소됨",
};

export const VOLUNTEER_TYPE_LABEL: Record<VolunteerType, string> = {
  GENERAL: "일반 봉사",
  OVERSEAS: "해외 이동봉사",
};

export const VOLUNTEER_SIGNUP_STATUS_LABEL: Record<VolunteerSignupStatus, string> = {
  PENDING: "승인 대기",
  APPROVED: "참여 확정",
};

/** Remaining open spots, floored at 0. */
export const spotsLeft = (event: VolunteerEvent): number =>
  Math.max(event.capacity - event.signedUpCount, 0);

/** Whether the event is accepting signups (open and has room). */
export const isSignUpOpen = (event: VolunteerEvent): boolean =>
  event.status === "OPEN" && spotsLeft(event) > 0;
