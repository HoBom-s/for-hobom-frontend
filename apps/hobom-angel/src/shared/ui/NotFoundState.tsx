import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
import { styles } from "./NotFoundState.styles";

/** 404 route state matching the design's not-found card. */
export const NotFoundState = () => {
  const navigate = useNavigate();

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.code)}>404</div>
      <h2 {...stylex.props(styles.title)}>페이지를 찾을 수 없어요</h2>
      <p {...stylex.props(styles.desc)}>주소가 바뀌었거나 삭제된 동물일 수 있어요.</p>
      <div {...stylex.props(styles.actions)}>
        <Hb.Button variant="primary" onClick={() => navigate(ROUTES.HOME)}>
          홈으로
        </Hb.Button>
        <Hb.Button variant="secondary" onClick={() => navigate(ROUTES.HOME)}>
          동물 탐색
        </Hb.Button>
      </div>
    </div>
  );
};
