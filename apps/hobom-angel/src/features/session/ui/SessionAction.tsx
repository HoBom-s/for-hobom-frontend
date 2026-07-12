import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
import { useCurrentUser } from "@/entities/user";
import { styles } from "./SessionAction.styles";

/** Header action: greets the signed-in user, a login button for guests, and a
 *  skeleton while the session is still being determined. */
export const SessionAction = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <span {...stylex.props(styles.skeleton)} aria-hidden="true" />;
  }

  if (isAuthenticated && user) {
    return <Hb.Chip label={`${user.nickname}님`} size="small" variant="soft" color="primary" />;
  }

  return (
    <Hb.Button variant="ghost" size="small" onClick={() => navigate(ROUTES.LOGIN)}>
      로그인
    </Hb.Button>
  );
};
