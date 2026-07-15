import { useSuspenseQuery } from "hobom-data";
import { EmptyState, Hb } from "hobom-design-system";
import { CalendarTodayOutlined } from "hobom-design-system/icons";
import { VOLUNTEER_STATUS_LABEL, volunteerEventQueries } from "@/entities/volunteer-event";
import type { VolunteerEventStatus } from "@/entities/volunteer-event";

type ChipColor = "primary" | "default" | "error";

const STATUS_COLOR: Record<VolunteerEventStatus, ChipColor> = {
  OPEN: "primary",
  CLOSED: "default",
  CANCELLED: "error",
};

const formatDateTime = (iso: string): string =>
  new Date(iso).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });

const formatEventPeriod = (startAt: string, endAt: string): string =>
  `${formatDateTime(startAt)} – ${formatDateTime(endAt)}`;

/** 봉사 tab — a shelter's volunteer events, each as a SectionCard. */
export const VolunteerTab = ({ shelterId }: { shelterId: string }) => {
  const { data } = useSuspenseQuery(volunteerEventQueries.byShelter(shelterId));

  if (data.length === 0) {
    return (
      <EmptyState
        icon={
          <CalendarTodayOutlined style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />
        }
        message="예정된 봉사 일정이 없어요."
      />
    );
  }

  return (
    <Hb.Stack spacing={2}>
      {data.map((event) => (
        <Hb.SectionCard
          key={event.id}
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
          <Hb.Text variant="body2" color="text.secondary" style={{ whiteSpace: "pre-line" }}>
            {event.description}
          </Hb.Text>
          <Hb.Text variant="caption" color="text.secondary">
            모집 {event.signedUpCount}/{event.capacity}명
          </Hb.Text>
        </Hb.SectionCard>
      ))}
    </Hb.Stack>
  );
};
