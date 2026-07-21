import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { STATUS_COLOR, STATUS_LABEL } from "@/entities/application";
import type { ApplicationKind, ApplicationStatus } from "@/entities/application";
import { maskApplicant } from "../lib/application-format.lib";
import { useAnimalNames } from "../model/useAnimalNames";
import { useApplicationQueue } from "../model/useApplicationQueue";
import { styles } from "./ConsoleApplications.styles";

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("ko-KR", { month: "long", day: "numeric" });

interface ApplicationQueueProps {
  shelterId: string;
  kind: ApplicationKind;
  status: ApplicationStatus | undefined;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/** The filtered application list; a row opens the detail on the right. */
export const ApplicationQueue = ({
  shelterId,
  kind,
  status,
  selectedId,
  onSelect,
}: ApplicationQueueProps) => {
  const animalName = useAnimalNames(shelterId);
  const { applications, fetchNextPage, hasNextPage, isFetchingNextPage } = useApplicationQueue(
    shelterId,
    kind,
    status,
  );

  if (applications.length === 0) {
    return <p {...stylex.props(styles.empty)}>조건에 맞는 신청이 없어요.</p>;
  }

  return (
    <>
      <div {...stylex.props(styles.list)}>
        {applications.map((application) => (
          <button
            key={application.id}
            type="button"
            {...stylex.props(styles.row, application.id === selectedId && styles.rowActive)}
            onClick={() => onSelect(application.id)}
          >
            <span {...stylex.props(styles.rowMain)}>
              <span {...stylex.props(styles.rowTitle)}>{animalName(application.animalId)}</span>
              <span {...stylex.props(styles.rowMeta)}>
                {maskApplicant(application.applicantId)}
                {application.createdAt ? ` · ${formatDate(application.createdAt)}` : ""}
              </span>
            </span>
            <Hb.Chip
              label={STATUS_LABEL[application.status]}
              color={STATUS_COLOR[application.status]}
              variant="soft"
              size="small"
            />
          </button>
        ))}
      </div>

      {hasNextPage && (
        <div {...stylex.props(styles.more)}>
          <Hb.Button
            variant="secondary"
            size="small"
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
          >
            더 보기
          </Hb.Button>
        </div>
      )}
    </>
  );
};
