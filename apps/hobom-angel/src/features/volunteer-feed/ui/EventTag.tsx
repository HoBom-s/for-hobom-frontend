import { useQuery } from "hobom-data";
import { Hb } from "hobom-design-system";
import { volunteerEventQueries } from "@/entities/volunteer-event";

/** The volunteer activity a review is about — hydrated from the event id
 *  (cached per event), hidden until it loads. */
export const EventTag = ({ eventId }: { eventId: string }) => {
  const { data } = useQuery(volunteerEventQueries.detail(eventId));

  if (!data) return null;

  return <Hb.Chip label={`🐾 ${data.title}`} size="small" variant="soft" color="primary" />;
};
