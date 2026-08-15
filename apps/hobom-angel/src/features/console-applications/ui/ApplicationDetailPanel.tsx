import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { STATUS_COLOR, STATUS_LABEL } from "@/entities/application";
import type { ApplicationKind } from "@/entities/application";
import { useOverlay } from "@/shared/model";
import { maskApplicant } from "../lib/application-format.lib";
import { useAnimalNames } from "../model/useAnimalNames";
import { useApplicationDetail } from "../model/useApplicationDetail";
import { useApplicationDecision } from "../model/useApplicationDecision";
import { ApplicationRejectDialog } from "./ApplicationRejectDialog";
import { styles } from "./ConsoleApplications.styles";

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

interface ApplicationDetailPanelProps {
  shelterId: string;
  kind: ApplicationKind;
  id: string;
}

/** The submitted application: applicant, status, and the answers with prompts. */
export const ApplicationDetailPanel = ({ shelterId, kind, id }: ApplicationDetailPanelProps) => {
  const animalName = useAnimalNames(shelterId);
  const { detail, rows } = useApplicationDetail(shelterId, kind, id);
  const { approve, reject, deciding } = useApplicationDecision(kind, id);
  const overlay = useOverlay();

  const promptReject = () =>
    overlay.open(({ close }) => (
      <ApplicationRejectDialog onConfirm={reject} onClose={close} />
    ));

  return (
    <div {...stylex.props(styles.detail)}>
      <div {...stylex.props(styles.detailHead)}>
        <h2 {...stylex.props(styles.detailTitle)}>{animalName(detail.animalId)}</h2>
        <Hb.Chip
          label={STATUS_LABEL[detail.status]}
          color={STATUS_COLOR[detail.status]}
          variant="soft"
          size="small"
        />
      </div>

      <div {...stylex.props(styles.detailMeta)}>
        <span>{maskApplicant(detail.applicantId)}</span>
        {detail.createdAt && <span>신청일 {formatDate(detail.createdAt)}</span>}
        {detail.plannedEndDate && <span>종료 예정 {formatDate(detail.plannedEndDate)}</span>}
        <span>설문 v{detail.questionnaireVersion}</span>
      </div>

      {detail.status === "REJECTED" && detail.decidedReason && (
        <div {...stylex.props(styles.rejectReason)}>
          <span {...stylex.props(styles.answerPrompt)}>반려 사유</span>
          <span {...stylex.props(styles.answerText)}>{detail.decidedReason}</span>
        </div>
      )}

      <p {...stylex.props(styles.sectionLabel)}>제출한 답변</p>
      {rows.length === 0 ? (
        <span {...stylex.props(styles.answerText)}>제출한 답변이 없어요.</span>
      ) : (
        <div {...stylex.props(styles.answers)}>
          {rows.map((row) => (
            <div key={row.questionId} {...stylex.props(styles.answer)}>
              <span {...stylex.props(styles.answerPrompt)}>{row.prompt}</span>
              <span {...stylex.props(styles.answerText)}>{row.text}</span>
            </div>
          ))}
        </div>
      )}

      {detail.status === "PENDING" && (
        <div {...stylex.props(styles.decisionBar)}>
          <Hb.Button variant="primary" fullWidth disabled={deciding} onClick={approve}>
            승인하기
          </Hb.Button>
          <Hb.Button variant="danger" fullWidth disabled={deciding} onClick={promptReject}>
            반려하기
          </Hb.Button>
        </div>
      )}
    </div>
  );
};
