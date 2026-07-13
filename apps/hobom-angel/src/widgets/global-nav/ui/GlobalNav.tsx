import type { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { useCurrentUser } from "@/entities/user";
import { TopNav } from "./TopNav";
import { BottomTab } from "./BottomTab";
import { styles } from "./GlobalNav.styles";

/**
 * Consumer app chrome (§0.5): a sticky top nav on desktop and a top bar + bottom
 * tab bar on mobile. Branches on the session — guests get only the auth entry.
 */
export const GlobalNav = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useCurrentUser();

  return (
    <div {...stylex.props(styles.shell)}>
      <TopNav user={user} isAuthenticated={isAuthenticated} />
      <main {...stylex.props(styles.content)}>{children}</main>
      {isAuthenticated && <BottomTab />}
    </div>
  );
};
