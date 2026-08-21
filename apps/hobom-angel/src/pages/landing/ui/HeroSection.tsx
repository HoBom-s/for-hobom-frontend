// 보호소 기록지 스타일의 랜딩 히어로를 구성하는 섹션
import { Fragment } from "react";
import { useNavigate } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ArrowForwardOutlined } from "hobom-design-system/icons";
import { ROUTES } from "@/shared/config";
import { HERO } from "../model/landing.fixtures";
import { styles } from "./HeroSection.styles";
import heroAnimals720 from "./assets/hero-animals-720.jpg";
import heroAnimals1200 from "./assets/hero-animals-1200.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section {...stylex.props(styles.section)} id="top">
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.meta)} aria-label="호봄엔젤 저널 정보">
          <span>{HERO.issue}</span>
          <span>{HERO.edition}</span>
        </div>

        <div {...stylex.props(styles.heroGrid)}>
          <div {...stylex.props(styles.copy)}>
            <h1 {...stylex.props(styles.title)}>
              {HERO.title.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && <br />}
                  <span {...stylex.props(index > 0 && styles.titleAccent)}>{line}</span>
                </Fragment>
              ))}
            </h1>
            <p {...stylex.props(styles.lead)}>{HERO.lead}</p>
            <div {...stylex.props(styles.cta)}>
              <Hb.Button
                size="large"
                endIcon={<ArrowForwardOutlined style={{ fontSize: 19 }} />}
                style={{
                  borderRadius: 0,
                  backgroundColor: "var(--hb-color-text-primary)",
                  color: "var(--hb-color-surface)",
                }}
                onClick={() => navigate(ROUTES.ANIMALS)}
              >
                {HERO.primary}
              </Hb.Button>
              <Hb.Button
                variant="ghost"
                size="large"
                style={{ borderRadius: 0 }}
                onClick={() => navigate(ROUTES.FOSTER)}
              >
                {HERO.secondary}
              </Hb.Button>
            </div>
          </div>

          <figure {...stylex.props(styles.visual)}>
            <div {...stylex.props(styles.photoFrame)}>
              <img
                src={heroAnimals720}
                srcSet={`${heroAnimals720} 720w, ${heroAnimals1200} 1200w`}
                sizes="(min-width: 960px) 440px, calc(100vw - 32px)"
                width={1200}
                height={900}
                alt={HERO.imageAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                {...stylex.props(styles.photo)}
              />
              <div
                {...stylex.props(styles.countBlock)}
                aria-label={`${HERO.waitingCount}마리 대기 중`}
              >
                <strong {...stylex.props(styles.countValue)}>{HERO.waitingCount}</strong>
                <span {...stylex.props(styles.countLabel)}>마리 대기 중</span>
              </div>
            </div>
            <figcaption {...stylex.props(styles.caption)}>{HERO.imageCaption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
