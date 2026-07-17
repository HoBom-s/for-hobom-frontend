import { Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { VolunteerBoard } from "@/features/volunteer";
import { VolunteerReviewsFeed } from "@/features/volunteer-feed";
import { ROUTES } from "@/shared/config";
import { LoadingState } from "@/shared/ui";
import { styles } from "./VolunteerPage.styles";

const TABS = [
  { value: "schedule", label: "봉사 일정" },
  { value: "reviews", label: "봉사 후기" },
] as const;

/** §05 봉사활동: the event schedule and the review feed under one section (tab
 *  synced to the URL), with the review composer opening its own page. */
export const VolunteerPage = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "reviews" ? "reviews" : "schedule";

  const selectTab = (value: string) =>
    setParams(value === "reviews" ? { tab: "reviews" } : {}, { replace: true });

  return (
    <div>
      <div {...stylex.props(styles.tabsRow)}>
        <Hb.Tabs.Provider value={tab} onChange={(_, value) => selectTab(value)}>
          <Hb.Tabs.Root>
            {TABS.map((item) => (
              <Hb.Tabs.Item key={item.value} value={item.value} label={item.label} />
            ))}
          </Hb.Tabs.Root>
        </Hb.Tabs.Provider>

        {tab === "reviews" && (
          <span {...stylex.props(styles.action)}>
            <Hb.Button variant="primary" size="small" onClick={() => void navigate(ROUTES.VOLUNTEER_WRITE)}>
              후기 쓰기
            </Hb.Button>
          </span>
        )}
      </div>

      <Suspense fallback={<LoadingState />}>
        {tab === "schedule" ? <VolunteerBoard /> : <VolunteerReviewsFeed />}
      </Suspense>
    </div>
  );
};
