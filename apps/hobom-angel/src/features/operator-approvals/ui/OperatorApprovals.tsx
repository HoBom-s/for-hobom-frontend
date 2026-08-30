import { Suspense, useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { APPROVAL_TYPE_LABEL, approvalQueries } from "@/entities/approval";
import { reportQueries } from "@/entities/report";
import { LoadingState } from "@/shared/ui";
import { PendingApprovalQueue } from "./PendingApprovalQueue";
import { ReportQueue } from "./ReportQueue";
import { styles } from "./OperatorApprovals.styles";

type Tab = "SHELTER_VERIFICATION" | "REPORT";

/** §09 운영자 검증·신고 관리 — the platform operator verifies shelters and
 *  moderates 신고. Staff-promotion / adoption / foster are decided by the owning
 *  shelter's manager (in the shelter console), not here, so they aren't shown. */
export const OperatorApprovals = () => {
  const [tab, setTab] = useState<Tab>("SHELTER_VERIFICATION");
  const { data: counts } = useSuspenseQuery(approvalQueries.counts());
  const { data: reports } = useSuspenseQuery(reportQueries.pending());

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>OPERATOR CONSOLE</span>
        <div {...stylex.props(styles.titleRow)}>
          <span {...stylex.props(styles.rule)} aria-hidden />
          <h1 {...stylex.props(styles.title)}>검증 · 신고 관리</h1>
        </div>
        <p {...stylex.props(styles.subtitle)}>보호소 등록을 검증하고, 접수된 신고를 처리해요.</p>
      </header>

      <Hb.Tabs.Provider value={tab} onChange={(_, value) => setTab(value)}>
        <Hb.Tabs.Root
          style={{
            width: "fit-content",
            gap: 3,
            padding: 4,
            border: "none",
            borderRadius: 999,
            backgroundColor: "var(--hb-color-border)",
          }}
        >
          <Hb.Tabs.Item
            value="SHELTER_VERIFICATION"
            label={`${APPROVAL_TYPE_LABEL.SHELTER_VERIFICATION} ${counts.SHELTER_VERIFICATION}`}
            style={{
              minHeight: 40,
              margin: 0,
              border: "none",
              borderRadius: 999,
              backgroundColor:
                tab === "SHELTER_VERIFICATION" ? "var(--hb-color-surface)" : "transparent",
              color:
                tab === "SHELTER_VERIFICATION"
                  ? "var(--hb-color-text-primary)"
                  : "var(--hb-color-neutral)",
            }}
          />
          <Hb.Tabs.Item
            value="REPORT"
            label={`신고 ${reports.length}`}
            style={{
              minHeight: 40,
              margin: 0,
              border: "none",
              borderRadius: 999,
              backgroundColor: tab === "REPORT" ? "var(--hb-color-surface)" : "transparent",
              color: tab === "REPORT" ? "var(--hb-color-text-primary)" : "var(--hb-color-neutral)",
            }}
          />
        </Hb.Tabs.Root>

        <Hb.Tabs.Panel value="SHELTER_VERIFICATION" {...stylex.props(styles.panel)}>
          {tab === "SHELTER_VERIFICATION" && (
            <Suspense fallback={<LoadingState />}>
              <PendingApprovalQueue type="SHELTER_VERIFICATION" />
            </Suspense>
          )}
        </Hb.Tabs.Panel>
        <Hb.Tabs.Panel value="REPORT" {...stylex.props(styles.panel)}>
          <Suspense fallback={<LoadingState />}>
            <ReportQueue />
          </Suspense>
        </Hb.Tabs.Panel>
      </Hb.Tabs.Provider>
    </div>
  );
};
