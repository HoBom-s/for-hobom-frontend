import type {
  AddressVisibility,
  FacilityPhotoKind,
  ShelterStatus,
  TrustTier,
} from "../model/shelter.model";

export interface RawShelterAddress {
  region: string;
  city?: string;
  roadAddress?: string;
  lat?: number;
  lng?: number;
}

export interface RawFacilityPhoto {
  objectKey: string;
  kind: FacilityPhotoKind;
  caption?: string;
}

/** `GET /shelters/:slug` response. */
export interface RawShelter {
  id: string;
  name: string;
  slug: string;
  status: ShelterStatus;
  trustTier: TrustTier | null;
  addressVisibility: AddressVisibility;
  address: RawShelterAddress;
  facilityPhotos: RawFacilityPhoto[];
  intro: string | null;
  operatingSince: string | null;
  representativeName: string | null;
  visitGuide: string | null;
  supportGuide: string | null;
  coverImageKey: string | null;
}

/** `GET /shelters` list item — only VERIFIED shelters are returned. */
export interface RawShelterListItem {
  id: string;
  name: string;
  slug: string;
  region: string;
  status: ShelterStatus;
  trustTier: TrustTier | null;
  coverImageKey: string | null;
}

/** `GET /shelters/map` item — a lightweight marker for the shelter map. */
export interface RawShelterMarker {
  id: string;
  name: string;
  slug: string;
  region: string;
  lat?: number;
  lng?: number;
}

/** Cursor page envelope for the shelter directory. */
export interface ShelterListPage {
  items: RawShelterListItem[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface ShelterSearchParams {
  region?: string;
  cursor?: string;
  limit?: number;
}

/** `GET /shelters/:shelterId/announcements` item. */
export interface RawShelterAnnouncement {
  id: string;
  title: string;
  body: string;
  pinned: boolean;
  createdAt: string | null;
}

/** `GET /shelters/:shelterId/faqs` item. */
export interface RawShelterFaq {
  id: string;
  question: string;
  answer: string;
}

/** `GET /shelters/:shelterId/stats` response. */
export interface RawShelterStats {
  adoptedCount: number;
  shelteredCount: number;
  availableCount: number;
}
