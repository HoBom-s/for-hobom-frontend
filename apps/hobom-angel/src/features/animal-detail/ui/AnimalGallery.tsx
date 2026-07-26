import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { AnimalPhoto } from "@/entities/animal";
import { styles } from "./AnimalGallery.styles";

interface AnimalGalleryProps {
  photos: string[];
  name: string;
}

/** Image gallery: a hero photo with a thumbnail selector. (Lightbox/swipe is a
 *  later enhancement — this keeps the browse → detail path shippable.) */
export const AnimalGallery = ({ photos, name }: AnimalGalleryProps) => {
  const [active, setActive] = useState(0);
  const frames = photos.length > 0 ? photos : [undefined];
  const current = frames[Math.min(active, frames.length - 1)];

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.hero)}>
        <AnimalPhoto src={current} alt={`${name} 사진`} ratio="4 / 3" priority />
      </div>

      {frames.length > 1 && (
        <div {...stylex.props(styles.thumbs)}>
          {frames.map((photo, index) => (
            <button
              key={`${photo ?? "empty"}-${index}`}
              type="button"
              aria-label={`${name} 사진 ${index + 1}`}
              aria-pressed={index === active}
              {...stylex.props(styles.thumb, index === active && styles.thumbActive)}
              onClick={() => setActive(index)}
            >
              <AnimalPhoto src={photo} alt={`${name} 썸네일 ${index + 1}`} ratio="1 / 1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
