import * as stylex from "@stylexjs/stylex";
import { SEX_LABEL, SIZE_LABEL, SPECIES_LABEL } from "@/entities/animal";
import type { AnimalSex, AnimalSize, AnimalSpecies } from "@/entities/animal";
import { styles } from "./AnimalFields.styles";
import type { AnimalFormValues } from "../lib/animal-form.lib";

const SPECIES: AnimalSpecies[] = ["DOG", "CAT", "OTHER"];
const SEXES: AnimalSex[] = ["MALE", "FEMALE", "UNKNOWN"];
const SIZES: AnimalSize[] = ["SMALL", "MEDIUM", "LARGE"];

interface AnimalFieldsProps {
  values: AnimalFormValues;
  onChange: (values: AnimalFormValues) => void;
}

/** The animal profile inputs shared by the register and edit forms. */
export const AnimalFields = ({ values, onChange }: AnimalFieldsProps) => (
  <div {...stylex.props(styles.fields)}>
    <label {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>이름</span>
      <input
        {...stylex.props(styles.input)}
        value={values.name}
        placeholder="콩이"
        onChange={(event) => onChange({ ...values, name: event.target.value })}
      />
    </label>

    <div {...stylex.props(styles.row)}>
      <label {...stylex.props(styles.field, styles.rowItem)}>
        <span {...stylex.props(styles.label)}>종</span>
        <select
          {...stylex.props(styles.input)}
          value={values.species}
          onChange={(event) => onChange({ ...values, species: event.target.value as AnimalSpecies })}
        >
          {SPECIES.map((species) => (
            <option key={species} value={species}>
              {SPECIES_LABEL[species]}
            </option>
          ))}
        </select>
      </label>
      <label {...stylex.props(styles.field, styles.rowItem)}>
        <span {...stylex.props(styles.label)}>품종</span>
        <input
          {...stylex.props(styles.input)}
          value={values.breed}
          placeholder="푸들"
          onChange={(event) => onChange({ ...values, breed: event.target.value })}
        />
      </label>
    </div>

    <div {...stylex.props(styles.row)}>
      <label {...stylex.props(styles.field, styles.rowItem)}>
        <span {...stylex.props(styles.label)}>성별</span>
        <select
          {...stylex.props(styles.input)}
          value={values.sex}
          onChange={(event) => onChange({ ...values, sex: event.target.value as AnimalSex })}
        >
          {SEXES.map((sex) => (
            <option key={sex} value={sex}>
              {SEX_LABEL[sex]}
            </option>
          ))}
        </select>
      </label>
      <label {...stylex.props(styles.field, styles.rowItem)}>
        <span {...stylex.props(styles.label)}>크기</span>
        <select
          {...stylex.props(styles.input)}
          value={values.size}
          onChange={(event) => onChange({ ...values, size: event.target.value as AnimalSize })}
        >
          {SIZES.map((size) => (
            <option key={size} value={size}>
              {SIZE_LABEL[size]}
            </option>
          ))}
        </select>
      </label>
    </div>

    <label {...stylex.props(styles.field, styles.rowItem)}>
      <span {...stylex.props(styles.label)}>나이(개월)</span>
      <input
        {...stylex.props(styles.input)}
        type="number"
        min={0}
        value={values.ageMonths}
        placeholder="24"
        onChange={(event) => onChange({ ...values, ageMonths: event.target.value })}
      />
    </label>

    <div {...stylex.props(styles.checks)}>
      <label {...stylex.props(styles.check)}>
        <input
          type="checkbox"
          checked={values.neutered}
          onChange={(event) => onChange({ ...values, neutered: event.target.checked })}
        />
        중성화 완료
      </label>
      <label {...stylex.props(styles.check)}>
        <input
          type="checkbox"
          checked={values.vaccinated}
          onChange={(event) => onChange({ ...values, vaccinated: event.target.checked })}
        />
        접종 완료
      </label>
    </div>

    <label {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>마이크로칩</span>
      <input
        {...stylex.props(styles.input)}
        value={values.microchip}
        placeholder="칩 번호 (선택)"
        onChange={(event) => onChange({ ...values, microchip: event.target.value })}
      />
    </label>

    <label {...stylex.props(styles.field)}>
      <span {...stylex.props(styles.label)}>소개</span>
      <textarea
        {...stylex.props(styles.input, styles.textarea)}
        value={values.description}
        placeholder="성격과 특징을 알려주세요."
        onChange={(event) => onChange({ ...values, description: event.target.value })}
      />
    </label>
  </div>
);
