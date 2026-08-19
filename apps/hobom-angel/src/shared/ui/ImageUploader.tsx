import * as stylex from "@stylexjs/stylex";
import type { UploadedImage } from "@/shared/api";
import { styles } from "./ImageUploader.styles";

interface ImageUploaderProps {
  images: UploadedImage[];
  onAdd: (files: FileList | null) => void;
  onRemove: (objectKey: string) => void;
  uploading?: boolean;
  /** Hide the add tile once this many images are attached. */
  max?: number;
}

/** A multi-image picker over the presign upload flow — thumbnails with remove
 *  plus an add tile. Pair with `useImageUpload` for the state and uploads. */
export const ImageUploader = ({ images, onAdd, onRemove, uploading, max }: ImageUploaderProps) => {
  const canAddMore = max === undefined || images.length < max;

  return (
    <div {...stylex.props(styles.grid)}>
      {images.map((image) => (
        <div key={image.objectKey} {...stylex.props(styles.thumb)}>
          <img src={image.publicUrl} alt="" {...stylex.props(styles.thumbImg)} />
          <button
            type="button"
            aria-label="사진 삭제"
            {...stylex.props(styles.remove)}
            onClick={() => onRemove(image.objectKey)}
          >
            ×
          </button>
        </div>
      ))}

      {canAddMore && (
        <label {...stylex.props(styles.addTile)}>
          {uploading ? "업로드 중…" : "＋ 사진"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            {...stylex.props(styles.hiddenInput)}
            onChange={(event) => {
              const input = event.currentTarget;

              onAdd(input.files);
              input.value = "";
            }}
          />
        </label>
      )}
    </div>
  );
};
