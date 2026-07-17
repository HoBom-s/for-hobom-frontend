import { httpClient, parseResponse } from "@/shared/api";
import { toVolunteerEvent } from "../lib/to-volunteer-event.lib";
import {
  volunteerEventPageSchema,
  volunteerEventSchema,
  volunteerEventsSchema,
  volunteerSignupSchema,
} from "./volunteer-event.schema";
import type { VolunteerEvent } from "../model/volunteer-event.model";

const parseVolunteerEvents = parseResponse(
  volunteerEventsSchema,
  "GET /shelters/:id/volunteer-events",
);

/** Fetch a shelter's volunteer events (§04 봉사 tab). */
export const getShelterVolunteerEvents = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<VolunteerEvent[]> =>
  httpClient
    .get(`/shelters/${shelterId}/volunteer-events`, { signal })
    .then(parseVolunteerEvents)
    .then((items) => items.map(toVolunteerEvent));

/** Fetch upcoming volunteer events across all shelters (§05 봉사활동). */
export const getUpcomingVolunteerEvents = (
  limit = 30,
  signal?: AbortSignal,
): Promise<VolunteerEvent[]> =>
  httpClient
    .get(`/volunteer-events?limit=${limit}`, { signal })
    .then(parseResponse(volunteerEventsSchema, "GET /volunteer-events"))
    .then((items) => items.map(toVolunteerEvent));

/** Fetch the viewer's signed-up events (first page) — used to tag a review with
 *  the volunteer activity it's about. */
export const getMyVolunteerSignups = (signal?: AbortSignal): Promise<VolunteerEvent[]> =>
  httpClient
    .get(`/volunteer-signups?limit=50`, { signal })
    .then(parseResponse(volunteerEventPageSchema, "GET /volunteer-signups"))
    .then((page) => page.items.map(toVolunteerEvent));

/** Fetch a single volunteer event by id (§05 봉사활동 detail). */
export const getVolunteerEvent = (id: string, signal?: AbortSignal): Promise<VolunteerEvent> =>
  httpClient
    .get(`/volunteer-events/${id}`, { signal })
    .then(parseResponse(volunteerEventSchema, "GET /volunteer-events/:id"))
    .then(toVolunteerEvent);

/** Sign the current user up for a volunteer event (requires auth, no body). */
export const signUpForVolunteerEvent = (id: string): Promise<{ signupId: string }> =>
  httpClient
    .post(`/volunteer-events/${id}/signups`, {})
    .then(parseResponse(volunteerSignupSchema, "POST /volunteer-events/:id/signups"));

/** Withdraw a signup (by its id, from the signup response). */
export const withdrawVolunteerSignup = (signupId: string): Promise<void> =>
  httpClient.post(`/volunteer-signups/${signupId}/withdrawal`, {}).then(() => undefined);
