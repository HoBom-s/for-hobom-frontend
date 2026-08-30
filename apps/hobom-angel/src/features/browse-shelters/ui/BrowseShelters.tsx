import { Suspense } from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
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
        <h1 {...stylex.props(styles.title)}>검증된 보호소</h1>
        <p {...stylex.props(styles.subtitle)}>운영자 검증을 마친 보호소만 소개합니다.</p>
      </header>

      <div {...stylex.props(styles.registerBanner)}>
        <div {...stylex.props(styles.registerCopy)}>
          <span {...stylex.props(styles.registerKicker)}>보호소를 운영하세요?</span>
          <p {...stylex.props(styles.registerText)}>
            서류 심사를 거쳐 검증 보호소로 등록하고, 입양·봉사 활동을 시작하세요.
          </p>
        </div>
        <Link to={ROUTES.SHELTER_REGISTER} {...stylex.props(styles.registerCta)}>
          보호소 등록 신청
        </Link>
      </div>

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
