import { NavLink } from "react-router";
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
        {({ isActive }) => (
          <>
            <span {...stylex.props(styles.tabIconWrap, isActive && styles.tabIconWrapActive)}>
              <tab.Icon fontSize="small" aria-hidden />
            </span>
            {tab.label}
          </>
        )}
      </NavLink>
    ))}
  </nav>
);
