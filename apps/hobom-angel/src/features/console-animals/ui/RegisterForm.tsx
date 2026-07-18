import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { RegisterAnimalInput } from "@/entities/animal";
import { AnimalFields } from "./AnimalFields";
import { useAnimalPhotos } from "../model/useAnimalPhotos";
import { EMPTY_ANIMAL_FORM, toRegisterInput } from "../lib/animal-form.lib";
import { styles } from "./AnimalForm.styles";
import { styles as fieldStyles } from "./AnimalFields.styles";

interface RegisterFormProps {
  onRegister: (input: RegisterAnimalInput) => void;
  saving: boolean;
}

/** Register a new animal — the profile fields plus a rescue date and photos. */
export const RegisterForm = ({ onRegister, saving }: RegisterFormProps) => {
  const [values, setValues] = useState(EMPTY_ANIMAL_FORM);
  const [intakeDate, setIntakeDate] = useState("");
  const photos = useAnimalPhotos();

  const canSubmit =
    values.name.trim().length > 0 && intakeDate !== "" && !saving && !photos.uploading;

  const submit = () => {
    if (!canSubmit) return;

    onRegister(toRegisterInput(values, intakeDate, photos.keys));
    setValues(EMPTY_ANIMAL_FORM);
    setIntakeDate("");
    photos.reset();
  };

  return (
    <section {...stylex.props(styles.card)}>
      <h2 {...stylex.props(styles.heading)}>동물 등록</h2>

      <AnimalFields values={values} onChange={setValues} />

      <label {...stylex.props(fieldStyles.field)}>
        <span {...stylex.props(fieldStyles.label)}>구조일</span>
        <input
          {...stylex.props(fieldStyles.input)}
          type="date"
          value={intakeDate}
          onChange={(event) => setIntakeDate(event.target.value)}
        />
      </label>

      <div {...stylex.props(fieldStyles.field)}>
        <span {...stylex.props(fieldStyles.label)}>사진</span>
        <div {...stylex.props(styles.attach)}>
          {photos.images.map((image) => (
            <div key={image.objectKey} {...stylex.props(styles.thumb)}>
              <img src={image.publicUrl} alt="" {...stylex.props(styles.thumbImg)} />
              <button
                type="button"
                aria-label="사진 삭제"
                {...stylex.props(styles.thumbRemove)}
                onClick={() => photos.remove(image.objectKey)}
              >
                ×
              </button>
            </div>
          ))}
          <label {...stylex.props(styles.attachBtn)}>
            {photos.uploading ? "업로드 중…" : "＋ 사진"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              {...stylex.props(styles.hiddenInput)}
              onChange={(event) => {
                const input = event.currentTarget;

                void photos.add(input.files);
                input.value = "";
              }}
            />
          </label>
        </div>
      </div>

      <Hb.Button
        variant="primary"
        fullWidth
        disabled={!canSubmit}
        loading={saving}
        onClick={submit}
      >
        등록하기
      </Hb.Button>
    </section>
  );
};
