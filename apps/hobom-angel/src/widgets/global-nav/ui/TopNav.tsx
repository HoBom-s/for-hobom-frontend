import { Link, NavLink, useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { NotificationsNoneOutlined } from "hobom-design-system/icons";
import { ROUTES } from "@/shared/config";
import type { CurrentUser } from "@/entities/user";
import { PRIMARY_NAV } from "../model/nav-items";
import { activeLinkProps } from "./nav-link-props";
import { NavSearch } from "./NavSearch";
import { ProfileMenu } from "./ProfileMenu";
import { styles } from "./GlobalNav.styles";

interface TopNavProps {
  user?: CurrentUser;
  isAuthenticated: boolean;
}

/** Sticky top bar (§0.5): brand + (auth) sections/search/notifications/profile,
 *  or (guest) just the auth entry. */
export const TopNav = ({ user, isAuthenticated }: TopNavProps) => {
  const navigate = useNavigate();

  return (
    <header {...stylex.props(styles.topbar)}>
      <div {...stylex.props(styles.topInner)}>
        <Link to={ROUTES.HOME} {...stylex.props(styles.brand)}>
          🐾 호봄엔젤
        </Link>

        {isAuthenticated && user ? (
          <>
            <nav {...stylex.props(styles.primaryNav)}>
              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  {...activeLinkProps(styles.navLink, styles.navLinkActive)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <span {...stylex.props(styles.spacer)} />

            <NavSearch />
            <button type="button" {...stylex.props(styles.iconBtn)} aria-label="알림">
              <NotificationsNoneOutlined fontSize="small" />
            </button>
            <ProfileMenu nickname={user.nickname} />
          </>
        ) : (
          <>
            <span {...stylex.props(styles.spacer)} />
            <div {...stylex.props(styles.actions)}>
              <Hb.Button variant="ghost" size="small" onClick={() => navigate(ROUTES.LOGIN)}>
                로그인
              </Hb.Button>
              <Hb.Button variant="primary" size="small" onClick={() => navigate(ROUTES.SIGNUP)}>
                회원가입
              </Hb.Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
