import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type {
  CreatedId,
  RawShelter,
  RawShelterAnnouncement,
  RawShelterFaq,
  RawShelterMarker,
  RawShelterStats,
  ShelterListPage,
} from "./shelter.type";

/** `GET /shelters/:slug` — validates the wire contract at the boundary. */
export const shelterSchema: Schema<RawShelter> = HoBomSchema.object({
  id: HoBomSchema.string(),
  name: HoBomSchema.string(),
  slug: HoBomSchema.string(),
  status: HoBomSchema.enum(["PENDING_VERIFICATION", "VERIFIED", "REJECTED", "SUSPENDED"]),
  trustTier: HoBomSchema.enum(["A", "B"]).nullable(),
  addressVisibility: HoBomSchema.enum(["FULL", "PARTIAL", "HIDDEN"]),
  address: HoBomSchema.object({
    region: HoBomSchema.string(),
    city: HoBomSchema.string().optional(),
    roadAddress: HoBomSchema.string().optional(),
    lat: HoBomSchema.number().optional(),
    lng: HoBomSchema.number().optional(),
  }),
  facilityPhotos: HoBomSchema.array(
    HoBomSchema.object({
      objectKey: HoBomSchema.string(),
      kind: HoBomSchema.enum(["EXTERIOR", "INTERIOR", "OTHER"]),
      caption: HoBomSchema.string().optional(),
    }),
  ),
  intro: HoBomSchema.string().nullable(),
  operatingSince: HoBomSchema.string().nullable(),
  representativeName: HoBomSchema.string().nullable(),
  visitGuide: HoBomSchema.string().nullable(),
  supportGuide: HoBomSchema.string().nullable(),
  coverImageKey: HoBomSchema.string().nullable(),
});

/** `GET /shelters` — validates the directory page contract at the boundary. */
export const shelterListPageSchema: Schema<ShelterListPage> = HoBomSchema.object({
  items: HoBomSchema.array(
    HoBomSchema.object({
      id: HoBomSchema.string(),
      name: HoBomSchema.string(),
      slug: HoBomSchema.string(),
      region: HoBomSchema.string(),
      status: HoBomSchema.enum(["PENDING_VERIFICATION", "VERIFIED", "REJECTED", "SUSPENDED"]),
      trustTier: HoBomSchema.enum(["A", "B"]).nullable(),
      coverImageKey: HoBomSchema.string().nullable(),
    }),
  ),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});

/** `GET /shelters/map` — plain array of shelter markers. */
export const shelterMarkersSchema: Schema<RawShelterMarker[]> = HoBomSchema.array(
  HoBomSchema.object({
    id: HoBomSchema.string(),
    name: HoBomSchema.string(),
    slug: HoBomSchema.string(),
    region: HoBomSchema.string(),
    lat: HoBomSchema.number().optional(),
    lng: HoBomSchema.number().optional(),
  }),
);

/** `GET /shelters/:shelterId/announcements`. */
export const shelterAnnouncementsSchema: Schema<RawShelterAnnouncement[]> = HoBomSchema.array(
  HoBomSchema.object({
    id: HoBomSchema.string(),
    title: HoBomSchema.string(),
    body: HoBomSchema.string(),
    pinned: HoBomSchema.boolean(),
    createdAt: HoBomSchema.string().nullable(),
  }),
);

/** `GET /shelters/:shelterId/faqs`. */
export const shelterFaqsSchema: Schema<RawShelterFaq[]> = HoBomSchema.array(
  HoBomSchema.object({
    id: HoBomSchema.string(),
    question: HoBomSchema.string(),
    answer: HoBomSchema.string(),
  }),
);

/** `GET /shelters/:shelterId/stats`. */
export const shelterStatsSchema: Schema<RawShelterStats> = HoBomSchema.object({
  adoptedCount: HoBomSchema.number(),
  shelteredCount: HoBomSchema.number(),
  availableCount: HoBomSchema.number(),
});

/** Create responses returning just an id (announcement/faq). */
export const createdIdSchema: Schema<CreatedId> = HoBomSchema.object({
  id: HoBomSchema.string(),
});
