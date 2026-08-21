// Claude Design 홈에서 가족을 기다리는 대표 동물 네 마리를 소개하는 섹션
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { FavoriteBorder, LocationOnOutlined } from "hobom-design-system/icons";
import { animalDetailPath, ROUTES } from "@/shared/config";
import { FEATURED } from "../model/landing.fixtures";
import { styles } from "./FeaturedAnimalsSection.styles";

export const FeaturedAnimalsSection = () => (
  <section {...stylex.props(styles.section)} aria-labelledby="featured-animals-title">
    <div {...stylex.props(styles.head)}>
      <h2 id="featured-animals-title" {...stylex.props(styles.title)}>
        지금 기다리는 친구들
      </h2>
      <Link to={ROUTES.ANIMALS} {...stylex.props(styles.more)}>
        전체 보기 →
      </Link>
    </div>
    <div {...stylex.props(styles.grid)}>
      {FEATURED.map((animal) => (
        <Link
          key={animal.id}
          to={animalDetailPath(animal.id)}
          {...stylex.props(styles.card)}
          aria-label={`${animal.name} 상세 보기`}
        >
          <div {...stylex.props(styles.media)}>
            <span {...stylex.props(styles.mediaLabel)} aria-hidden="true">
              PHOTO
            </span>
            <span
              {...stylex.props(
                styles.status,
                animal.status === "입양 진행중" && styles.statusReserved,
              )}
            >
              {animal.status}
            </span>
            <span {...stylex.props(styles.favorite)} aria-hidden="true">
              <FavoriteBorder style={{ fontSize: 18 }} />
            </span>
          </div>
          <div {...stylex.props(styles.body)}>
            <h3 {...stylex.props(styles.name)}>{animal.name}</h3>
            <p {...stylex.props(styles.meta)}>{animal.meta}</p>
            <p {...stylex.props(styles.where)}>
              <LocationOnOutlined style={{ fontSize: 15 }} aria-hidden />
              {animal.where}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
