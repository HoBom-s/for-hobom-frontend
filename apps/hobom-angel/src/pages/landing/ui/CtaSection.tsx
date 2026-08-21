// Claude Design의 녹색 그라디언트와 따뜻한 행동 버튼을 구현하는 홈 CTA
import { useNavigate } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
import { CTA } from "../model/landing.fixtures";
import { styles } from "./CtaSection.styles";

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section {...stylex.props(styles.section)} aria-labelledby="landing-cta-title">
      <div {...stylex.props(styles.inner)}>
        <h2 id="landing-cta-title" {...stylex.props(styles.title)}>
          {CTA.title}
        </h2>
        <p {...stylex.props(styles.lead)}>{CTA.lead}</p>
        <Hb.Button
          shape="pill"
          size="large"
          style={{
            marginTop: 26,
            backgroundColor: "var(--hb-angel-accent-warm)",
            color: "var(--hb-angel-accent-warm-contrast)",
          }}
          onClick={() => navigate(ROUTES.ANIMALS)}
        >
          {CTA.button}
        </Hb.Button>
      </div>
    </section>
  );
};
