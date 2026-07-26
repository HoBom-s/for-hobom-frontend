import { Suspense } from "react";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { shelterQueries } from "@/entities/shelter";
import { LoadingState } from "@/shared/ui";
import { SHELTER_TABS } from "../lib/shelter-tabs.lib";
import { useShelterMicrosite } from "../model/useShelterMicrosite";
import { useShelterTab } from "../model/useShelterTab";
import { ShelterHeader } from "./ShelterHeader";
import { AboutTab } from "./tabs/AboutTab";
import { AnimalsTab } from "./tabs/AnimalsTab";
import { FaqTab } from "./tabs/FaqTab";
import { NoticesTab } from "./tabs/NoticesTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { VolunteerTab } from "./tabs/VolunteerTab";
import { styles } from "./ShelterMicrosite.styles";

/** §04 shelter microsite: header + tabbed content. The active tab is URL-synced;
 *  each content tab loads its own data and suspends locally. */
export const ShelterMicrosite = ({ slug }: { slug: string }) => {
  const shelter = useShelterMicrosite(slug);
  const { data: stats } = useSuspenseQuery(shelterQueries.stats(shelter.id));
  const [tab, setTab] = useShelterTab();

  return (
    <div {...stylex.props(styles.root)}>
      <Hb.Stack spacing={3}>
        <ShelterHeader shelter={shelter} />

        <Hb.Tabs.Provider value={tab} onChange={(_, value) => setTab(value)}>
          <Hb.Tabs.Root>
            {SHELTER_TABS.map((item) => (
              <Hb.Tabs.Item
                key={item.value}
                value={item.value}
                label={item.value === "animals" ? `동물 ${stats.shelteredCount}` : item.label}
              />
            ))}
          </Hb.Tabs.Root>

          <Hb.Tabs.Panel value="about" {...stylex.props(styles.panel)}>
            <Suspense fallback={<LoadingState />}>
              <AboutTab shelter={shelter} stats={stats} />
            </Suspense>
          </Hb.Tabs.Panel>
          <Hb.Tabs.Panel value="animals" {...stylex.props(styles.panel)}>
            <Suspense fallback={<LoadingState />}>
              <AnimalsTab shelterId={shelter.id} />
            </Suspense>
          </Hb.Tabs.Panel>
          <Hb.Tabs.Panel value="notices" {...stylex.props(styles.panel)}>
            <Suspense fallback={<LoadingState />}>
              <NoticesTab shelterId={shelter.id} />
            </Suspense>
          </Hb.Tabs.Panel>
          <Hb.Tabs.Panel value="volunteer" {...stylex.props(styles.panel)}>
            <Suspense fallback={<LoadingState />}>
              <VolunteerTab shelterId={shelter.id} />
            </Suspense>
          </Hb.Tabs.Panel>
          <Hb.Tabs.Panel value="reviews" {...stylex.props(styles.panel)}>
            <Suspense fallback={<LoadingState />}>
              <ReviewsTab shelterId={shelter.id} />
            </Suspense>
          </Hb.Tabs.Panel>
          <Hb.Tabs.Panel value="faq" {...stylex.props(styles.panel)}>
            <Suspense fallback={<LoadingState />}>
              <FaqTab shelterId={shelter.id} />
            </Suspense>
          </Hb.Tabs.Panel>
        </Hb.Tabs.Provider>
      </Hb.Stack>
    </div>
  );
};
