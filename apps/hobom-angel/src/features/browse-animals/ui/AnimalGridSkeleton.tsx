import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles as gridStyles } from "./AnimalGrid.styles";
import { styles } from "./AnimalGridSkeleton.styles";

const PLACEHOLDERS = Array.from({ length: 8 }, (_, index) => index);

/** Skeleton for the result section while the first page loads (design-system
 *  Skeleton primitives). */
export const AnimalGridSkeleton = () => (
  <div aria-hidden="true">
    <div {...stylex.props(styles.count)}>
      <Hb.Skeleton variant="text" width={72} />
    </div>
    <div {...stylex.props(gridStyles.grid)}>
      {PLACEHOLDERS.map((index) => (
        <div key={index} {...stylex.props(styles.card)}>
          <Hb.Skeleton variant="rectangular" width="100%">
            <div {...stylex.props(styles.photo)} />
          </Hb.Skeleton>
          <div {...stylex.props(styles.body)}>
            <Hb.Skeleton variant="text" width="55%" />
            <Hb.Skeleton variant="text" width="80%" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
