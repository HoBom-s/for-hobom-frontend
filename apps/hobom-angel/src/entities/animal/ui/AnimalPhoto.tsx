import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./AnimalPhoto.styles";

interface AnimalPhotoProps {
  src?: string;
  alt: string;
  /** CSS aspect-ratio for the frame (e.g. "1 / 1"). Defaults to "4 / 3". */
  ratio?: string;
  /** Load eagerly with high priority (e.g. the gallery hero). */
  priority?: boolean;
}

/** Animal image — the design-system `Image` with the brand's paw fallback. */
export const AnimalPhoto = ({ src, alt, ratio = "4 / 3", priority = false }: AnimalPhotoProps) => (
  <Hb.Image
    src={src}
    alt={alt}
    ratio={ratio}
    priority={priority}
    fallback={
      <span {...stylex.props(styles.fallback)} aria-hidden="true">
        🐾
      </span>
    }
  />
);
