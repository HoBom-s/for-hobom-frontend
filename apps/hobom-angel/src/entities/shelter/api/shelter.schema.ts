import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type {
  CreatedId,
  RawShelter,
  RawShelterAnnouncement,
  RawShelterDashboard,
  RawShelterFaq,
  RawShelterMarker,
  RawShelterStats,
  RawStaffMember,
  ShelterListPage,
  StaffPromotionResult,
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
    order: HoBomSchema.number(),
  }),
);

/** `GET /shelters/:shelterId/stats`. */
export const shelterStatsSchema: Schema<RawShelterStats> = HoBomSchema.object({
  adoptedCount: HoBomSchema.number(),
  shelteredCount: HoBomSchema.number(),
  availableCount: HoBomSchema.number(),
});

/** `GET /shelters/:shelterId/dashboard` — the §07 staff KPI payload. */
export const shelterDashboardSchema: Schema<RawShelterDashboard> = HoBomSchema.object({
  adoptedCount: HoBomSchema.number(),
  shelteredCount: HoBomSchema.number(),
  availableCount: HoBomSchema.number(),
  adoptionRate: HoBomSchema.number(),
  thisMonthAdoptions: HoBomSchema.number(),
  lastMonthAdoptions: HoBomSchema.number(),
  monthlyAdoptions: HoBomSchema.array(
    HoBomSchema.object({
      month: HoBomSchema.string(),
      count: HoBomSchema.number(),
    }),
  ),
  pendingApplications: HoBomSchema.number(),
});

/** Create responses returning just an id (announcement/faq). */
/** `GET /shelters/:shelterId/staff` — the roster (bare array). */
export const staffRosterSchema: Schema<RawStaffMember[]> = HoBomSchema.array(
  HoBomSchema.object({
    id: HoBomSchema.string(),
    nickname: HoBomSchema.string(),
    roles: HoBomSchema.array(HoBomSchema.enum(["SHELTER_ADMIN", "SHELTER_STAFF"])),
    status: HoBomSchema.enum(["ACTIVE", "DORMANT", "SUSPENDED", "WITHDRAWN"]),
  }),
);

/** `POST /shelters/:shelterId/staff-promotions` — the opened approval id. */
export const staffPromotionSchema: Schema<StaffPromotionResult> = HoBomSchema.object({
  approvalId: HoBomSchema.string(),
});

export const createdIdSchema: Schema<CreatedId> = HoBomSchema.object({
  id: HoBomSchema.string(),
});
