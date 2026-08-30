// 봉사 일정 카드를 넓이에 따라 한두 열로 배치하는 반응형 그리드
import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
    gap: 14,
  },
});
