import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { mediaUrl } from "@/shared/lib";

const DESKTOP = "@media (min-width: 768px)";

const styles = stylex.create({
  // Contained image for the modal — shorter on phones so comments stay visible.
  contain: {
    display: "block",
    width: "100%",
    height: "auto",
    objectFit: "contain",
    maxHeight: { default: "42vh", [DESKTOP]: "74vh" },
  },
});

interface PostImagesProps {
  imageKeys: string[];
  /** Contain within the available height (modal media pane) instead of a square. */
  contain?: boolean;
}

/** A post's images as a swipeable carousel (single image renders on its own). */
export const PostImages = ({ imageKeys, contain = false }: PostImagesProps) => {
  if (imageKeys.length === 0) return null;

  return (
    <Hb.Carousel aria-label="후기 사진">
      {imageKeys.map((key) =>
        contain ? (
          <img key={key} src={mediaUrl(key)} alt="" {...stylex.props(styles.contain)} />
        ) : (
          <Hb.Image key={key} src={mediaUrl(key)} alt="" ratio="1 / 1" />
        ),
      )}
    </Hb.Carousel>
  );
};
