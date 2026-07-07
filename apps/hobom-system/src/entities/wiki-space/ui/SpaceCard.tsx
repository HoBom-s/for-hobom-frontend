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

const styles = stylex.create({
  menuButton: {
    position: "absolute",
    top: 8,
    right: 8,
    opacity: 0,
    transition: "opacity 0.15s ease",
    backgroundColor: "var(--hb-color-surface)",
    // grey.100 has no design-token equivalent; MUI default #f5f5f5.
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
    <Hb.Card.Clickable
      onClick={() => onClick(space.key)}
      sx={{
        borderRadius: 2,
        transition: "box-shadow 0.15s",
        position: "relative",
        "&:hover": { boxShadow: 3 },
        "&:hover .space-card-menu": { opacity: 1 },
      }}
    >
      <Hb.Card.Content sx={{ p: 2.5 }}>
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
                <Hb.List.ItemText sx={{ color: "error.main" }}>삭제</Hb.List.ItemText>
              </Hb.Menu.Item>
            )}
          </Hb.Menu.Root>
        </>
      )}
    </Hb.Card.Clickable>
  );
};
