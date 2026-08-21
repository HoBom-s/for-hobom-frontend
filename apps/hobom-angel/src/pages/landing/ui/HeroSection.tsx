// Claude Design의 홈 히어로를 프로젝트 라우팅과 로컬 이미지로 구현하는 섹션
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
        <div {...stylex.props(styles.copy)}>
          <span {...stylex.props(styles.kicker)}>
            <span {...stylex.props(styles.kickerDot)} aria-hidden="true" />
            {HERO.badge}
          </span>
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
              shape="pill"
              size="large"
              endIcon={<ArrowForwardOutlined style={{ fontSize: 19 }} />}
              onClick={() => navigate(ROUTES.ANIMALS)}
            >
              {HERO.primary}
            </Hb.Button>
            <Hb.Button
              variant="ghost"
              shape="pill"
              size="large"
              style={{
                backgroundColor: "var(--hb-angel-card)",
                color: "var(--hb-color-text-primary)",
                boxShadow: "var(--hb-angel-shadow-sm)",
              }}
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
              sizes="(min-width: 960px) 500px, calc(100vw - 40px)"
              width={1200}
              height={900}
              alt={HERO.imageAlt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              {...stylex.props(styles.photo)}
            />
          </div>
          <div {...stylex.props(styles.proofChip)} aria-label={`${HERO.waitingCount}마리 대기 중`}>
            <strong {...stylex.props(styles.proofValue)}>{HERO.waitingCount}</strong>
            <span {...stylex.props(styles.proofLabel)}>마리 대기 중</span>
          </div>
        </figure>
      </div>
    </section>
  );
};
