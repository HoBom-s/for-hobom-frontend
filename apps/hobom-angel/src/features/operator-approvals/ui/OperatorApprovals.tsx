import { Suspense, useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { reportQueries } from "@/entities/report";
import { LoadingState } from "@/shared/ui";
import { ReportQueue } from "./ReportQueue";
import { styles } from "./OperatorApprovals.styles";

type ApprovalTab = "verification" | "promotion" | "placement" | "report";

// Only the report tab is backed today; the rest await GET /approvals/pending.
const PENDING_TABS: { value: ApprovalTab; label: string }[] = [
  { value: "verification", label: "보호소 검증" },
  { value: "promotion", label: "스태프 승격" },
  { value: "placement", label: "입양·임보" },
];

const Placeholder = () => (
  <p {...stylex.props(styles.placeholder)}>
    대기 목록 엔드포인트(GET /approvals/pending)가 연결되면 여기에 표시돼요.
  </p>
);

/** §09 운영자 승인 큐 — 보호소 검증 · 스태프 승격 · 입양/임보 · 신고 모더레이션.
 *  The 신고 tab is wired; the others await their backend list endpoint. */
export const OperatorApprovals = () => {
  const [tab, setTab] = useState<ApprovalTab>("report");
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
          {PENDING_TABS.map((item) => (
            <Hb.Tabs.Item key={item.value} value={item.value} label={item.label} />
          ))}
          <Hb.Tabs.Item value="report" label={`신고 ${reports.length}`} />
        </Hb.Tabs.Root>

        {PENDING_TABS.map((item) => (
          <Hb.Tabs.Panel key={item.value} value={item.value} {...stylex.props(styles.panel)}>
            <Placeholder />
          </Hb.Tabs.Panel>
        ))}
        <Hb.Tabs.Panel value="report" {...stylex.props(styles.panel)}>
          <Suspense fallback={<LoadingState />}>
            <ReportQueue />
          </Suspense>
        </Hb.Tabs.Panel>
      </Hb.Tabs.Provider>
    </div>
  );
};
