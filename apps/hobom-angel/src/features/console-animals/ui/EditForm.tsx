import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { animalQueries } from "@/entities/animal";
import { mediaUrl } from "@/shared/lib";
import type { UpdateAnimalInput } from "@/entities/animal";
import { AnimalFields } from "./AnimalFields";
import { PhotoStrip } from "./PhotoStrip";
import { animalFormFromDetail, toUpdateInput } from "../lib/animal-form.lib";
import { styles } from "./AnimalForm.styles";
import { styles as fieldStyles } from "./AnimalFields.styles";

interface EditFormProps {
  animalId: string;
  onUpdate: (input: UpdateAnimalInput) => void;
  onCancel: () => void;
  saving: boolean;
}

/** Edit an existing animal's profile — prefilled from its loaded detail. */
export const EditForm = ({ animalId, onUpdate, onCancel, saving }: EditFormProps) => {
  const { data: detail } = useSuspenseQuery(animalQueries.detail(animalId));
  const [values, setValues] = useState(() => animalFormFromDetail(detail));

  const canSubmit = values.name.trim().length > 0 && !saving;

  return (
    <section {...stylex.props(styles.card)}>
      <div {...stylex.props(styles.headingRow)}>
        <h2 {...stylex.props(styles.heading)}>{detail.name} 수정</h2>
        <span {...stylex.props(styles.spacer)} />
        <button type="button" {...stylex.props(styles.linkBtn)} onClick={onCancel}>
          새로 등록
        </button>
      </div>

      <AnimalFields values={values} onChange={setValues} />

      <div {...stylex.props(fieldStyles.field)}>
        <span {...stylex.props(fieldStyles.label)}>사진</span>
        <PhotoStrip
          photos={detail.photos.map((key) => ({ key, url: mediaUrl(key) }))}
          emptyText="등록된 사진이 없어요."
        />
        <span {...stylex.props(styles.note)}>사진은 동물 등록 시에만 추가할 수 있어요.</span>
      </div>

      <div {...stylex.props(styles.actions)}>
        <Hb.Button variant="ghost" onClick={onCancel}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="primary"
          fullWidth
          disabled={!canSubmit}
          loading={saving}
          onClick={() => onUpdate(toUpdateInput(values))}
        >
          저장하기
        </Hb.Button>
      </div>
    </section>
  );
};
