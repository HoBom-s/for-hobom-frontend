import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { toShelter, toShelterAnnouncement, toShelterFaq } from "../lib/to-shelter.lib";
import { toShelterListItem } from "../lib/to-shelter-list-item.lib";
import { toShelterMarker } from "../lib/to-shelter-marker.lib";
import {
  createdIdSchema,
  registerShelterResultSchema,
  shelterAnnouncementsSchema,
  shelterDashboardSchema,
  shelterFaqsSchema,
  shelterListPageSchema,
  shelterMarkersSchema,
  shelterSchema,
  shelterStatsSchema,
  staffPromotionSchema,
  staffPromotionsSchema,
  staffRosterSchema,
} from "./shelter.schema";
import type {
  Shelter,
  ShelterAnnouncement,
  ShelterDashboard,
  ShelterFaq,
  ShelterListItem,
  ShelterMarker,
  ShelterStaffMember,
  ShelterStats,
  StaffPromotionRequest,
} from "../model/shelter.model";
import type {
  AnnouncementInput,
  ApprovalDecisionInput,
  CreatedId,
  FaqInput,
  RegisterShelterInput,
  RegisterShelterResult,
  ShelterSearchParams,
  StaffPromotionResult,
} from "./shelter.type";

/** A converted page of shelters plus the cursor to the next one. */
export interface ShelterListResult {
  shelters: ShelterListItem[];
  nextCursor: string | null;
  hasNext: boolean;
}

const parsePage = parseResponse(shelterListPageSchema, "GET /shelters");
const parseShelter = parseResponse(shelterSchema, "GET /shelters/:slug");
const parseAnnouncements = parseResponse(
  shelterAnnouncementsSchema,
  "GET /shelters/:id/announcements",
);
const parseFaqs = parseResponse(shelterFaqsSchema, "GET /shelters/:id/faqs");
const parseStats = parseResponse(shelterStatsSchema, "GET /shelters/:id/stats");
const parseDashboard = parseResponse(shelterDashboardSchema, "GET /shelters/:id/dashboard");
const parseStaff = parseResponse(staffRosterSchema, "GET /shelters/:id/staff");
const parsePromotion = parseResponse(staffPromotionSchema, "POST /shelters/:id/staff-promotions");
const parsePromotions = parseResponse(staffPromotionsSchema, "GET /shelters/:id/staff-promotions");
const parseMarkers = parseResponse(shelterMarkersSchema, "GET /shelters/map");

/** Browse verified shelters (region filter + cursor pagination) (§3.5). */
export const searchShelters = (
  params: ShelterSearchParams,
  signal?: AbortSignal,
): Promise<ShelterListResult> =>
  httpClient
    .get(`/shelters${toQueryString(params)}`, { signal })
    .then(parsePage)
    .then((page) => ({
      shelters: page.items.map(toShelterListItem),
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));

/** Fetch shelter markers for the map, optionally narrowed to one region. */
export const getShelterMarkers = (
  region?: string,
  signal?: AbortSignal,
): Promise<ShelterMarker[]> => {
  const query = region ? `?region=${encodeURIComponent(region)}` : "";

  return httpClient
    .get(`/shelters/map${query}`, { signal })
    .then(parseMarkers)
    .then((items) => items.map(toShelterMarker));
};

/** Fetch a shelter's public microsite profile by slug (§04). */
export const getShelterBySlug = (slug: string, signal?: AbortSignal): Promise<Shelter> =>
  httpClient.get(`/shelters/${slug}`, { signal }).then(parseShelter).then(toShelter);

/** Register a shelter — the caller becomes 대표 and a verification opens. */
export const registerShelter = (input: RegisterShelterInput): Promise<RegisterShelterResult> =>
  httpClient
    .post("/shelters", input)
    .then(parseResponse(registerShelterResultSchema, "POST /shelters"));

/** Fetch a shelter's notices/news, pinned first. */
export const getShelterAnnouncements = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<ShelterAnnouncement[]> =>
  httpClient
    .get(`/shelters/${shelterId}/announcements`, { signal })
    .then(parseAnnouncements)
    .then((items) =>
      items
        .map(toShelterAnnouncement)
        .sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    );

/** Post a shelter announcement (§7.4 console, staff). */
export const postAnnouncement = (shelterId: string, input: AnnouncementInput): Promise<CreatedId> =>
  httpClient
    .post(`/shelters/${shelterId}/announcements`, input)
    .then(parseResponse(createdIdSchema, "POST /shelters/:id/announcements"));

/** Edit an announcement (staff). */
export const editAnnouncement = (id: string, input: AnnouncementInput): Promise<void> =>
  httpClient.patch(`/announcements/${id}`, input).then(() => undefined);

/** Delete an announcement (staff). */
export const deleteAnnouncement = (id: string): Promise<void> =>
  httpClient.delete(`/announcements/${id}`).then(() => undefined);

/** Fetch a shelter's FAQ entries. */
export const getShelterFaqs = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<ShelterFaq[]> =>
  httpClient
    .get(`/shelters/${shelterId}/faqs`, { signal })
    .then(parseFaqs)
    .then((items) => items.map(toShelterFaq));

/** Post a shelter FAQ (§7.4 console, staff). */
export const postFaq = (shelterId: string, input: FaqInput): Promise<CreatedId> =>
  httpClient
    .post(`/shelters/${shelterId}/faqs`, input)
    .then(parseResponse(createdIdSchema, "POST /shelters/:id/faqs"));

/** Edit a FAQ (staff). */
export const editFaq = (id: string, input: FaqInput): Promise<void> =>
  httpClient.patch(`/faqs/${id}`, input).then(() => undefined);

/** Delete a FAQ (staff). */
export const deleteFaq = (id: string): Promise<void> =>
  httpClient.delete(`/faqs/${id}`).then(() => undefined);

const EMPTY_STATS: ShelterStats = { adoptedCount: 0, shelteredCount: 0, availableCount: 0 };

/** Fetch a shelter's aggregate counts (adopted / sheltered / available).
 *  Normalized so a missing/partial payload degrades to zeros instead of
 *  crashing the microsite (advisory validation can pass raw data through). */
export const getShelterStats = (shelterId: string, signal?: AbortSignal): Promise<ShelterStats> =>
  httpClient
    .get(`/shelters/${shelterId}/stats`, { signal })
    .then(parseStats)
    .then((raw): ShelterStats => ({ ...EMPTY_STATS, ...raw }));

/** Fetch a shelter's §07 management KPIs (staff-scoped dashboard). */
export const getShelterDashboard = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<ShelterDashboard> =>
  httpClient.get(`/shelters/${shelterId}/dashboard`, { signal }).then(parseDashboard);

/** Fetch a shelter's staff roster (§7.6, 담당자) — members and their roles. */
export const getShelterStaff = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<ShelterStaffMember[]> =>
  httpClient
    .get(`/shelters/${shelterId}/staff`, { signal })
    .then(parseStaff)
    .then((raw): ShelterStaffMember[] => raw);

/** Open a STAFF_PROMOTION approval for a member (the representative decides it). */
export const requestStaffPromotion = (
  shelterId: string,
  candidateUserId: string,
): Promise<StaffPromotionResult> =>
  httpClient
    .post(`/shelters/${shelterId}/staff-promotions`, { candidateUserId })
    .then(parsePromotion);

/** The shelter's pending 승격 요청 queue (§7.6) — candidate + activity. */
export const getStaffPromotions = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<StaffPromotionRequest[]> =>
  httpClient
    .get(`/shelters/${shelterId}/staff-promotions`, { signal })
    .then(parsePromotions)
    .then((raw): StaffPromotionRequest[] => raw);

/** Decide a promotion approval — approve, or reject with a reason. */
export const decideApproval = (
  approvalId: string,
  input: ApprovalDecisionInput,
): Promise<void> =>
  httpClient.post(`/approvals/${approvalId}/decision`, input).then(() => undefined);
