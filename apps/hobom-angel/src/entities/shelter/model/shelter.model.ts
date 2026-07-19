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

/** Only VERIFIED shelters show the ✓ badge and get PII privileges. */
export const isShelterVerified = (status: ShelterStatus): boolean => status === "VERIFIED";

/** The precise road address is only shown when the policy is FULL. */
export const isPreciseAddress = (visibility: AddressVisibility): boolean => visibility === "FULL";

export const TRUST_TIER_LABEL: Record<TrustTier, string> = {
  A: "인증 단체",
  B: "인증 활동가",
};
