import * as stylex from "@stylexjs/stylex";
import { STATS } from "../model/landing.fixtures";
import { styles } from "./StatsSection.styles";

export const StatsSection = () => (
  <section {...stylex.props(styles.section)}>
    <div {...stylex.props(styles.card)}>
      {STATS.map((stat, index) => (
        <div key={stat.label} {...stylex.props(styles.item, index === 0 && styles.itemFirst)}>
          <div {...stylex.props(styles.value)}>{stat.value}</div>
          <div {...stylex.props(styles.label)}>{stat.label}</div>
        </div>
      ))}
    </div>
  </section>
);
