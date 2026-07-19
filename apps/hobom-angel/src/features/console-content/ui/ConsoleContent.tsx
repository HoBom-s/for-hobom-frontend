import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { LoadingState } from "@/shared/ui";
import { AnnouncementManager } from "./AnnouncementManager";
import { styles } from "./ConsoleContent.styles";

/** §7.4 콘텐츠 (셀프서비스 CMS). 공지사항 management is wired; 보호소 소개 / FAQ
 *  follow in later PRs (shown as upcoming tabs). Scoped to the shelter. */
const SUBTABS = [
  { label: "공지사항", ready: true },
  { label: "보호소 소개", ready: false },
  { label: "FAQ", ready: false },
];

export const ConsoleContent = ({ shelterId }: { shelterId: string }) => (
  <div {...stylex.props(styles.root)}>
    <h1 {...stylex.props(styles.title)}>콘텐츠</h1>
    <p {...stylex.props(styles.subtitle)}>공지·소개·FAQ를 직접 관리해요</p>

    <div {...stylex.props(styles.subtabs)}>
      {SUBTABS.map((tab) => (
        <span
          key={tab.label}
          {...stylex.props(styles.tab, tab.ready ? styles.tabActive : styles.tabSoon)}
        >
          {tab.ready ? tab.label : `${tab.label} · 준비 중`}
        </span>
      ))}
    </div>

    <Suspense fallback={<LoadingState />}>
      <AnnouncementManager shelterId={shelterId} />
    </Suspense>
  </div>
);
