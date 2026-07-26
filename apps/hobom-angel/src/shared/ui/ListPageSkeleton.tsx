import * as stylex from "@stylexjs/stylex";
import { Hb, HoBomSkeleton } from "hobom-design-system";

const TABLET = "@media (min-width: 640px)";
const DESKTOP = "@media (min-width: 1024px)";

const styles = stylex.create({
  root: {
    maxWidth: 1120,
    marginInline: "auto",
    paddingInline: "clamp(16px, 4vw, 32px)",
    paddingTop: 20,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: { display: "flex", flexDirection: "column", gap: 10 },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      [TABLET]: "repeat(3, 1fr)",
      [DESKTOP]: "repeat(4, 1fr)",
    },
    gap: { default: 12, [DESKTOP]: 16 },
  },
});

const CARDS = Array.from({ length: 8 }, (_, index) => index);

/** A generic list-screen loading state (title + filter bar + card grid) shown
 *  while a list route's chunk or session probe resolves. Built from the design
 *  system's skeleton primitives. */
export const ListPageSkeleton = () => (
  <div {...stylex.props(styles.root)} aria-hidden="true">
    <div {...stylex.props(styles.header)}>
      <Hb.Skeleton variant="text" width={200} height={32} />
      <Hb.Skeleton variant="rectangular" width="100%" height={44} />
    </div>
    <div {...stylex.props(styles.grid)}>
      {CARDS.map((index) => (
        <HoBomSkeleton.Card key={index} />
      ))}
    </div>
  </div>
);
