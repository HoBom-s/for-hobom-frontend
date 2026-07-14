import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { Favorite, FavoriteBorder } from "hobom-design-system/icons";
import { SEX_LABEL, SIZE_LABEL, STATUS_LABEL, formatAge } from "@/entities/animal";
import { applyPath } from "@/shared/config";
import { useToast } from "@/shared/model";
import type { AnimalDetail } from "@/entities/animal";
import { applyCta } from "../lib/apply-cta.lib";
import { styles } from "./ApplyCard.styles";

const STATUS_COLOR = {
  입양가능: "primary",
  예약중: "warning",
  임보중: "secondary",
  입양완료: "success",
  반환: "default",
} as const;

const COMING_SOON = "곧 제공될 예정이에요.";

/** Sticky application panel with status-branched CTAs (§02). Apply/foster and
 *  inquiry are placeholders until the funnel and inquiry threads land. */
export const ApplyCard = ({ animal }: { animal: AnimalDetail }) => {
  const navigate = useNavigate();
  const { openWarnToast } = useToast();
  const [bookmarked, setBookmarked] = useState(false);

  const cta = applyCta(animal.status);
  const statusLabel = STATUS_LABEL[animal.status];
  const age = animal.ageMonths != null ? `${formatAge(animal.ageMonths)}(추정)` : "나이 미상";
  const meta = [animal.breed, age, SIZE_LABEL[animal.size], SEX_LABEL[animal.sex]]
    .filter(Boolean)
    .join(" · ");

  const badges = [
    animal.health.neutered ? "중성화 완료" : null,
    animal.health.vaccinated ? "접종 완료" : null,
    animal.health.microchipId ? "마이크로칩" : null,
  ].filter((badge): badge is string => badge !== null);

  const notReady = () => openWarnToast({ message: COMING_SOON });

  return (
    <aside {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.nameRow)}>
        <h1 {...stylex.props(styles.name)}>{animal.name}</h1>
        <Hb.Chip label={statusLabel} size="small" variant="soft" color={STATUS_COLOR[statusLabel]} />
      </div>
      <p {...stylex.props(styles.meta)}>{meta}</p>

      {badges.length > 0 && (
        <div {...stylex.props(styles.badges)}>
          {badges.map((label) => (
            <span key={label} {...stylex.props(styles.badge)}>
              {label}
            </span>
          ))}
        </div>
      )}

      <div {...stylex.props(styles.ctas)}>
        <Hb.Button
          variant="primary"
          fullWidth
          disabled={!cta.primaryEnabled}
          onClick={() => navigate(applyPath(animal.id))}
        >
          {cta.primaryLabel}
        </Hb.Button>
        {cta.showFoster && (
          <Hb.Button variant="secondary" fullWidth onClick={notReady}>
            임시보호 신청
          </Hb.Button>
        )}

        <div {...stylex.props(styles.secondaryRow)}>
          <button
            type="button"
            aria-label="관심 동물"
            aria-pressed={bookmarked}
            {...stylex.props(styles.iconAction, bookmarked && styles.bookmarkOn)}
            onClick={() => setBookmarked((on) => !on)}
          >
            {bookmarked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
            관심
          </button>
          <button type="button" {...stylex.props(styles.inquiry)} onClick={notReady}>
            보호소에 문의하기 →
          </button>
        </div>
      </div>
    </aside>
  );
};
