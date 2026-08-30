// 동물 목록 경로의 실제 화면 구조를 보존하는 전체 페이지 스켈레톤
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { AnimalGridSkeleton } from "./AnimalGridSkeleton";
import { styles as filterStyles } from "./AnimalFilters.styles";
import { styles } from "./BrowseAnimals.styles";

export const BrowseAnimalsSkeleton = () => (
  <div {...stylex.props(styles.root)} aria-busy="true">
    <header {...stylex.props(styles.header)} aria-hidden="true">
      <Hb.Skeleton variant="rectangular" width={118} height={11} />
      <h1 {...stylex.props(styles.title)}>
        <span {...stylex.props(styles.rule)} />
        <Hb.Skeleton variant="rectangular" width={250} height={30} />
      </h1>
      <div {...stylex.props(styles.lead)}>
        <Hb.Skeleton variant="rectangular" width="min(100%, 440px)" height={24} />
      </div>
    </header>

    <div
      {...stylex.props(filterStyles.root)}
      data-testid="animal-filter-skeleton"
      aria-hidden="true"
    >
      <div {...stylex.props(filterStyles.bar)}>
        <div {...stylex.props(filterStyles.search)}>
          <Hb.Skeleton variant="rectangular" height={40} style={{ flex: 1 }} />
          <Hb.Skeleton variant="rectangular" width={64} height={40} />
        </div>
        <Hb.Skeleton variant="rectangular" width={128} height={40} />
        <Hb.Skeleton variant="rectangular" width={132} height={40} />
        <Hb.Skeleton variant="rectangular" width={88} height={40} />
        <div {...stylex.props(filterStyles.right)}>
          <Hb.Skeleton variant="rectangular" width={96} height={40} />
          <Hb.Skeleton variant="rectangular" width={124} height={40} />
        </div>
      </div>
    </div>

    <AnimalGridSkeleton />
  </div>
);
