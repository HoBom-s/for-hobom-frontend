import * as stylex from "@stylexjs/stylex";
import { HoBomSkeleton } from "hobom-design-system";
import { styles as gridStyles } from "./ShelterGrid.styles";

const PLACEHOLDERS = Array.from({ length: 6 }, (_, index) => index);

/** Directory loading state — the design system's card skeleton in the grid. */
export const ShelterGridSkeleton = () => (
  <div {...stylex.props(gridStyles.grid)} aria-hidden="true">
    {PLACEHOLDERS.map((index) => (
      <HoBomSkeleton.Card key={index} />
    ))}
  </div>
);
