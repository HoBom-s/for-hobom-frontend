import { Suspense, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { LoadingState } from "@/shared/ui";
import { AnnouncementManager } from "./AnnouncementManager";
import { FaqManager } from "./FaqManager";
import { styles } from "./ConsoleContent.styles";

type Tab = "announcements" | "faq";

/** §7.4 콘텐츠 (셀프서비스 CMS). 공지사항 and FAQ are wired; 보호소 소개 follows.
 *  Scoped to the shelter. */
export const ConsoleContent = ({ shelterId }: { shelterId: string }) => {
  const [tab, setTab] = useState<Tab>("announcements");

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>셀프서비스 CMS</span>
        <h1 {...stylex.props(styles.title)}>콘텐츠</h1>
        <p {...stylex.props(styles.subtitle)}>공지·소개·FAQ를 직접 관리해요</p>
      </header>

      <div {...stylex.props(styles.subtabs)}>
        <button
          type="button"
          {...stylex.props(styles.tab, tab === "announcements" && styles.tabActive)}
          onClick={() => setTab("announcements")}
        >
          공지사항
        </button>
        <button
          type="button"
          {...stylex.props(styles.tab, tab === "faq" && styles.tabActive)}
          onClick={() => setTab("faq")}
        >
          FAQ
        </button>
        <span {...stylex.props(styles.tab, styles.tabSoon)}>보호소 소개 · 준비 중</span>
      </div>

      <Suspense fallback={<LoadingState />}>
        {tab === "announcements" ? (
          <AnnouncementManager shelterId={shelterId} />
        ) : (
          <FaqManager shelterId={shelterId} />
        )}
      </Suspense>
    </div>
  );
};
