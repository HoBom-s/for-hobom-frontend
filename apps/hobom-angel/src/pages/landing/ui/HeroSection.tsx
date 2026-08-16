import { Fragment } from "react";
import { useNavigate } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
import { HERO } from "../model/landing.fixtures";
import { styles } from "./HeroSection.styles";

const PHOTO_MAIN = "https://picsum.photos/seed/hobom-hero-1/720/620";
const PHOTO_BACK = "https://picsum.photos/seed/hobom-hero-2/420/360";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section {...stylex.props(styles.section)} id="top">
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.copy)}>
          <span {...stylex.props(styles.kicker)}>
            <span {...stylex.props(styles.kickerDot)} aria-hidden />
            {HERO.badge}
          </span>
          <h1 {...stylex.props(styles.title)}>
            {HERO.title.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <p {...stylex.props(styles.lead)}>{HERO.lead}</p>
          <div {...stylex.props(styles.cta)}>
            <Hb.Button variant="primary" size="large" onClick={() => navigate(ROUTES.ANIMALS)}>
              {HERO.primary}
            </Hb.Button>
            <Hb.Button variant="secondary" size="large" onClick={() => navigate(ROUTES.FOSTER)}>
              {HERO.secondary}
            </Hb.Button>
          </div>
        </div>

        <div {...stylex.props(styles.gallery)} aria-hidden>
          <img src={PHOTO_BACK} alt="" {...stylex.props(styles.photo, styles.photoBack)} />
          <img src={PHOTO_MAIN} alt="" {...stylex.props(styles.photo, styles.photoMain)} />
          <div {...stylex.props(styles.proofChip)}>
            <span {...stylex.props(styles.proofValue)}>1,840</span>
            <span {...stylex.props(styles.proofLabel)}>가족을 찾았어요</span>
          </div>
        </div>
      </div>
    </section>
  );
};
