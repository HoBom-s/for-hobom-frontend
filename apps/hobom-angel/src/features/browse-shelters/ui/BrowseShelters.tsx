import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LoadingState } from "@/shared/ui";
import { useBrowseShelters } from "../model/useBrowseShelters";
import { ShelterGridSkeleton } from "./ShelterGridSkeleton";
import { ShelterMapView } from "./ShelterMapView";
import { ShelterRegionFilter } from "./ShelterRegionFilter";
import { ShelterResults } from "./ShelterResults";
import { styles } from "./BrowseShelters.styles";

export const BrowseShelters = () => {
  const { region, view, setRegion, setView } = useBrowseShelters();

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>함께하는 보호소</h1>
        <p {...stylex.props(styles.subtitle)}>플랫폼이 서류 심사로 검증한 보호소만 노출돼요.</p>
      </header>

      <div {...stylex.props(styles.controls)}>
        <ShelterRegionFilter region={region} onChange={setRegion} />

        <span {...stylex.props(styles.viewToggle)}>
          <Hb.ToggleButtonGroup variant="segmented" aria-label="보기 방식">
            <Hb.ToggleButton
              variant="segmented"
              value="grid"
              selected={view === "grid"}
              onChange={() => setView("grid")}
            >
              목록
            </Hb.ToggleButton>
            <Hb.ToggleButton
              variant="segmented"
              value="map"
              selected={view === "map"}
              onChange={() => setView("map")}
            >
              지도
            </Hb.ToggleButton>
          </Hb.ToggleButtonGroup>
        </span>
      </div>

      {view === "grid" ? (
        <Suspense fallback={<ShelterGridSkeleton />}>
          <ShelterResults region={region} />
        </Suspense>
      ) : (
        <Suspense fallback={<LoadingState />}>
          <ShelterMapView region={region} />
        </Suspense>
      )}
    </div>
  );
};
