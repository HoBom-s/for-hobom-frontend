import { Hb } from "hobom-design-system";
import { VOLUNTEER_STATUS_LABEL, isSignUpOpen, spotsLeft } from "@/entities/volunteer-event";
import type { VolunteerEvent } from "@/entities/volunteer-event";
import { formatEventPeriod } from "../lib/format-event-time.lib";

const STATUS_COLOR = { OPEN: "primary", CLOSED: "default", CANCELLED: "error" } as const;

interface VolunteerEventCardProps {
  event: VolunteerEvent;
  onSignUp: (eventId: string) => void;
  pending: boolean;
}

/** One volunteer event with its schedule, capacity, and a sign-up CTA (§05). */
export const VolunteerEventCard = ({ event, onSignUp, pending }: VolunteerEventCardProps) => {
  const open = isSignUpOpen(event);

  return (
    <Hb.SectionCard
      title={event.title}
      action={
        <Hb.Chip
          label={VOLUNTEER_STATUS_LABEL[event.status]}
          size="small"
          variant="soft"
          color={STATUS_COLOR[event.status]}
        />
      }
    >
      <Hb.Text variant="body2" color="text.secondary">
        {formatEventPeriod(event.startAt, event.endAt)}
      </Hb.Text>
      {event.description && (
        <Hb.Text variant="body2" color="text.secondary" style={{ whiteSpace: "pre-line" }}>
          {event.description}
        </Hb.Text>
      )}
      <Hb.Text variant="caption" color="text.secondary">
        모집 {event.signedUpCount}/{event.capacity}명 · 남은 자리 {spotsLeft(event)}
      </Hb.Text>
      <Hb.Button
        variant="primary"
        fullWidth
        disabled={!open}
        loading={pending}
        onClick={() => onSignUp(event.id)}
      >
        {open ? "봉사 신청하기" : VOLUNTEER_STATUS_LABEL[event.status]}
      </Hb.Button>
    </Hb.SectionCard>
  );
};
