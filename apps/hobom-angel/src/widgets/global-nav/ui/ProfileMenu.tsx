import { useState } from "react";
import { Link } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { useLogout } from "@/features/session";
import { ROUTES } from "@/shared/config";
import { PROFILE_MENU } from "../model/nav-items";
import { styles } from "./GlobalNav.styles";

interface ProfileMenuProps {
  nickname: string;
  /** Show the console shortcut — only for shelter staff. */
  staff?: boolean;
}

/** Profile dropdown for a signed-in user: nav shortcuts + logout (plus the
 *  console shortcut for shelter staff). */
export const ProfileMenu = ({ nickname, staff = false }: ProfileMenuProps) => {
  const [open, setOpen] = useState(false);
  const { mutate: logout } = useLogout();

  return (
    <div {...stylex.props(styles.profileWrap)}>
      <button type="button" {...stylex.props(styles.profileBtn)} onClick={() => setOpen((v) => !v)}>
        {nickname}님 ▾
      </button>

      {open && (
        <>
          <div {...stylex.props(styles.backdrop)} onClick={() => setOpen(false)} />
          <div {...stylex.props(styles.menu)} role="menu">
            {staff && (
              <>
                <Link
                  to={ROUTES.CONSOLE}
                  {...stylex.props(styles.menuItem)}
                  onClick={() => setOpen(false)}
                >
                  보호소 콘솔
                </Link>
                <div {...stylex.props(styles.menuDivider)} />
              </>
            )}
            {PROFILE_MENU.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                {...stylex.props(styles.menuItem)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div {...stylex.props(styles.menuDivider)} />
            <button
              type="button"
              {...stylex.props(styles.menuItem)}
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
};
