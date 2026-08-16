import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LocationOnOutlined, Schedule } from "hobom-design-system/icons";
import {
  VOLUNTEER_SIGNUP_STATUS_LABEL,
  VOLUNTEER_STATUS_LABEL,
  VOLUNTEER_TYPE_LABEL,
  isSignUpOpen,
  spotsLeft,
} from "@/entities/volunteer-event";
import { shelterPath } from "@/shared/config";
import { useOverlay } from "@/shared/model";
import { SignUpButton } from "./SignUpButton";
import { VolunteerEventDialog } from "./VolunteerEventDialog";
import { styles } from "./VolunteerEventCard.styles";
import { formatEventPeriod } from "../lib/format-event-time.lib";
import type { EnrichedVolunteerEvent } from "../lib/enrich-events.lib";
import type { VolunteerSignupControls } from "../model/useVolunteerSignup";

const STATUS_COLOR = { OPEN: "primary", CLOSED: "default", CANCELLED: "error" } as const;

interface VolunteerEventCardProps {
  event: EnrichedVolunteerEvent;
  controls: VolunteerSignupControls;
}

/** One volunteer event: schedule, shelter, scarcity, and a sign-up CTA. Opens
 *  the full detail in an overlay (§05). */
export const VolunteerEventCard = ({ event, controls }: VolunteerEventCardProps) => {
  const overlay = useOverlay();
  const remaining = spotsLeft(event);
  const progress = event.capacity > 0 ? Math.round((event.signedUpCount / event.capacity) * 100) : 0;

  const openDetail = () =>
    overlay.open(({ close }) => (
      <VolunteerEventDialog event={event} controls={controls} onClose={close} />
    ));

  return (
    <div {...stylex.props(styles.card)}>
      {/* Branded green→warm tint header carries the WHITE title on a scrim. */}
      <div {...stylex.props(styles.media)}>
        <span {...stylex.props(styles.mediaScrim)} aria-hidden />
        <div {...stylex.props(styles.mediaChips)}>
          {event.mySignupStatus && (
            <Hb.Chip
              label={VOLUNTEER_SIGNUP_STATUS_LABEL[event.mySignupStatus]}
              size="small"
              variant="soft"
              color={event.mySignupStatus === "APPROVED" ? "success" : "warning"}
            />
          )}
          <Hb.Chip
            label={VOLUNTEER_STATUS_LABEL[event.status]}
            size="small"
            variant="soft"
            color={STATUS_COLOR[event.status]}
          />
        </div>

        <div {...stylex.props(styles.titleWrap)}>
          <span {...stylex.props(styles.typeChip)}>
            <Hb.Chip
              label={VOLUNTEER_TYPE_LABEL[event.type]}
              size="small"
              variant="soft"
              color={event.type === "OVERSEAS" ? "primary" : "default"}
            />
          </span>
          <h3 {...stylex.props(styles.title)}>{event.title}</h3>
        </div>
      </div>

      <div {...stylex.props(styles.body)}>
        {event.shelter && (
          <Link to={shelterPath(event.shelter.slug)} {...stylex.props(styles.shelterLink)}>
            <LocationOnOutlined fontSize="small" />
            <Hb.Text variant="caption" color="text.secondary">
              {event.shelter.name} · {event.shelter.region}
            </Hb.Text>
          </Link>
        )}

        <span {...stylex.props(styles.metaRow)}>
          <Schedule fontSize="small" />
          {formatEventPeriod(event.startAt, event.endAt)}
        </span>

        {event.description && (
          <>
            <p {...stylex.props(styles.clamp)}>{event.description}</p>
            <button type="button" {...stylex.props(styles.more)} onClick={openDetail}>
              자세히 ›
            </button>
          </>
        )}

        <Hb.Progress.Linear variant="determinate" value={progress} />
        <div {...stylex.props(styles.captionRow)}>
          <span {...stylex.props(styles.caption)}>
            모집 {event.signedUpCount}/{event.capacity}명 · 남은 자리 {remaining}
          </span>
          {isSignUpOpen(event) && remaining <= 3 && (
            <Hb.Chip label="마감 임박" size="small" variant="soft" color="error" />
          )}
        </div>

        <SignUpButton event={event} controls={controls} fullWidth />
      </div>
    </div>
  );
};
