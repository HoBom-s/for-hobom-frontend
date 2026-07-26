import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LocationOnOutlined } from "hobom-design-system/icons";
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
    <Hb.SectionCard
      title={event.title}
      action={
        <Hb.Stack direction="row" spacing={0.5}>
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
        </Hb.Stack>
      }
    >
      <Hb.Stack spacing={1}>
        <div {...stylex.props(styles.metaRow)}>
          <Hb.Chip
            label={VOLUNTEER_TYPE_LABEL[event.type]}
            size="small"
            variant="soft"
            color={event.type === "OVERSEAS" ? "primary" : "default"}
          />
          {event.shelter && (
            <Link to={shelterPath(event.shelter.slug)} {...stylex.props(styles.shelterLink)}>
              <LocationOnOutlined fontSize="small" />
              <Hb.Text variant="caption" color="text.secondary">
                {event.shelter.name} · {event.shelter.region}
              </Hb.Text>
            </Link>
          )}
        </div>

        <Hb.Text variant="body2" color="text.secondary">
          {formatEventPeriod(event.startAt, event.endAt)}
        </Hb.Text>

        {event.description && (
          <>
            <Hb.Text variant="body2" color="text.secondary" {...stylex.props(styles.clamp)}>
              {event.description}
            </Hb.Text>
            <button type="button" {...stylex.props(styles.more)} onClick={openDetail}>
              자세히 ›
            </button>
          </>
        )}

        <Hb.Progress.Linear variant="determinate" value={progress} />
        <div {...stylex.props(styles.captionRow)}>
          <Hb.Text variant="caption" color="text.secondary">
            모집 {event.signedUpCount}/{event.capacity}명 · 남은 자리 {remaining}
          </Hb.Text>
          {isSignUpOpen(event) && remaining <= 3 && (
            <Hb.Chip label="마감 임박" size="small" variant="soft" color="warning" />
          )}
        </div>

        <SignUpButton event={event} controls={controls} fullWidth />
      </Hb.Stack>
    </Hb.SectionCard>
  );
};
