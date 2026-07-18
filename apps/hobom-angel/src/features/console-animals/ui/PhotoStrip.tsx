import * as stylex from "@stylexjs/stylex";
import { styles } from "./AnimalForm.styles";

export interface StripPhoto {
  key: string;
  url: string;
}

interface PhotoStripProps {
  photos: StripPhoto[];
  /** Provided → an add tile appears (register mode). */
  onAdd?: (files: FileList | null) => void;
  /** Provided → each photo shows a remove button. */
  onRemove?: (key: string) => void;
  uploading?: boolean;
  emptyText?: string;
}

/** A row of photo thumbnails, editable (upload / remove) or read-only. Shared by
 *  the register form (uploads) and the edit form (existing photos preview). */
export const PhotoStrip = ({ photos, onAdd, onRemove, uploading, emptyText }: PhotoStripProps) => {
  if (photos.length === 0 && !onAdd) {
    return <span {...stylex.props(styles.emptyPhotos)}>{emptyText ?? "등록된 사진이 없어요."}</span>;
  }

  return (
    <div {...stylex.props(styles.attach)}>
      {photos.map((photo) => (
        <div key={photo.key} {...stylex.props(styles.thumb)}>
          <img src={photo.url} alt="" {...stylex.props(styles.thumbImg)} />
          {onRemove && (
            <button
              type="button"
              aria-label="사진 삭제"
              {...stylex.props(styles.thumbRemove)}
              onClick={() => onRemove(photo.key)}
            >
              ×
            </button>
          )}
        </div>
      ))}

      {onAdd && (
        <label {...stylex.props(styles.attachBtn)}>
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
