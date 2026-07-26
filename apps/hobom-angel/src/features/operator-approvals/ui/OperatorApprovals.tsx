import { Suspense, useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { APPROVAL_TYPE_LABEL, approvalQueries } from "@/entities/approval";
import { reportQueries } from "@/entities/report";
import { LoadingState } from "@/shared/ui";
import type { ApprovalType } from "@/entities/approval";
import { PendingApprovalQueue } from "./PendingApprovalQueue";
import { ReportQueue } from "./ReportQueue";
import { styles } from "./OperatorApprovals.styles";

type Tab = ApprovalType | "REPORT";

const APPROVAL_TABS: ApprovalType[] = [
  "SHELTER_VERIFICATION",
  "STAFF_PROMOTION",
  "ADOPTION",
  "FOSTER",
];

/** §09 운영자 승인 큐 — 보호소 검증 · 스태프 승격 · 입양 · 임보 · 신고 모더레이션.
 *  Each tab loads its own pending list on demand; the badges show live counts. */
export const OperatorApprovals = () => {
  const [tab, setTab] = useState<Tab>("SHELTER_VERIFICATION");
  const { data: counts } = useSuspenseQuery(approvalQueries.counts());
  const { data: reports } = useSuspenseQuery(reportQueries.pending());

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>승인 큐</h1>
        <p {...stylex.props(styles.subtitle)}>
          보호소 검증 · 스태프 승격 · 입양/임보 · 신고를 한곳에서 처리해요.
        </p>
      </header>

      <Hb.Tabs.Provider value={tab} onChange={(_, value) => setTab(value)}>
        <Hb.Tabs.Root>
          {APPROVAL_TABS.map((type) => (
            <Hb.Tabs.Item
              key={type}
              value={type}
              label={`${APPROVAL_TYPE_LABEL[type]} ${counts[type]}`}
            />
          ))}
          <Hb.Tabs.Item value="REPORT" label={`신고 ${reports.length}`} />
        </Hb.Tabs.Root>

        {APPROVAL_TABS.map((type) => (
          <Hb.Tabs.Panel key={type} value={type} {...stylex.props(styles.panel)}>
            {tab === type && (
              <Suspense fallback={<LoadingState />}>
                <PendingApprovalQueue type={type} />
              </Suspense>
            )}
          </Hb.Tabs.Panel>
        ))}
        <Hb.Tabs.Panel value="REPORT" {...stylex.props(styles.panel)}>
          <Suspense fallback={<LoadingState />}>
            <ReportQueue />
          </Suspense>
        </Hb.Tabs.Panel>
      </Hb.Tabs.Provider>
    </div>
  );
};
