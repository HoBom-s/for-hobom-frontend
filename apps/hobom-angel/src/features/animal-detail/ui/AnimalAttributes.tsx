import * as stylex from "@stylexjs/stylex";
import { SEX_LABEL, SIZE_LABEL, formatAge } from "@/entities/animal";
import type { AnimalDetail } from "@/entities/animal";
import { styles } from "./AnimalAttributes.styles";

interface Attribute {
  label: string;
  value: string;
}

interface Section {
  title: string;
  items: Attribute[];
}

const joinOr = (parts: (string | null)[], fallback: string): string =>
  parts.filter(Boolean).join(" · ") || fallback;

/** ISO date (2026-03-11...) → 2026.03.11, without pulling in a date library. */
const formatDate = (iso: string): string => (iso ? iso.slice(0, 10).replaceAll("-", ".") : "정보 없음");

const buildSections = (animal: AnimalDetail): Section[] => [
  {
    title: "건강 정보",
    items: [
      { label: "중성화", value: animal.health.neutered ? "완료" : "미완료" },
      { label: "예방접종", value: animal.health.vaccinated ? "완료" : "미접종" },
      { label: "마이크로칩", value: animal.health.microchipId ? "등록됨" : "미등록" },
      { label: "특이사항", value: animal.health.notes ?? "없음" },
    ],
  },
  {
    title: "특성",
    items: [
      { label: "성격", value: animal.personality ?? "정보 없음" },
      {
        label: "크기·무게",
        value: joinOr(
          [SIZE_LABEL[animal.size], animal.weightKg != null ? `${animal.weightKg}kg` : null],
          "정보 없음",
        ),
      },
      { label: "품종·털색", value: joinOr([animal.breed, animal.color], "정보 없음") },
      { label: "나이·성별", value: `${formatAge(animal.ageMonths)} · ${SEX_LABEL[animal.sex]}` },
    ],
  },
  {
    title: "구조 이력",
    items: [
      { label: "입소일", value: formatDate(animal.intake.intakeDate) },
      { label: "구조 경위", value: animal.intake.rescueStory ?? "정보 없음" },
      { label: "공고번호", value: animal.intake.noticeNumber ?? "정보 없음" },
    ],
  },
];

/** Health, traits, and rescue history grids (design §02 AttributeGrid). */
export const AnimalAttributes = ({ animal }: { animal: AnimalDetail }) => (
  <div {...stylex.props(styles.root)}>
    {buildSections(animal).map((section) => (
      <section key={section.title} {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.title)}>{section.title}</h2>
        <div {...stylex.props(styles.list)}>
          {section.items.map((item) => (
            <div key={item.label} {...stylex.props(styles.item)}>
              <span {...stylex.props(styles.label)}>{item.label}</span>
              <span {...stylex.props(styles.value)}>{item.value}</span>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
);
