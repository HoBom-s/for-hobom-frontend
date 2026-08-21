// Claude Design의 홈 히어로를 프로젝트 라우팅과 로컬 이미지로 구현하는 섹션
import { Fragment } from "react";
import { useNavigate } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ArrowForwardOutlined } from "hobom-design-system/icons";
import { ROUTES } from "@/shared/config";
import { HERO } from "../model/landing.fixtures";
import { styles } from "./HeroSection.styles";
import heroAdoptionFamily from "./assets/hero-adoption-family.png";

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
              src={heroAdoptionFamily}
              width={558}
              height={482}
              alt={HERO.imageAlt}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              {...stylex.props(styles.photo)}
            />
          </div>
        </figure>
      </div>
    </section>
  );
};
