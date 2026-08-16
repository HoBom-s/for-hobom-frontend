import { Suspense, useState } from "react";
import type { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LoadingState } from "@/shared/ui";
import { FavoriteAnimals } from "./FavoriteAnimals";
import { FavoriteShelters } from "./FavoriteShelters";
import { styles } from "./Favorites.styles";

type FavoriteTab = "animals" | "shelters" | "reviews";

const TABS = [
  { value: "animals", label: "찜한 동물" },
  { value: "shelters", label: "팔로우 보호소" },
  { value: "reviews", label: "저장한 후기" },
] as const;

interface FavoritesProps {
  /** The 저장한 후기 tab content, injected by the page (a cross-feature slice
   *  can't be imported here directly). Its tab is hidden when omitted. */
  savedReviews?: ReactNode;
}

/** §05·부록 찜: the viewer's favorited animals, followed shelters, and saved
 *  reviews, each tab loading and suspending on its own. */
export const Favorites = ({ savedReviews }: FavoritesProps) => {
  const [tab, setTab] = useState<FavoriteTab>("animals");
  const tabs = TABS.filter((item) => item.value !== "reviews" || Boolean(savedReviews));

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>MY FAVORITES</span>
        <h1 {...stylex.props(styles.title)}>찜</h1>
        <p {...stylex.props(styles.subtitle)}>관심 있는 동물과 보호소, 저장한 후기를 모아봤어요.</p>
      </header>

      <Hb.Tabs.Provider value={tab} onChange={(_, value) => setTab(value)}>
        <Hb.Tabs.Root>
          {tabs.map((item) => (
            <Hb.Tabs.Item key={item.value} value={item.value} label={item.label} />
          ))}
        </Hb.Tabs.Root>

        <Hb.Tabs.Panel value="animals" {...stylex.props(styles.panel)}>
          <Suspense fallback={<LoadingState />}>
            <FavoriteAnimals />
          </Suspense>
        </Hb.Tabs.Panel>
        <Hb.Tabs.Panel value="shelters" {...stylex.props(styles.panel)}>
          <Suspense fallback={<LoadingState />}>
            <FavoriteShelters />
          </Suspense>
        </Hb.Tabs.Panel>
        {savedReviews && (
          <Hb.Tabs.Panel value="reviews" {...stylex.props(styles.panel)}>
            <Suspense fallback={<LoadingState />}>{savedReviews}</Suspense>
          </Hb.Tabs.Panel>
        )}
      </Hb.Tabs.Provider>
    </div>
  );
};
