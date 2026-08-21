import * as stylex from "@stylexjs/stylex";
import { STATS } from "../model/landing.fixtures";
import { styles } from "./StatsSection.styles";

export const StatsSection = () => (
  <section {...stylex.props(styles.section)} aria-label="호봄엔젤 누적 성과">
    <dl {...stylex.props(styles.card)}>
      {STATS.map((stat, index) => (
        <div key={stat.label} {...stylex.props(styles.item, index === 0 && styles.itemFirst)}>
          <dt {...stylex.props(styles.label)}>{stat.label}</dt>
          <dd {...stylex.props(styles.value)}>{stat.value}</dd>
        </div>
      ))}
    </dl>
  </section>
);
