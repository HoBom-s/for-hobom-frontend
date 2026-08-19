import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ADDRESS_VISIBILITY_HINT, ADDRESS_VISIBILITY_LABEL } from "@/entities/shelter";
import { ImageUploader } from "@/shared/ui";
import type { AddressVisibility } from "@/entities/shelter";
import { useRegisterShelter } from "../model/useRegisterShelter";
import { isValidSlug } from "../lib/register-shelter.lib";
import { styles } from "./RegisterShelter.styles";

const VISIBILITIES: AddressVisibility[] = ["FULL", "PARTIAL", "HIDDEN"];

const FLOW = [
  { n: "1", label: "신청", desc: "정보 입력" },
  { n: "2", label: "검증", desc: "운영자 확인" },
  { n: "3", label: "승인", desc: "대표 권한" },
];

/** 보호소 등록 신청 — a light, guided form that opens a verification the operator
 *  reviews. The registrant becomes the shelter's 대표 on approval. */
export const RegisterShelter = () => {
  const {
    form,
    setField,
    submit,
    submitting,
    canSubmit,
    photos,
    addPhotos,
    removePhoto,
    uploadingPhotos,
  } = useRegisterShelter();
  const slugInvalid = form.slug.length > 0 && !isValidSlug(form.slug);

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>
          <span {...stylex.props(styles.kickerDot)} aria-hidden />
          보호소 등록
        </span>
        <div {...stylex.props(styles.titleRow)}>
          <span {...stylex.props(styles.rule)} aria-hidden />
          <h1 {...stylex.props(styles.title)}>보호소 등록 신청</h1>
        </div>
        <p {...stylex.props(styles.subtitle)}>
          신청하면 운영자의 검증을 거쳐 승인돼요. 승인되면 신청자가 이 보호소 대표가 돼요.
        </p>
        <div {...stylex.props(styles.steps)}>
          {FLOW.map((step, index) => (
            <div key={step.n} {...stylex.props(styles.step)}>
              <span {...stylex.props(styles.stepNum, index === 0 && styles.stepNumActive)}>
                {step.n}
              </span>
              <span {...stylex.props(styles.stepLabel)}>{step.label}</span>
              <span {...stylex.props(styles.stepDesc)}>{step.desc}</span>
            </div>
          ))}
        </div>
      </header>

      <div {...stylex.props(styles.card)}>
      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.sectionHead)}>
          <span {...stylex.props(styles.sectionKicker)}>Step 1</span>
          <h2 {...stylex.props(styles.sectionTitle)}>기본 정보</h2>
        </div>
        <Hb.TextField
          label="보호소 이름"
          placeholder="예: 행복 유기동물 보호소"
          value={form.name}
          onChange={(event) => setField("name", event.target.value)}
          fullWidth
        />
        <div>
          <Hb.TextField
            label="보호소 프로필 주소"
            placeholder="haengbok-shelter"
            value={form.slug}
            onChange={(event) => setField("slug", event.target.value)}
            error={slugInvalid}
            helperText={slugInvalid ? "소문자·숫자·하이픈만, 3~40자로 입력하세요." : undefined}
            fullWidth
          />
          <p {...stylex.props(styles.slugPreview)}>
            angel.hobom/shelters/
            <span {...stylex.props(styles.slugValue)}>{form.slug || "haengbok-shelter"}</span>
          </p>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.sectionHead)}>
          <span {...stylex.props(styles.sectionKicker)}>Step 2</span>
          <h2 {...stylex.props(styles.sectionTitle)}>주소</h2>
        </div>
        <div {...stylex.props(styles.row)}>
          <Hb.TextField
            label="시·도"
            placeholder="서울"
            value={form.region}
            onChange={(event) => setField("region", event.target.value)}
            fullWidth
          />
          <Hb.TextField
            label="시·군·구"
            placeholder="강남구"
            value={form.city}
            onChange={(event) => setField("city", event.target.value)}
            fullWidth
          />
        </div>
        <Hb.TextField
          label="도로명 주소"
          placeholder="테헤란로 1"
          value={form.roadAddress}
          onChange={(event) => setField("roadAddress", event.target.value)}
          fullWidth
        />
        <div>
          <span {...stylex.props(styles.fieldLabel)}>주소 공개 범위</span>
          <Hb.ToggleButtonGroup variant="segmented" aria-label="주소 공개 범위">
            {VISIBILITIES.map((visibility) => (
              <Hb.ToggleButton
                key={visibility}
                variant="segmented"
                value={visibility}
                selected={form.visibility === visibility}
                onChange={() => setField("visibility", visibility)}
              >
                {ADDRESS_VISIBILITY_LABEL[visibility]}
              </Hb.ToggleButton>
            ))}
          </Hb.ToggleButtonGroup>
          <p {...stylex.props(styles.hint)}>{ADDRESS_VISIBILITY_HINT[form.visibility]}</p>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.sectionHead)}>
          <span {...stylex.props(styles.sectionKicker)}>Step 3</span>
          <h2 {...stylex.props(styles.sectionTitle)}>인증 정보</h2>
          <p {...stylex.props(styles.sectionNote)}>
            선택이지만, 입력하면 검증이 더 빠르게 진행돼요.
          </p>
        </div>
        <Hb.TextField
          label="동물보호센터 등록번호"
          placeholder="예: 서울-2026-0001"
          value={form.registrationNumber}
          onChange={(event) => setField("registrationNumber", event.target.value)}
          fullWidth
        />
        <Hb.TextField
          label="사업자·고유번호 (숫자 10자리)"
          placeholder="1234567890"
          value={form.businessNumber}
          onChange={(event) => setField("businessNumber", event.target.value.replace(/\D/g, ""))}
          fullWidth
        />
      </section>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.sectionHead)}>
          <span {...stylex.props(styles.sectionKicker)}>Step 4</span>
          <h2 {...stylex.props(styles.sectionTitle)}>시설 사진</h2>
          <p {...stylex.props(styles.sectionNote)}>
            선택이지만, 보호소 외부·내부 사진을 올리면 검증이 더 빠르게 진행돼요.
          </p>
        </div>
        <ImageUploader
          images={photos}
          onAdd={addPhotos}
          onRemove={removePhoto}
          uploading={uploadingPhotos}
          max={8}
        />
      </section>

      <Hb.Button
        variant="primary"
        fullWidth
        onClick={submit}
        disabled={!canSubmit}
        loading={submitting}
      >
        등록 신청하기
      </Hb.Button>
      </div>
    </div>
  );
};
