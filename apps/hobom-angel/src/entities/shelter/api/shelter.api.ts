import { httpClient, parseResponse } from "@/shared/api";
import { toShelter, toShelterAnnouncement, toShelterFaq } from "../lib/to-shelter.lib";
import {
  shelterAnnouncementsSchema,
  shelterFaqsSchema,
  shelterSchema,
  shelterStatsSchema,
} from "./shelter.schema";
import type {
  Shelter,
  ShelterAnnouncement,
  ShelterFaq,
  ShelterStats,
} from "../model/shelter.model";

const parseShelter = parseResponse(shelterSchema, "GET /shelters/:slug");
const parseAnnouncements = parseResponse(
  shelterAnnouncementsSchema,
  "GET /shelters/:id/announcements",
);
const parseFaqs = parseResponse(shelterFaqsSchema, "GET /shelters/:id/faqs");
const parseStats = parseResponse(shelterStatsSchema, "GET /shelters/:id/stats");

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
