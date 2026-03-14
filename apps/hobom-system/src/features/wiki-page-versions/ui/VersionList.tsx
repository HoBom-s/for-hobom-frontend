import { Suspense } from "react";
import { RestoreOutlined } from "hobom-design-system/icons";
import { Hb, EmptyState } from "@/shared/ui";
import { useVersionHistory } from "../model/useVersionHistory";
import { VersionPreview } from "./VersionPreview";

interface VersionListProps {
  spaceKey: string;
  pageId: string;
  onClose: () => void;
}

export const VersionList = ({ spaceKey, pageId, onClose }: VersionListProps) => {
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
    <Hb.Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Hb.Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Hb.Text variant="caption" fontWeight={600} color="text.secondary">
          버전 목록 ({totalCount})
        </Hb.Text>
      </Hb.Box>
      <Hb.List.Root dense disablePadding sx={{ maxHeight: "40vh", overflow: "auto" }}>
        {versions.map((version) => {
          const isSelected = selectedVersion?.id === version.id;
          const author = version.editedBy ?? "익명";

          return (
            <Hb.List.ItemButton
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
              <Hb.List.ItemAvatar sx={{ minWidth: 40 }}>
                <Hb.Avatar
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
                </Hb.Avatar>
              </Hb.List.ItemAvatar>
              <Hb.List.ItemText
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
              <Hb.Tooltip title="이 버전으로 복원">
                <Hb.Button.Icon
                  size="small"
                  aria-label="이 버전으로 복원"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestore(version.version);
                  }}
                  disabled={isRestoring}
                  sx={{
                    color: isSelected ? "rgba(255,255,255,0.8)" : "text.secondary",
                    ml: 0.5,
                  }}
                >
                  <RestoreOutlined sx={{ fontSize: 16 }} />
                </Hb.Button.Icon>
              </Hb.Tooltip>
            </Hb.List.ItemButton>
          );
        })}
        {hasNextPage && (
          <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
            <Hb.Button
              variant="ghost"
              size="small"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontSize: "0.75rem",
              }}
            >
              {isFetchingNextPage ? <Hb.Progress.Circular size={14} sx={{ mr: 0.5 }} /> : null}
              이전 버전 더보기 ({versions.length}/{totalCount})
            </Hb.Button>
          </Hb.Box>
        )}
      </Hb.List.Root>

      <Hb.Divider />

      <Hb.Box sx={{ flex: 1, overflow: "auto" }}>
        {selectedVersion ? (
          <Suspense
            fallback={
              <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <Hb.Progress.Circular size={20} />
              </Hb.Box>
            }
          >
            <VersionPreview
              spaceKey={spaceKey}
              pageId={pageId}
              versionNumber={selectedVersion.version}
            />
          </Suspense>
        ) : (
          <Hb.Box sx={{ p: 4, textAlign: "center" }}>
            <Hb.Text variant="body2" color="text.disabled">
              버전을 선택하여 미리보기
            </Hb.Text>
          </Hb.Box>
        )}
      </Hb.Box>
    </Hb.Box>
  );
};
