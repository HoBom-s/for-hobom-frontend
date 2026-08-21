// 보호소 목록 경로의 실제 화면 구조를 보존하는 전체 페이지 스켈레톤
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./BrowseShelters.styles";
import { ShelterGridSkeleton } from "./ShelterGridSkeleton";
import { styles as regionStyles } from "./ShelterRegionFilter.styles";

export const BrowseSheltersSkeleton = () => (
  <div {...stylex.props(styles.root)} aria-busy="true">
    <header {...stylex.props(styles.header)} aria-hidden="true">
      <Hb.Skeleton variant="rectangular" width={128} height={11} />
      <Hb.Skeleton variant="rectangular" width={190} height={30} />
      <Hb.Skeleton variant="rectangular" width="min(100%, 430px)" height={27} />
    </header>

    <div
      {...stylex.props(styles.registerBanner)}
      data-testid="shelter-banner-skeleton"
      aria-hidden="true"
    >
      <div {...stylex.props(styles.registerCopy)}>
        <Hb.Skeleton variant="rectangular" width={156} height={20} />
        <Hb.Skeleton variant="rectangular" width="min(100%, 420px)" height={23} />
      </div>
      <Hb.Skeleton variant="rectangular" width={144} height={44} />
    </div>

    <div {...stylex.props(styles.controls)} aria-hidden="true">
      <div {...stylex.props(regionStyles.root)}>
        <Hb.Skeleton variant="rectangular" width={620} height={40} />
      </div>
      <span {...stylex.props(styles.viewToggle)}>
        <Hb.Skeleton variant="rectangular" width={112} height={40} />
      </span>
    </div>

    <ShelterGridSkeleton />
  </div>
);
