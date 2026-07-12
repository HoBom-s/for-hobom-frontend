import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./SignupFunnel.styles";

export const DoneStep = () => {
  const navigate = useNavigate();

  return (
    <div {...stylex.props(styles.step, styles.done)}>
      <span {...stylex.props(styles.doneCheck)} aria-hidden="true">
        ✓
      </span>
      <h2 {...stylex.props(styles.title)}>가입 완료</h2>
      <p {...stylex.props(styles.subtitle)}>이제 새로운 가족을 만나볼 수 있어요.</p>
      <Hb.Button
        variant="primary"
        fullWidth
        onClick={() => navigate("/")}
        {...stylex.props(styles.submit)}
      >
        동물 둘러보기
      </Hb.Button>
    </div>
  );
};
