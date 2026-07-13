import { useState } from "react";
import { Link } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { useLogout } from "@/features/session";
import { PROFILE_MENU } from "../model/nav-items";
import { styles } from "./GlobalNav.styles";

/** Profile dropdown for a signed-in user: nav shortcuts + logout. */
export const ProfileMenu = ({ nickname }: { nickname: string }) => {
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
