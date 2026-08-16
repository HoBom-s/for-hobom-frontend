import { Suspense, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { KIND_LABEL, STATUS_LABEL } from "@/entities/application";
import type { ApplicationKind, ApplicationStatus } from "@/entities/application";
import { LoadingState } from "@/shared/ui";
import { ApplicationQueue } from "./ApplicationQueue";
import { ApplicationDetailPanel } from "./ApplicationDetailPanel";
import { styles } from "./ConsoleApplications.styles";

const KINDS: ApplicationKind[] = ["ADOPTION", "FOSTER"];
const BASE_STATUSES: ApplicationStatus[] = ["PENDING", "APPROVED", "REJECTED", "WITHDRAWN"];

/** §7.2 신청 처리 — the shelter's adoption / foster review queue. Pick a kind and
 *  status on the left, read the submitted answers on the right. */
export const ConsoleApplications = ({ shelterId }: { shelterId: string }) => {
  const [kind, setKind] = useState<ApplicationKind>("ADOPTION");
  const [status, setStatus] = useState<ApplicationStatus | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // RETURNED only exists in the adoption lifecycle.
  const statuses = kind === "ADOPTION" ? [...BASE_STATUSES, "RETURNED" as const] : BASE_STATUSES;
  const filters: (ApplicationStatus | undefined)[] = [undefined, ...statuses];

  const changeKind = (next: ApplicationKind) => {
    setKind(next);
    setStatus(undefined);
    setSelectedId(null);
  };
  const changeStatus = (next: ApplicationStatus | undefined) => {
    setStatus(next);
    setSelectedId(null);
  };

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>
          <span {...stylex.props(styles.kickerRule)} aria-hidden />
          신청 관리
        </span>
        <h1 {...stylex.props(styles.title)}>신청 처리</h1>
        <p {...stylex.props(styles.subtitle)}>우리 보호소에 들어온 입양·임시보호 신청을 확인해요</p>
      </div>

      <div {...stylex.props(styles.toolbar)}>
        <Hb.ToggleButtonGroup variant="segmented">
          {KINDS.map((item) => (
            <Hb.ToggleButton
              key={item}
              value={item}
              selected={kind === item}
              size="small"
              variant="segmented"
              onChange={(_, value) => changeKind(value as ApplicationKind)}
            >
              {KIND_LABEL[item]}
            </Hb.ToggleButton>
          ))}
        </Hb.ToggleButtonGroup>

        <div {...stylex.props(styles.filters)}>
          {filters.map((item) => (
            <button
              key={item ?? "ALL"}
              type="button"
              {...stylex.props(styles.filterChip, status === item && styles.filterChipActive)}
              onClick={() => changeStatus(item)}
            >
              {item ? STATUS_LABEL[item] : "전체"}
            </button>
          ))}
        </div>
      </div>

      <div {...stylex.props(styles.layout)}>
        <div {...stylex.props(styles.col)}>
          <Suspense key={`${kind}-${status ?? "ALL"}`} fallback={<LoadingState />}>
            <ApplicationQueue
              shelterId={shelterId}
              kind={kind}
              status={status}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </Suspense>
        </div>

        <div {...stylex.props(styles.col)}>
          {selectedId ? (
            <Suspense key={`${kind}-${selectedId}`} fallback={<LoadingState />}>
              <ApplicationDetailPanel shelterId={shelterId} kind={kind} id={selectedId} />
            </Suspense>
          ) : (
            <div {...stylex.props(styles.hint)}>
              <span {...stylex.props(styles.kicker)}>신청 상세</span>
              <p {...stylex.props(styles.hintText)}>
                왼쪽에서 신청을 선택하면 제출한 답변을 볼 수 있어요.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
