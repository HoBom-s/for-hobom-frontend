// Claude Design의 세 단계 입양 과정을 부드러운 녹색 패널로 구현하는 섹션
import * as stylex from "@stylexjs/stylex";
import { STEPS } from "../model/landing.fixtures";
import { styles } from "./HowItWorksSection.styles";

export const HowItWorksSection = () => (
  <section {...stylex.props(styles.section)} id="how" aria-labelledby="how-it-works-title">
    <div {...stylex.props(styles.inner)}>
      <h2 id="how-it-works-title" {...stylex.props(styles.title)}>
        입양은 이렇게 진행돼요
      </h2>
      <ol {...stylex.props(styles.steps)}>
        {STEPS.map((step) => (
          <li key={step.n} {...stylex.props(styles.step)}>
            <span {...stylex.props(styles.num)}>{step.n}</span>
            <h3 {...stylex.props(styles.stepTitle)}>{step.title}</h3>
            <p {...stylex.props(styles.desc)}>{step.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
