import { NavLink } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { ROUTES } from "@/shared/config";
import { BOTTOM_TABS } from "../model/nav-items";
import { activeLinkProps } from "./nav-link-props";
import { styles } from "./GlobalNav.styles";

/** Mobile bottom tab bar (§0.5) — signed-in only, icon over label. */
export const BottomTab = () => (
  <nav {...stylex.props(styles.bottomTab)} aria-label="하단 탭">
    {BOTTOM_TABS.map((tab) => (
      <NavLink
        key={tab.to}
        to={tab.to}
        end={tab.to === ROUTES.HOME}
        {...activeLinkProps(styles.tab, styles.tabActive)}
      >
        <tab.Icon fontSize="small" aria-hidden />
        {tab.label}
      </NavLink>
    ))}
  </nav>
);
