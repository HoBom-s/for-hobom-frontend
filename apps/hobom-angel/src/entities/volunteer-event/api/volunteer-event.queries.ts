import { queryOptions } from "hobom-data";
import {
  getShelterVolunteerEvents,
  getUpcomingVolunteerEvents,
  getVolunteerEvent,
} from "./volunteer-event.api";

export const volunteerEventQueries = {
  all: () => ["volunteer-events"] as const,

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
} as const;
