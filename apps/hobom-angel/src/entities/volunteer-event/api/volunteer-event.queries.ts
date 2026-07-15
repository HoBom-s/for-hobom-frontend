import { queryOptions } from "hobom-data";
import { getShelterVolunteerEvents } from "./volunteer-event.api";

export const volunteerEventQueries = {
  all: () => ["volunteer-events"] as const,

  byShelter: (shelterId: string) =>
    queryOptions({
      queryKey: [...volunteerEventQueries.all(), shelterId] as const,
      queryFn: ({ signal }) => getShelterVolunteerEvents(shelterId, signal),
    }),
} as const;
