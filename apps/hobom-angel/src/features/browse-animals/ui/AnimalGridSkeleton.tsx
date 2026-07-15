import * as stylex from "@stylexjs/stylex";
import { HoBomSkeleton } from "hobom-design-system";
import { styles as gridStyles } from "./AnimalGrid.styles";

const PLACEHOLDERS = Array.from({ length: 8 }, (_, index) => index);

/** Result-grid loading state — the design system's card skeleton in the grid. */
export const AnimalGridSkeleton = () => (
  <div {...stylex.props(gridStyles.grid)} aria-hidden="true">
    {PLACEHOLDERS.map((index) => (
      <HoBomSkeleton.Card key={index} />
    ))}
  </div>
);
