import type { MouseEvent } from "react";
import { useState } from "react";
import {
  ArticleOutlined,
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";
import type { SpaceType } from "../api/wiki-space.type";

// The hover-reveal of the inner menu button is a descendant selector, which
// atomic StyleX cannot express, so the card is styled via a scoped <style> tag.
// React 19 hoists and de-dupes it by `href`, so the rule is emitted once despite
// these cards rendering in a `.map`.
const CARD_CLASS = "space-card-clickable";
const CARD_CSS = `
.${CARD_CLASS} {
  border-radius: 16px;
  transition: box-shadow 0.15s;
  position: relative;
}
.${CARD_CLASS}:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04); }
.${CARD_CLASS}:hover .space-card-menu { opacity: 1; }
`;

const styles = stylex.create({
  menuButton: {
    position: "absolute",
    top: 8,
    right: 8,
    opacity: 0,
    transition: "opacity 0.15s ease",
    backgroundColor: "var(--hb-color-surface)",
    // A soft neutral surface tint with no exact design-token equivalent yet.
    ":hover": { backgroundColor: "#f5f5f5" },
  },
});

interface SpaceCardProps {
  space: SpaceType;
  onClick: (key: string) => void;
  onEdit?: (space: SpaceType) => void;
  onDelete?: (space: SpaceType) => void;
}

export const SpaceCard = ({ space, onClick, onEdit, onDelete }: SpaceCardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  // Combine the StyleX class with the parent-scoped "space-card-menu" hook class.
  const menuButtonProps = stylex.props(styles.menuButton);

  return (
    <>
      <style href={CARD_CLASS} precedence="default">
        {CARD_CSS}
      </style>
      <Hb.Card.Clickable onClick={() => onClick(space.key)} className={CARD_CLASS}>
        <Hb.Card.Content
          style={{
            padding: 20,
          }}
        >
          <Hb.Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <Hb.Box
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: "var(--hb-color-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArticleOutlined sx={{ color: "#fff", fontSize: 20 }} />
            </Hb.Box>
            <Hb.Box
              style={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Hb.Text variant="subtitle2" fontWeight={700} noWrap>
                {space.name}
              </Hb.Text>
              <Hb.Text variant="caption" color="text.disabled">
                {space.key}
              </Hb.Text>
            </Hb.Box>
          </Hb.Box>
          {space.description && (
            <Hb.Text
              variant="body2"
              color="text.secondary"
              style={{
                fontSize: "0.8125rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {space.description}
            </Hb.Text>
          )}
        </Hb.Card.Content>
        {(onEdit || onDelete) && (
          <>
            <Hb.Button.Icon
              {...menuButtonProps}
              className={`space-card-menu ${menuButtonProps.className ?? ""}`}
              size="small"
              aria-label="메뉴"
              onClick={handleMenuOpen}
            >
              <MoreVertOutlined sx={{ fontSize: 16 }} />
            </Hb.Button.Icon>
            <Hb.Menu.Root
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {onEdit && (
                <Hb.Menu.Item
                  onClick={() => {
                    handleMenuClose();
                    onEdit(space);
                  }}
                >
                  <Hb.List.ItemIcon>
                    <EditOutlined fontSize="small" />
                  </Hb.List.ItemIcon>
                  <Hb.List.ItemText>수정</Hb.List.ItemText>
                </Hb.Menu.Item>
              )}
              {onDelete && (
                <Hb.Menu.Item
                  onClick={() => {
                    handleMenuClose();
                    onDelete(space);
                  }}
                >
                  <Hb.List.ItemIcon>
                    <DeleteOutlined fontSize="small" color="error" />
                  </Hb.List.ItemIcon>
                  <Hb.List.ItemText style={{
                    color: "var(--hb-color-danger)"
                  }}>삭제</Hb.List.ItemText>
                </Hb.Menu.Item>
              )}
            </Hb.Menu.Root>
          </>
        )}
      </Hb.Card.Clickable>
    </>
  );
};
