import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { useBrowseShelters } from "../model/useBrowseShelters";
import { ShelterGridSkeleton } from "./ShelterGridSkeleton";
import { ShelterRegionFilter } from "./ShelterRegionFilter";
import { ShelterResults } from "./ShelterResults";
import { styles } from "./BrowseShelters.styles";

export const BrowseShelters = () => {
  const { region, setRegion } = useBrowseShelters();

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>함께하는 보호소</h1>
        <p {...stylex.props(styles.subtitle)}>플랫폼이 서류 심사로 검증한 보호소만 노출돼요.</p>
      </header>

      <ShelterRegionFilter region={region} onChange={setRegion} />

      <Suspense fallback={<ShelterGridSkeleton />}>
        <ShelterResults region={region} />
      </Suspense>
    </div>
  );
};
