// Claude Design의 커버 사진·신뢰등급·지역 정보 구조를 구현하는 보호소 카드
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { LocationOnOutlined } from "hobom-design-system/icons";
import { shelterPath } from "@/shared/config";
import { styles } from "./ShelterCard.styles";
import shelterFallback from "./assets/shelter-fallback.jpg";
import type { ShelterListItem } from "../model/shelter.model";

interface ShelterCardProps {
  shelter: ShelterListItem;
}

export const ShelterCard = ({ shelter }: ShelterCardProps) => {
  const { name, slug, region, trustTier, coverImageUrl } = shelter;

  return (
    <Link to={shelterPath(slug)} {...stylex.props(styles.link)} aria-label={`${name} 보호소 보기`}>
      <div {...stylex.props(styles.card)}>
        <Hb.Image
          src={coverImageUrl ?? shelterFallback}
          alt={coverImageUrl ? name : ""}
          ratio="16 / 8"
          fallback={
            <img src={shelterFallback} alt="" {...stylex.props(styles.fallbackImage)} />
          }
        />
        <div {...stylex.props(styles.body)}>
          <div {...stylex.props(styles.nameRow)}>
            <h3 {...stylex.props(styles.name)}>{name}</h3>
            <span {...stylex.props(styles.tier)}>
              {trustTier ? `신뢰등급 ${trustTier}` : "검증 완료"}
            </span>
          </div>
          <p {...stylex.props(styles.region)}>
            <LocationOnOutlined style={{ fontSize: 15 }} aria-hidden />
            {region}
          </p>
        </div>
      </div>
    </Link>
  );
};
