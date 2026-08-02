import { useNavigate } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
import { CTA } from "../model/landing.fixtures";
import { styles } from "./CtaSection.styles";

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.inner)}>
        <h2 {...stylex.props(styles.title)}>{CTA.title}</h2>
        <p {...stylex.props(styles.lead)}>{CTA.lead}</p>
        <Hb.Button
          style={{ backgroundColor: "#ffffff", color: "var(--hb-color-accent-dark)" }}
          onClick={() => navigate(ROUTES.ANIMALS)}
        >
          {CTA.button}
        </Hb.Button>
      </div>
    </section>
  );
};
