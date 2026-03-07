import { Suspense, useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { CloseOutlined, RestoreOutlined } from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { wikiPageQueries } from "@/entities/wiki-page";
import { sanitizeHtml } from "@/shared/lib";
import { ErrorBoundary, EmptyState } from "@/shared/ui";
import { useVersionHistory } from "../model/useVersionHistory";

const DRAWER_WIDTH = 520;

interface VersionHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  spaceKey: string;
  pageId: string;
}

export const VersionHistoryDrawer = ({
  open,
  onClose,
  spaceKey,
  pageId,
}: VersionHistoryDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: "background.paper",
            color: "text.primary",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          버전 히스토리
        </Typography>
        <IconButton onClick={onClose} size="small" aria-label="닫기">
          <CloseOutlined fontSize="small" />
        </IconButton>
      </Box>

      <ErrorBoundary inline resetKey={`${spaceKey}/${pageId}`}>
        <Suspense
          fallback={
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress size={28} />
            </Box>
          }
        >
          <VersionHistoryContent
            spaceKey={spaceKey}
            pageId={pageId}
            onClose={onClose}
          />
        </Suspense>
      </ErrorBoundary>
    </Drawer>
  );
};

const VersionHistoryContent = ({
  spaceKey,
  pageId,
  onClose,
}: {
  spaceKey: string;
  pageId: string;
  onClose: () => void;
}) => {
  const {
    versions,
    totalCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    selectedVersion,
    setSelectedVersion,
    handleRestore,
    isRestoring,
  } = useVersionHistory({ spaceKey, pageId, onClose });

  if (!versions.length) {
    return <EmptyState message="아직 버전 히스토리가 없습니다." />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography variant="caption" fontWeight={600} color="text.secondary">
          버전 목록 ({totalCount})
        </Typography>
      </Box>
      <List dense disablePadding sx={{ maxHeight: "40vh", overflow: "auto" }}>
        {versions.map((version) => {
          const isSelected = selectedVersion?.id === version.id;
          const author = version.editedBy ?? "익명";

          return (
            <ListItemButton
              key={version.id}
              selected={isSelected}
              onClick={() => setSelectedVersion(version)}
              sx={{
                mx: 1,
                borderRadius: 1,
                mb: 0.5,
                color: "text.primary",
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",
                  "& .MuiListItemAvatar-root .MuiAvatar-root": {
                    bgcolor: "rgba(255,255,255,0.2)",
                  },
                  "& .MuiListItemText-secondary": {
                    color: "rgba(255,255,255,0.7)",
                  },
                  "&:hover": { bgcolor: "primary.dark" },
                },
                "&:hover:not(.Mui-selected)": { bgcolor: "action.hover" },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 40 }}>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    bgcolor: isSelected ? "rgba(255,255,255,0.2)" : "grey.200",
                    color: isSelected ? "#fff" : "text.secondary",
                  }}
                >
                  v{version.version}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={version.title}
                secondary={`${author} · ${new Date(version.createdAt).toLocaleString("ko-KR")}`}
                slotProps={{
                  primary: {
                    noWrap: true,
                    sx: { fontSize: "0.8125rem", fontWeight: 500 },
                  },
                  secondary: {
                    sx: { fontSize: "0.6875rem" },
                  },
                }}
              />
              <Tooltip title="이 버전으로 복원">
                <IconButton
                  size="small"
                  aria-label="이 버전으로 복원"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestore(version.version);
                  }}
                  disabled={isRestoring}
                  sx={{
                    color: isSelected
                      ? "rgba(255,255,255,0.8)"
                      : "text.secondary",
                    ml: 0.5,
                  }}
                >
                  <RestoreOutlined sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </ListItemButton>
          );
        })}
        {hasNextPage && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
            <Button
              variant="text"
              size="small"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontSize: "0.75rem",
              }}
            >
              {isFetchingNextPage ? (
                <CircularProgress size={14} sx={{ mr: 0.5 }} />
              ) : null}
              이전 버전 더보기 ({versions.length}/{totalCount})
            </Button>
          </Box>
        )}
      </List>

      <Divider />

      <Box sx={{ flex: 1, overflow: "auto" }}>
        {selectedVersion ? (
          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress size={20} />
              </Box>
            }
          >
            <VersionPreview
              spaceKey={spaceKey}
              pageId={pageId}
              versionNumber={selectedVersion.version}
            />
          </Suspense>
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.disabled">
              버전을 선택하여 미리보기
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const VersionPreview = ({
  spaceKey,
  pageId,
  versionNumber,
}: {
  spaceKey: string;
  pageId: string;
  versionNumber: number;
}) => {
  const { data } = useSuspenseQuery(
    wikiPageQueries.version(spaceKey, pageId, versionNumber),
  );
  const version = data.items;
  const sanitizedContent = useMemo(
    () => sanitizeHtml(version.content),
    [version.content],
  );

  return (
    <Box sx={{ px: 2.5, py: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Chip
          label={`v${version.version}`}
          size="small"
          color="primary"
          sx={{ fontWeight: 600, fontSize: "0.75rem" }}
        />
        <Typography variant="subtitle2" fontWeight={600} noWrap>
          {version.title}
        </Typography>
      </Box>
      <Box
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        sx={{
          fontSize: "0.8125rem",
          lineHeight: 1.6,
          color: "text.primary",
          p: 2,
          bgcolor: "grey.50",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          "& h1, & h2, & h3": { mt: 1.5, mb: 0.5 },
          "& p": { mb: 0.5 },
          "& a": { color: "primary.main" },
          "& pre": {
            bgcolor: "#fff",
            border: "1px solid",
            borderColor: "divider",
            p: 1,
            borderRadius: 1,
            overflow: "auto",
          },
          "& code": {
            bgcolor: "#fff",
            px: 0.5,
            borderRadius: 0.5,
            fontSize: "0.75rem",
          },
        }}
      />
    </Box>
  );
};
