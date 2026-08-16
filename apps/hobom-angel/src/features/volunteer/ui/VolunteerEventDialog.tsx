import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LocationOnOutlined } from "hobom-design-system/icons";
import {
  VOLUNTEER_SIGNUP_STATUS_LABEL,
  VOLUNTEER_STATUS_LABEL,
  VOLUNTEER_TYPE_LABEL,
  spotsLeft,
} from "@/entities/volunteer-event";
import { shelterPath } from "@/shared/config";
import { SignUpButton } from "./SignUpButton";
import { styles } from "./VolunteerEventDialog.styles";
import { formatEventPeriod } from "../lib/format-event-time.lib";
import type { EnrichedVolunteerEvent } from "../lib/enrich-events.lib";
import type { VolunteerSignupControls } from "../model/useVolunteerSignup";

const STATUS_COLOR = { OPEN: "primary", CLOSED: "default", CANCELLED: "error" } as const;

const formatFlightAt = (flightAt: string): string =>
  new Date(flightAt).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });

interface VolunteerEventDialogProps {
  event: EnrichedVolunteerEvent;
  controls: VolunteerSignupControls;
  onClose: () => void;
}

/** Full detail for a volunteer event, including OVERSEAS transport info. Mounted
 *  by the overlay while open; `onClose` unmounts it (§05). */
export const VolunteerEventDialog = ({ event, controls, onClose }: VolunteerEventDialogProps) => {
  const progress = event.capacity > 0 ? Math.round((event.signedUpCount / event.capacity) * 100) : 0;

  return (
    <Hb.Dialog.Root open onClose={onClose} size="sm">
      <Hb.Dialog.Title>{event.title}</Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <Hb.Stack spacing={2}>
          <div {...stylex.props(styles.chips)}>
            <Hb.Chip
              label={VOLUNTEER_TYPE_LABEL[event.type]}
              size="small"
              variant="soft"
              color={event.type === "OVERSEAS" ? "primary" : "default"}
            />
            <Hb.Chip
              label={VOLUNTEER_STATUS_LABEL[event.status]}
              size="small"
              variant="soft"
              color={STATUS_COLOR[event.status]}
            />
            {event.mySignupStatus && (
              <Hb.Chip
                label={VOLUNTEER_SIGNUP_STATUS_LABEL[event.mySignupStatus]}
                size="small"
                variant="soft"
                color={event.mySignupStatus === "APPROVED" ? "success" : "warning"}
              />
            )}
          </div>

          {event.shelter && (
            <Link to={shelterPath(event.shelter.slug)} {...stylex.props(styles.shelterLink)}>
              <LocationOnOutlined fontSize="small" />
              <Hb.Text variant="body2" color="text.secondary">
                {event.shelter.name} · {event.shelter.region}
              </Hb.Text>
            </Link>
          )}

          <Hb.Text variant="body2" color="text.secondary">
            {formatEventPeriod(event.startAt, event.endAt)}
          </Hb.Text>

          <Hb.Text variant="body2" style={{ whiteSpace: "pre-line" }}>
            {event.description}
          </Hb.Text>

          <Hb.Stack spacing={1}>
            <Hb.Progress.Linear variant="determinate" value={progress} />
            <Hb.Text variant="caption" color="text.secondary">
              모집 {event.signedUpCount}/{event.capacity}명 · 남은 자리 {spotsLeft(event)}
            </Hb.Text>
          </Hb.Stack>

          {event.type === "OVERSEAS" && event.transport && (
            <div {...stylex.props(styles.transport)}>
              <span {...stylex.props(styles.transportTitle)}>이동봉사 정보</span>
              <Hb.Text variant="body2" color="text.secondary">
                {event.transport.departure} → {event.transport.arrival}
              </Hb.Text>
              <Hb.Text variant="body2" color="text.secondary">
                {formatFlightAt(event.transport.flightAt)}
              </Hb.Text>
              <Hb.Text variant="body2" color="text.secondary">
                동반 동물 {event.transport.animalCount}마리
              </Hb.Text>
              {event.transport.qualification && (
                <Hb.Text variant="body2" color="text.secondary">
                  자격: {event.transport.qualification}
                </Hb.Text>
              )}
            </div>
          )}
        </Hb.Stack>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button variant="ghost" onClick={onClose}>
          닫기
        </Hb.Button>
        <SignUpButton event={event} controls={controls} onAfter={onClose} />
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
