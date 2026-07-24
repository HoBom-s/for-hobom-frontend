import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { useReportQueue } from "../model/useReportQueue";
import { maskReporter, reportHeadline } from "../lib/report-format.lib";
import { styles } from "./OperatorApprovals.styles";

/** §09 신고 처리 — the pending report queue with dismiss / uphold actions. */
export const ReportQueue = () => {
  const { reports, resolve, resolving } = useReportQueue();

  if (reports.length === 0) {
    return <p {...stylex.props(styles.empty)}>대기 중인 신고가 없어요.</p>;
  }

  return (
    <div {...stylex.props(styles.list)}>
      {reports.map((report) => (
        <article key={report.id} {...stylex.props(styles.card)}>
          <div {...stylex.props(styles.cardHead)}>
            <span {...stylex.props(styles.headline)}>{reportHeadline(report)}</span>
            <span {...stylex.props(styles.spacer)} />
            <span {...stylex.props(styles.actions)}>
              <Hb.Button
                variant="secondary"
                size="small"
                onClick={() => resolve(report.id, { resolution: "DISMISSED" })}
                disabled={resolving}
              >
                기각
              </Hb.Button>
              <Hb.Button
                variant="danger"
                size="small"
                onClick={() => resolve(report.id, { resolution: "UPHELD" })}
                disabled={resolving}
              >
                조치
              </Hb.Button>
            </span>
          </div>
          <p {...stylex.props(styles.detail)}>{report.detail}</p>
          <div {...stylex.props(styles.meta)}>
            <span>{maskReporter(report.reporterId)}</span>
            <span>대상 {report.targetRef}</span>
          </div>
        </article>
      ))}
    </div>
  );
};
