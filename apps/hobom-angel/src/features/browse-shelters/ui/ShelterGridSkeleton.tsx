import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles as browseStyles } from "./BrowseShelters.styles";
import { styles as gridStyles } from "./ShelterGrid.styles";

const PLACEHOLDERS = Array.from({ length: 6 }, (_, index) => index);

const styles = stylex.create({
  card: {
    overflow: "hidden",
    borderRadius: "var(--hb-angel-radius-card)",
    backgroundColor: "var(--hb-color-surface)",
    boxShadow: "var(--hb-angel-shadow-sm)",
  },
  body: {
    minHeight: 76,
    paddingInline: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  region: { marginTop: 10 },
});

/** Directory loading state whose count, media ratio, and body match a shelter card. */
export const ShelterGridSkeleton = () => (
  <div role="status" aria-label="보호소 목록 불러오는 중">
    <div aria-hidden="true">
      <Hb.Skeleton
        {...stylex.props(browseStyles.count)}
        variant="rectangular"
        width={142}
        height={32}
      />
    </div>
    <div {...stylex.props(gridStyles.grid)} aria-hidden="true">
      {PLACEHOLDERS.map((index) => (
        <div key={index} {...stylex.props(styles.card)} data-testid="shelter-card-skeleton">
          <Hb.Skeleton
            variant="rectangular"
            width="100%"
            style={{ aspectRatio: "16 / 9" }}
            data-testid="shelter-card-skeleton-media"
          />
          <div {...stylex.props(styles.body)}>
            <Hb.Skeleton variant="rectangular" width="45%" height={14} />
            <div {...stylex.props(styles.region)}>
              <Hb.Skeleton variant="rectangular" width="32%" height={12} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
