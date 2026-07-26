import { queryOptions } from "hobom-data";
import {
  getMyVolunteerSignups,
  getShelterVolunteerEvents,
  getUpcomingVolunteerEvents,
  getVolunteerApplicants,
  getVolunteerEvent,
} from "./volunteer-event.api";

export const volunteerEventQueries = {
  all: () => ["volunteer-events"] as const,

  mySignups: () =>
    queryOptions({
      queryKey: [...volunteerEventQueries.all(), "my-signups"] as const,
      queryFn: ({ signal }) => getMyVolunteerSignups(signal),
    }),

  byShelter: (shelterId: string) =>
    queryOptions({
      queryKey: [...volunteerEventQueries.all(), shelterId] as const,
      queryFn: ({ signal }) => getShelterVolunteerEvents(shelterId, signal),
    }),

  upcoming: (limit = 30) =>
    queryOptions({
      queryKey: [...volunteerEventQueries.all(), "upcoming", limit] as const,
      queryFn: ({ signal }) => getUpcomingVolunteerEvents(limit, signal),
    }),

  detail: (id: string) =>
    queryOptions({
      queryKey: [...volunteerEventQueries.all(), "detail", id] as const,
      queryFn: ({ signal }) => getVolunteerEvent(id, signal),
    }),

  applicants: (eventId: string) =>
    queryOptions({
      queryKey: [...volunteerEventQueries.all(), "applicants", eventId] as const,
      queryFn: ({ signal }) => getVolunteerApplicants(eventId, signal),
    }),
} as const;
