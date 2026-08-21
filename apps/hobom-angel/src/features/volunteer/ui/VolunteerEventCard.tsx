// Claude Design의 흰색 일정 카드에 봉사 상태·일시·모집률을 구성하는 컴포넌트
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

export const VolunteerEventCard = ({ event, controls }: VolunteerEventCardProps) => {
  const overlay = useOverlay();
  const remaining = spotsLeft(event);
  const progress =
    event.capacity > 0 ? Math.round((event.signedUpCount / event.capacity) * 100) : 0;
  const openDetail = () =>
    overlay.open(({ close }) => (
      <VolunteerEventDialog event={event} controls={controls} onClose={close} />
    ));

  return (
    <article {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.chips)}>
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
        <Hb.Chip
          label={VOLUNTEER_TYPE_LABEL[event.type]}
          size="small"
          variant="soft"
          color={event.type === "OVERSEAS" ? "primary" : "default"}
        />
      </div>

      <h3 {...stylex.props(styles.title)}>{event.title}</h3>
      <span {...stylex.props(styles.metaRow)}>
        <Schedule fontSize="small" />
        {formatEventPeriod(event.startAt, event.endAt)}
      </span>

      {event.shelter && (
        <Link to={shelterPath(event.shelter.slug)} {...stylex.props(styles.shelterLink)}>
          <LocationOnOutlined fontSize="small" />
          {event.shelter.name} · {event.shelter.region}
        </Link>
      )}

      {event.description && (
        <button type="button" {...stylex.props(styles.description)} onClick={openDetail}>
          {event.description}
        </button>
      )}

      <div {...stylex.props(styles.progressBlock)}>
        <div {...stylex.props(styles.captionRow)}>
          <span>모집 인원</span>
          <strong>
            {event.signedUpCount} / {event.capacity}명
          </strong>
        </div>
        <Hb.Progress.Linear variant="determinate" value={progress} />
        {isSignUpOpen(event) && remaining <= 3 && (
          <span {...stylex.props(styles.urgent)}>남은 자리 {remaining}</span>
        )}
      </div>

      <SignUpButton event={event} controls={controls} fullWidth />
    </article>
  );
};
