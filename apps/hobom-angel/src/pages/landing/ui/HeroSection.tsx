import { Fragment } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { HERO } from "../model/landing.fixtures";
import { styles } from "./HeroSection.styles";

export const HeroSection = () => (
  <section {...stylex.props(styles.section)} id="top">
    <div {...stylex.props(styles.inner)}>
      <span {...stylex.props(styles.badge)}>{HERO.badge}</span>
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
        <Hb.Button variant="primary">
          {HERO.primary}
        </Hb.Button>
        <Hb.Button variant="secondary">
          {HERO.secondary}
        </Hb.Button>
      </div>
    </div>
  </section>
);
