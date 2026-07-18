import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { animalQueries } from "@/entities/animal";
import type { UpdateAnimalInput } from "@/entities/animal";
import { AnimalFields } from "./AnimalFields";
import { animalFormFromDetail, toUpdateInput } from "../lib/animal-form.lib";
import { styles } from "./AnimalForm.styles";

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
