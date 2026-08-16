export type ShelterStatus = "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED" | "SUSPENDED";
export type TrustTier = "A" | "B";
export type AddressVisibility = "FULL" | "PARTIAL" | "HIDDEN";
export type FacilityPhotoKind = "EXTERIOR" | "INTERIOR" | "OTHER";

/** The shelter's address, projected by the backend per its disclosure policy —
 *  fields the policy hides simply arrive absent (null here). */
export interface ShelterAddress {
  region: string;
  city: string | null;
  roadAddress: string | null;
  lat: number | null;
  lng: number | null;
}

export interface FacilityPhoto {
  url: string;
  kind: FacilityPhotoKind;
  caption: string | null;
}

/** The shelter the microsite renders — a flattened, display-ready view. */
export interface Shelter {
  id: string;
  slug: string;
  name: string;
  status: ShelterStatus;
  trustTier: TrustTier | null;
  addressVisibility: AddressVisibility;
  address: ShelterAddress;
  facilityPhotos: FacilityPhoto[];
  /** Editor-authored greeting/introduction (Markdown). */
  intro: string | null;
  /** ISO date the shelter began operating — the client derives years active. */
  operatingSince: string | null;
  representativeName: string | null;
  /** Visit guidance (Markdown). */
  visitGuide: string | null;
  /** Donation/support guidance (Markdown). */
  supportGuide: string | null;
  /** Microsite cover/hero image URL. */
  coverImageUrl: string | null;
}

/** A verified shelter as it appears in the directory grid (§3.5). */
export interface ShelterListItem {
  id: string;
  name: string;
  slug: string;
  region: string;
  status: ShelterStatus;
  trustTier: TrustTier | null;
  coverImageUrl: string | null;
}

/** A shelter's map marker — resolves a shelterId to name/slug/region + coords. */
export interface ShelterMarker {
  id: string;
  name: string;
  slug: string;
  region: string;
  lat: number | null;
  lng: number | null;
}

/** A shelter notice/news post (공지·소식 tab). */
export interface ShelterAnnouncement {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string | null;
}

/** A shelter FAQ entry (FAQ tab). */
export interface ShelterFaq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

/** Aggregate counts shown on the About tab (§04). */
export interface ShelterStats {
  adoptedCount: number;
  shelteredCount: number;
  availableCount: number;
}

/** One month of the adoption trend (KST `YYYY-MM`). */
export interface MonthlyAdoptionPoint {
  month: string;
  count: number;
}

/** §07 management KPIs for a single shelter (staff-scoped dashboard). */
export interface ShelterDashboard {
  adoptedCount: number;
  shelteredCount: number;
  availableCount: number;
  /** adopted / (adopted + sheltered), 0–1. */
  adoptionRate: number;
  thisMonthAdoptions: number;
  lastMonthAdoptions: number;
  /** Trailing six months, oldest first. */
  monthlyAdoptions: MonthlyAdoptionPoint[];
  pendingApplications: number;
}

export type ShelterStaffRole = "SHELTER_ADMIN" | "SHELTER_STAFF";
export type StaffStatus = "ACTIVE" | "DORMANT" | "SUSPENDED" | "WITHDRAWN";

/** One roster member: who they are and the role(s) they hold at this shelter. */
export interface ShelterStaffMember {
  id: string;
  nickname: string;
  roles: ShelterStaffRole[];
  status: StaffStatus;
}

export const STAFF_ROLE_LABEL: Record<ShelterStaffRole, string> = {
  SHELTER_ADMIN: "대표",
  SHELTER_STAFF: "스태프",
};

export type ApprovalDecision = "APPROVE" | "REJECT";

/** One pending 승격 요청: the candidate plus the approval to decide on. */
export interface StaffPromotionRequest {
  approvalId: string;
  candidateUserId: string;
  candidateNickname: string;
  /** ISO join time, or null — drives the "가입 N개월" line. */
  candidateJoinedAt: string | null;
  volunteerCount: number;
}

/** The representative outranks staff — used for the roster badge and sort. */
export const isShelterAdmin = (roles: readonly ShelterStaffRole[]): boolean =>
  roles.includes("SHELTER_ADMIN");

/** Only VERIFIED shelters show the ✓ badge and get PII privileges. */
export const isShelterVerified = (status: ShelterStatus): boolean => status === "VERIFIED";

/** Outcome of an automated verification check (operator dossier). */
export type SignalStatus = "PASS" | "FAIL" | "UNKNOWN";

export interface VerificationSignal {
  key: string;
  status: SignalStatus;
}

/** §09 operator review — the submitted registration for a shelter awaiting
 *  verification: the identity + address, the ID numbers, the registrant, the
 *  facility photos, and the automated check badges. */
export interface ShelterVerification {
  shelterId: string;
  name: string;
  slug: string;
  status: ShelterStatus;
  address: ShelterAddress;
  addressVisibility: AddressVisibility;
  registrationNumber: string | null;
  businessNumber: string | null;
  registrant: { id: string; nickname: string } | null;
  facilityPhotos: FacilityPhoto[];
  verificationSignals: VerificationSignal[] | null;
  signalsCheckedAt: string | null;
  rejectionReason: string | null;
}

export const SIGNAL_LABEL: Record<string, string> = {
  registryMatch: "등록번호 대조",
  businessValid: "사업자 확인",
  nameMatch: "명의 일치",
};

export const SIGNAL_STATUS_LABEL: Record<SignalStatus, string> = {
  PASS: "통과",
  FAIL: "불일치",
  UNKNOWN: "확인 필요",
};

/** Maps a signal outcome to an `Hb.Chip` color. */
export const SIGNAL_STATUS_COLOR: Record<SignalStatus, "success" | "error" | "default"> = {
  PASS: "success",
  FAIL: "error",
  UNKNOWN: "default",
};

export const FACILITY_PHOTO_KIND_LABEL: Record<FacilityPhotoKind, string> = {
  EXTERIOR: "외부",
  INTERIOR: "내부",
  OTHER: "기타",
};

/** The precise road address is only shown when the policy is FULL. */
export const isPreciseAddress = (visibility: AddressVisibility): boolean => visibility === "FULL";

export const ADDRESS_VISIBILITY_LABEL: Record<AddressVisibility, string> = {
  FULL: "전체 공개",
  PARTIAL: "부분 공개",
  HIDDEN: "비공개",
};

/** A one-line hint for what each disclosure level shows on the map/profile. */
export const ADDRESS_VISIBILITY_HINT: Record<AddressVisibility, string> = {
  FULL: "도로명 주소와 정확한 위치를 공개해요.",
  PARTIAL: "시·군·구까지만, 지도에는 대략 위치로 표시돼요.",
  HIDDEN: "지역만 공개하고 지도에는 표시하지 않아요.",
};

export const TRUST_TIER_LABEL: Record<TrustTier, string> = {
  A: "인증 단체",
  B: "인증 활동가",
};
