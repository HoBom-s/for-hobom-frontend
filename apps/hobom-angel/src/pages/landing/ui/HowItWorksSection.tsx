import * as stylex from "@stylexjs/stylex";
import { STEPS } from "../model/landing.fixtures";
import { styles } from "./HowItWorksSection.styles";

export const HowItWorksSection = () => (
  <section {...stylex.props(styles.section)} id="how">
    <div {...stylex.props(styles.inner)}>
      <header {...stylex.props(styles.head)}>
        <span {...stylex.props(styles.kicker)}>HOW IT WORKS</span>
        <h2 {...stylex.props(styles.title)}>이렇게 진행돼요</h2>
        <p {...stylex.props(styles.sub)}>복잡해 보이는 절차, 한 걸음씩 함께 안내할게요.</p>
      </header>
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
