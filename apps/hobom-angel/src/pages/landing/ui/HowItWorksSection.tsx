// 입양 연결 과정을 편집형 번호 목록으로 보여주는 섹션
import * as stylex from "@stylexjs/stylex";
import { STEPS } from "../model/landing.fixtures";
import { styles } from "./HowItWorksSection.styles";

export const HowItWorksSection = () => (
  <section {...stylex.props(styles.section)} id="how">
    <div {...stylex.props(styles.inner)}>
      <header {...stylex.props(styles.head)}>
        <span {...stylex.props(styles.kicker)}>02 / 연결 과정</span>
        <h2 {...stylex.props(styles.title)}>만남까지 필요한 세 단계.</h2>
        <p {...stylex.props(styles.sub)}>빠르게 결정하기보다 서로를 충분히 확인하는 과정입니다.</p>
      </header>
      <ol {...stylex.props(styles.steps)}>
        {STEPS.map((step) => (
          <li key={step.n} {...stylex.props(styles.step)}>
            <span {...stylex.props(styles.num)}>0{step.n}</span>
            <h3 {...stylex.props(styles.stepTitle)}>{step.title}</h3>
            <p {...stylex.props(styles.desc)}>{step.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
