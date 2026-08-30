import * as stylex from "@stylexjs/stylex";
import { VolunteerEventCard } from "./VolunteerEventCard";
import { styles } from "./VolunteerFeed.styles";
import type { EnrichedVolunteerEvent } from "../lib/enrich-events.lib";
import type { VolunteerSignupControls } from "../model/useVolunteerSignup";

interface VolunteerFeedProps {
  events: EnrichedVolunteerEvent[];
  controls: VolunteerSignupControls;
}

/** A stack of volunteer event cards — reused for a day's events and the upcoming
 *  feed (§05). */
export const VolunteerFeed = ({ events, controls }: VolunteerFeedProps) => (
  <div {...stylex.props(styles.grid)}>
    {events.map((event) => (
      <VolunteerEventCard key={event.id} event={event} controls={controls} />
    ))}
  </div>
);
