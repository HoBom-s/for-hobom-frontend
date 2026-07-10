import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { MenuOutlined } from "../../icons";
import { Box } from "../../components/Box/Box";
import { Button } from "../../components/Button/Button";
import { Divider } from "../../components/Divider/Divider";
import { Text } from "../../components/Text/Text";
import { APPBAR_HEIGHT } from "../../foundations/layout";

interface AppBarProps {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  activeLabel: string;
  action?: ReactNode;
}

const styles = stylex.create({
  brand: {
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: { default: "var(--hb-color-text-secondary)", ":hover": "var(--hb-color-accent)" },
    cursor: "pointer",
  },
});

export const AppBar = ({ drawerOpen, onToggleDrawer, activeLabel, action }: AppBarProps) => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: APPBAR_HEIGHT,
        zIndex: 1301,
        backgroundColor: "var(--hb-color-chrome)",
        color: "var(--hb-color-text-primary)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          paddingInline: 24,
          gap: 16,
        }}
      >
        <Button.Icon
          aria-label="사이드바 토글"
          aria-expanded={drawerOpen}
          onClick={onToggleDrawer}
          size="small"
          edge="start"
          style={{ color: "var(--hb-color-text-secondary)" }}
        >
          <MenuOutlined sx={{ fontSize: 20 }} />
        </Button.Icon>
        <span onClick={() => navigate("/")} {...stylex.props(styles.brand)}>
          HoBom System
        </span>
        <Divider orientation="vertical" flexItem style={{ marginBlock: 12 }} />
        <Text variant="body1" style={{ fontWeight: 600, color: "var(--hb-color-text-primary)" }}>
          {activeLabel}
        </Text>

        {action && (
          <>
            <Box style={{ flex: 1 }} />
            {action}
          </>
        )}
      </div>
    </header>
  );
};
