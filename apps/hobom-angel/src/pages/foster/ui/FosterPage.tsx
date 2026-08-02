import { Fragment } from "react";
import { useNavigate } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
import {
  FOSTER_COMPARE,
  FOSTER_CTA,
  FOSTER_HERO,
  FOSTER_STEPS,
  FOSTER_TERMS,
} from "../model/foster.fixtures";
import { styles } from "./FosterPage.styles";

/** §임시보호 알아보기 — a public explainer for fostering. There is no separate
 *  foster catalog (foster is applied per-animal from the animal detail), so this
 *  informs and then sends visitors to the animal list to apply. */
export const FosterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <section {...stylex.props(styles.hero)}>
        <div {...stylex.props(styles.heroInner)}>
          <span {...stylex.props(styles.badge)}>{FOSTER_HERO.badge}</span>
          <h1 {...stylex.props(styles.title)}>
            {FOSTER_HERO.title.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </h1>
          <p {...stylex.props(styles.lead)}>{FOSTER_HERO.lead}</p>
        </div>
      </section>

      <section {...stylex.props(styles.section, styles.altSection)}>
        <div {...stylex.props(styles.inner)}>
          <header {...stylex.props(styles.head)}>
            <h2 {...stylex.props(styles.sectionTitle)}>입양과 무엇이 다를까요</h2>
            <p {...stylex.props(styles.sectionSub)}>
              임시보호는 짧게 머무는 돌봄, 입양은 평생의 약속이에요.
            </p>
          </header>
          <div {...stylex.props(styles.compareGrid)}>
            {FOSTER_COMPARE.map((item) => (
              <div key={item.tag} {...stylex.props(styles.card)}>
                <span {...stylex.props(styles.tag)}>{item.tag}</span>
                <h3 {...stylex.props(styles.cardTitle)}>{item.title}</h3>
                <p {...stylex.props(styles.cardDesc)}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.inner)}>
          <header {...stylex.props(styles.head)}>
            <h2 {...stylex.props(styles.sectionTitle)}>이렇게 진행돼요</h2>
            <p {...stylex.props(styles.sectionSub)}>신청부터 임보 시작까지, 한 걸음씩 안내할게요.</p>
          </header>
          <ol {...stylex.props(styles.grid)}>
            {FOSTER_STEPS.map((step) => (
              <li key={step.n} {...stylex.props(styles.card)}>
                <span {...stylex.props(styles.num)}>{step.n}</span>
                <h3 {...stylex.props(styles.cardTitle)}>{step.title}</h3>
                <p {...stylex.props(styles.cardDesc)}>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section {...stylex.props(styles.section, styles.altSection)}>
        <div {...stylex.props(styles.inner)}>
          <header {...stylex.props(styles.head)}>
            <h2 {...stylex.props(styles.sectionTitle)}>기간은 어떻게 정하나요</h2>
            <p {...stylex.props(styles.sectionSub)}>
              상황에 맞게 유연하게, 종료 전에는 미리 알려드려요.
            </p>
          </header>
          <ul {...stylex.props(styles.grid)}>
            {FOSTER_TERMS.map((term) => (
              <li key={term.title} {...stylex.props(styles.card)}>
                <h3 {...stylex.props(styles.cardTitle)}>{term.title}</h3>
                <p {...stylex.props(styles.cardDesc)}>{term.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section {...stylex.props(styles.section)}>
        <div {...stylex.props(styles.ctaInner)}>
          <h2 {...stylex.props(styles.ctaTitle)}>{FOSTER_CTA.title}</h2>
          <p {...stylex.props(styles.ctaLead)}>{FOSTER_CTA.lead}</p>
          <Hb.Button
            style={{ backgroundColor: "#ffffff", color: "var(--hb-color-accent-dark)" }}
            onClick={() => navigate(ROUTES.ANIMALS)}
          >
            {FOSTER_CTA.button}
          </Hb.Button>
        </div>
      </section>
    </>
  );
};
