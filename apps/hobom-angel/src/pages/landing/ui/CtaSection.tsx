// 입양 여정의 다음 행동을 편집형 문장과 단일 버튼으로 제안하는 섹션
import { useNavigate } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ArrowForwardOutlined } from "hobom-design-system/icons";
import { ROUTES } from "@/shared/config";
import { CTA } from "../model/landing.fixtures";
import { styles } from "./CtaSection.styles";

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section {...stylex.props(styles.section)} aria-labelledby="landing-cta-title">
      <div {...stylex.props(styles.inner)}>
        <div {...stylex.props(styles.copy)}>
          <span {...stylex.props(styles.kicker)}>03 / 다음 장</span>
          <h2 id="landing-cta-title" {...stylex.props(styles.title)}>
            {CTA.title}
          </h2>
          <p {...stylex.props(styles.lead)}>{CTA.lead}</p>
        </div>
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
          {CTA.button}
        </Hb.Button>
      </div>
    </section>
  );
};
