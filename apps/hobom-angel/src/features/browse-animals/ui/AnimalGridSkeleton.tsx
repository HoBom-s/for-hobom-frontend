import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles as browseStyles } from "./BrowseAnimals.styles";
import { styles as gridStyles } from "./AnimalGrid.styles";

const PLACEHOLDERS = Array.from({ length: 8 }, (_, index) => index);

const styles = stylex.create({
  card: {
    overflow: "hidden",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  body: {
    minHeight: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingInline: 14,
    paddingTop: 12,
    paddingBottom: 14,
  },
});

/** Result loading state whose count row, media ratio, and card body match the final grid. */
export const AnimalGridSkeleton = () => (
  <div role="status" aria-label="친구 목록 불러오는 중">
    <div {...stylex.props(browseStyles.resultRow)} aria-hidden="true">
      <Hb.Skeleton variant="rectangular" width={64} height={24} />
    </div>
    <div {...stylex.props(gridStyles.grid)} aria-hidden="true">
      {PLACEHOLDERS.map((index) => (
        <div key={index} {...stylex.props(styles.card)} data-testid="animal-card-skeleton">
          <Hb.Skeleton
            variant="rectangular"
            width="100%"
            style={{ aspectRatio: "4 / 3" }}
            data-testid="animal-card-skeleton-media"
          />
          <div {...stylex.props(styles.body)}>
            <Hb.Skeleton variant="rectangular" width="55%" height={14} />
            <Hb.Skeleton variant="rectangular" width={64} height={24} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
