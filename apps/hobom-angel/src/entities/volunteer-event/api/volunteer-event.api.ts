import { httpClient, parseResponse } from "@/shared/api";
import { toVolunteerEvent } from "../lib/to-volunteer-event.lib";
import { volunteerEventsSchema } from "./volunteer-event.schema";
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
