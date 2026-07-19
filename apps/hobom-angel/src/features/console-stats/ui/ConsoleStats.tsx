import * as stylex from "@stylexjs/stylex";
import { Chart } from "hobom-design-system";
import { useConsoleStats } from "../model/useConsoleStats";
import { formatAdoptionRate } from "../lib/dashboard.lib";
import { styles } from "./ConsoleStats.styles";

interface Kpi {
  label: string;
  value: string;
  caption: string;
  accent?: boolean;
  captionTone?: "up" | "down";
}

/** §7.7 통계 — a shelter's management KPIs plus the adoption trend, scoped to
 *  the staff member's shelter. */
export const ConsoleStats = ({ shelterId }: { shelterId: string }) => {
  const { dashboard, delta, bars } = useConsoleStats(shelterId);

  const kpis: Kpi[] = [
    {
      label: "이번 달 입양",
      value: String(dashboard.thisMonthAdoptions),
      caption: `${delta.arrow} ${delta.caption}`,
      accent: true,
      captionTone: delta.direction === "flat" ? undefined : delta.direction,
    },
    {
      label: "보호 중",
      value: String(dashboard.shelteredCount),
      caption: `입양가능 ${dashboard.availableCount}`,
    },
    {
      label: "처리 대기 신청",
      value: String(dashboard.pendingApplications),
      caption: "입양·임보 신청 대기",
    },
    {
      label: "입양율",
      value: formatAdoptionRate(dashboard.adoptionRate),
      caption: `누적 입양 ${dashboard.adoptedCount}`,
    },
  ];

  return (
    <div {...stylex.props(styles.root)}>
      <h1 {...stylex.props(styles.title)}>통계</h1>
      <p {...stylex.props(styles.subtitle)}>입양율 · 보호 현황 · 신청 처리</p>

      <div {...stylex.props(styles.kpiGrid)}>
        {kpis.map((kpi) => (
          <div key={kpi.label} {...stylex.props(styles.card)}>
            <span {...stylex.props(styles.cardLabel)}>{kpi.label}</span>
            <span {...stylex.props(styles.cardValue, kpi.accent && styles.cardValueAccent)}>
              {kpi.value}
            </span>
            <span
              {...stylex.props(
                styles.caption,
                kpi.captionTone === "up" && styles.captionUp,
                kpi.captionTone === "down" && styles.captionDown,
              )}
            >
              {kpi.caption}
            </span>
          </div>
        ))}
      </div>

      <section {...stylex.props(styles.chartCard)}>
        <h2 {...stylex.props(styles.chartTitle)}>월별 입양 추이</h2>
        <Chart
          type="bar"
          data={bars}
          config={{ x: "label", y: "count", colorKey: "fill", legend: false }}
          height={180}
          ariaLabel="최근 6개월 월별 입양 추이"
        />
      </section>
    </div>
  );
};
