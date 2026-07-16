import { Link, useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ChevronRight, Favorite, FavoriteBorder, LocationOnOutlined } from "hobom-design-system/icons";
import { SEX_LABEL, SIZE_LABEL, STATUS_LABEL, formatAge } from "@/entities/animal";
import { applyPath, shelterPath } from "@/shared/config";
import { useToast } from "@/shared/model";
import type { AnimalDetail } from "@/entities/animal";
import { applyCta } from "../lib/apply-cta.lib";
import { styles } from "./ApplyCard.styles";

interface ApplyCardProps {
  animal: AnimalDetail;
  /** Whether the viewer has favorited this animal (owned by the container). */
  favorited: boolean;
  onToggleFavorite: () => void;
}

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
export const ApplyCard = ({ animal, favorited, onToggleFavorite }: ApplyCardProps) => {
  const navigate = useNavigate();
  const { openWarnToast } = useToast();

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
        <button
          type="button"
          aria-label={`${animal.name} 찜하기`}
          aria-pressed={favorited}
          {...stylex.props(styles.bookmark, favorited && styles.bookmarkOn)}
          onClick={onToggleFavorite}
        >
          {favorited ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
        </button>
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

      {animal.shelter && (
        <Link
          to={shelterPath(animal.shelter.slug)}
          {...stylex.props(styles.shelter)}
          aria-label={`${animal.shelter.name} 보호소 프로필 보기`}
        >
          <LocationOnOutlined fontSize="small" {...stylex.props(styles.shelterPin)} />
          <span {...stylex.props(styles.shelterInfo)}>
            <span {...stylex.props(styles.shelterName)}>{animal.shelter.name}</span>
            <span {...stylex.props(styles.shelterLoc)}>
              {[animal.shelter.region, animal.shelter.city].filter(Boolean).join(" ")}
            </span>
          </span>
          <ChevronRight fontSize="small" {...stylex.props(styles.shelterChevron)} />
        </Link>
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
        <button type="button" {...stylex.props(styles.inquiry)} onClick={notReady}>
          보호소에 문의하기
          <ChevronRight fontSize="small" />
        </button>
      </div>
    </aside>
  );
};
