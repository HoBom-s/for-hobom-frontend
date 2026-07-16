import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { toShelter, toShelterAnnouncement, toShelterFaq } from "../lib/to-shelter.lib";
import { toShelterListItem } from "../lib/to-shelter-list-item.lib";
import { toShelterMarker } from "../lib/to-shelter-marker.lib";
import {
  shelterAnnouncementsSchema,
  shelterFaqsSchema,
  shelterListPageSchema,
  shelterMarkersSchema,
  shelterSchema,
  shelterStatsSchema,
} from "./shelter.schema";
import type {
  Shelter,
  ShelterAnnouncement,
  ShelterFaq,
  ShelterListItem,
  ShelterMarker,
  ShelterStats,
} from "../model/shelter.model";
import type { ShelterSearchParams } from "./shelter.type";

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

/** Fetch all shelter markers — resolves a shelterId to name/slug/region. */
export const getShelterMarkers = (signal?: AbortSignal): Promise<ShelterMarker[]> =>
  httpClient
    .get("/shelters/map", { signal })
    .then(parseMarkers)
    .then((items) => items.map(toShelterMarker));

/** Fetch a shelter's public microsite profile by slug (§04). */
export const getShelterBySlug = (slug: string, signal?: AbortSignal): Promise<Shelter> =>
  httpClient.get(`/shelters/${slug}`, { signal }).then(parseShelter).then(toShelter);

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

/** Fetch a shelter's FAQ entries. */
export const getShelterFaqs = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<ShelterFaq[]> =>
  httpClient
    .get(`/shelters/${shelterId}/faqs`, { signal })
    .then(parseFaqs)
    .then((items) => items.map(toShelterFaq));

const EMPTY_STATS: ShelterStats = { adoptedCount: 0, shelteredCount: 0, availableCount: 0 };

/** Fetch a shelter's aggregate counts (adopted / sheltered / available).
 *  Normalized so a missing/partial payload degrades to zeros instead of
 *  crashing the microsite (advisory validation can pass raw data through). */
export const getShelterStats = (shelterId: string, signal?: AbortSignal): Promise<ShelterStats> =>
  httpClient
    .get(`/shelters/${shelterId}/stats`, { signal })
    .then(parseStats)
    .then((raw): ShelterStats => ({ ...EMPTY_STATS, ...raw }));
