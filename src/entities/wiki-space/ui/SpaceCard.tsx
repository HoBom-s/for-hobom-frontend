import { type MouseEvent } from "react";
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  ArticleOutlined,
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import type { SpaceType } from "../api/wiki-space.type";

interface SpaceCardProps {
  space: SpaceType;
  onClick: (key: string) => void;
  onEdit?: (space: SpaceType) => void;
  onDelete?: (space: SpaceType) => void;
}

export const SpaceCard = ({
  space,
  onClick,
  onEdit,
  onDelete,
}: SpaceCardProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        transition: "box-shadow 0.15s",
        position: "relative",
        "&:hover": { boxShadow: 3 },
        "&:hover .space-card-menu": { opacity: 1 },
      }}
    >
      <CardActionArea onClick={() => onClick(space.key)} sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArticleOutlined sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={700} noWrap>
              {space.name}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {space.key}
            </Typography>
          </Box>
        </Box>
        {space.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.8125rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {space.description}
          </Typography>
        )}
      </CardActionArea>

      {(onEdit || onDelete) && (
        <>
          <IconButton
            className="space-card-menu"
            size="small"
            aria-label="메뉴"
            onClick={handleMenuOpen}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              opacity: 0,
              transition: "opacity 0.15s ease",
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            <MoreVertOutlined sx={{ fontSize: 16 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {onEdit && (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onEdit(space);
                }}
              >
                <ListItemIcon>
                  <EditOutlined fontSize="small" />
                </ListItemIcon>
                <ListItemText>수정</ListItemText>
              </MenuItem>
            )}
            {onDelete && (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  onDelete(space);
                }}
              >
                <ListItemIcon>
                  <DeleteOutlined fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: "error.main" }}>삭제</ListItemText>
              </MenuItem>
            )}
          </Menu>
        </>
      )}
    </Card>
  );
};
