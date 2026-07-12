import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { CTA } from "../model/landing.fixtures";
import { styles } from "./CtaSection.styles";

export const CtaSection = () => (
  <section {...stylex.props(styles.section)}>
    <div {...stylex.props(styles.inner)}>
      <h2 {...stylex.props(styles.title)}>{CTA.title}</h2>
      <p {...stylex.props(styles.lead)}>{CTA.lead}</p>
      <Hb.Button style={{ backgroundColor: "#ffffff", color: "var(--hb-color-accent-dark)" }}>
        {CTA.button}
      </Hb.Button>
    </div>
  </section>
);
