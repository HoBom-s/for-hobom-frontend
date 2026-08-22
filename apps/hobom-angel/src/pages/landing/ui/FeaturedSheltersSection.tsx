// 공개 API로 불러온 검증 보호소를 랜딩에 소개하는 섹션
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ShelterCard } from "@/entities/shelter";
import { ROUTES } from "@/shared/config";
import { useFeaturedShelters } from "../model/useFeaturedShelters";
import { styles } from "./FeaturedSheltersSection.styles";

const SKELETONS = [0, 1, 2, 3];

export const FeaturedSheltersSection = () => {
  const { shelters, status } = useFeaturedShelters();

  // A teaser must never break the public landing: if the directory errors or
  // comes back empty the section drops out rather than showing a broken tile.
  if (status === "error" || (status === "success" && shelters.length === 0)) return null;

  return (
    <section {...stylex.props(styles.section)} aria-labelledby="featured-shelters-title">
      <div {...stylex.props(styles.head)}>
        <div>
          <h2 id="featured-shelters-title" {...stylex.props(styles.title)}>
            믿을 수 있는 보호소
          </h2>
          <p {...stylex.props(styles.lead)}>검증을 마친 보호소부터 둘러보세요.</p>
        </div>
        <Link to={ROUTES.SHELTERS} {...stylex.props(styles.more)}>
          전체 보기 →
        </Link>
      </div>

      {status === "pending" ? (
        <div {...stylex.props(styles.grid)} role="status" aria-label="보호소 불러오는 중">
          {SKELETONS.map((index) => (
            <div key={index} {...stylex.props(styles.skeletonCard)} aria-hidden="true">
              <Hb.Skeleton variant="rectangular" width="100%" style={{ aspectRatio: "16 / 8" }} />
              <div {...stylex.props(styles.skeletonBody)}>
                <Hb.Skeleton variant="rectangular" width="52%" height={15} />
                <Hb.Skeleton variant="rectangular" width="34%" height={12} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div {...stylex.props(styles.grid)}>
          {shelters.map((shelter) => (
            <ShelterCard key={shelter.id} shelter={shelter} />
          ))}
        </div>
      )}
    </section>
  );
};
