import { Suspense, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LoadingState } from "@/shared/ui";
import { FavoriteAnimals } from "./FavoriteAnimals";
import { FavoriteShelters } from "./FavoriteShelters";
import { styles } from "./Favorites.styles";

type FavoriteTab = "animals" | "shelters";

const TABS = [
  { value: "animals", label: "찜한 동물" },
  { value: "shelters", label: "팔로우 보호소" },
] as const;

/** §05·부록 찜: the viewer's favorited animals and followed shelters, each tab
 *  loading and suspending on its own. */
export const Favorites = () => {
  const [tab, setTab] = useState<FavoriteTab>("animals");

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>찜</h1>
        <p {...stylex.props(styles.subtitle)}>관심 있는 동물과 보호소를 모아봤어요.</p>
      </header>

      <Hb.Tabs.Provider value={tab} onChange={(_, value) => setTab(value)}>
        <Hb.Tabs.Root>
          {TABS.map((item) => (
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
      </Hb.Tabs.Provider>
    </div>
  );
};
