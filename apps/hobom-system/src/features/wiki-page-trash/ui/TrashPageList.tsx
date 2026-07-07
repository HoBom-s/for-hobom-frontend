import { useState } from "react";
import { RestoreOutlined, DeleteForeverOutlined } from "hobom-design-system/icons";
import { Hb, EmptyState } from "@/shared/ui";
import { useTrashPageList } from "../model/useTrashPageList";

interface TrashPageListProps {
  spaceKey: string;
}

export const TrashPageList = ({ spaceKey }: TrashPageListProps) => {
  const {
    pages,
    totalCount,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    handleRestore,
    handlePermanentDelete,
    isRestoring,
    isDeleting,
  } = useTrashPageList({ spaceKey });

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (!pages.length) {
    return <EmptyState message="휴지통이 비어있어요." />;
  }

  return (
    <Hb.Box>
      <Hb.Box
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 4,
        }}
      >
        <Hb.Text variant="caption" fontWeight={600} color="text.secondary">
          삭제된 페이지 ({totalCount})
        </Hb.Text>
      </Hb.Box>
      <Hb.List.Root dense disablePadding>
        {pages.map((page) => (
          <Hb.List.Item
            key={page.id}
            sx={{
              px: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
            secondaryAction={
              <Hb.Box
                style={{
                  display: "flex",
                  gap: 4,
                }}
              >
                <Hb.Tooltip title="복원">
                  <Hb.Button.Icon
                    size="small"
                    aria-label={`${page.title} 복원`}
                    onClick={() => handleRestore(page.id)}
                    disabled={isRestoring || isDeleting}
                  >
                    <RestoreOutlined fontSize="small" />
                  </Hb.Button.Icon>
                </Hb.Tooltip>
                <Hb.Tooltip title="영구 삭제">
                  <Hb.Button.Icon
                    size="small"
                    aria-label={`${page.title} 영구 삭제`}
                    onClick={() => setConfirmDeleteId(page.id)}
                    disabled={isRestoring || isDeleting}
                    style={{
                      color: "var(--hb-color-danger)",
                    }}
                  >
                    <DeleteForeverOutlined fontSize="small" />
                  </Hb.Button.Icon>
                </Hb.Tooltip>
              </Hb.Box>
            }
          >
            <Hb.List.ItemText
              primary={page.title}
              secondary={
                page.deletedAt
                  ? `삭제: ${new Date(page.deletedAt).toLocaleString("ko-KR")}`
                  : undefined
              }
              slotProps={{
                primary: { noWrap: true, sx: { fontSize: "0.875rem", fontWeight: 500 } },
                secondary: { sx: { fontSize: "0.75rem" } },
              }}
            />
          </Hb.List.Item>
        ))}
        {hasNextPage && (
          <Hb.Box
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 8,
              paddingBottom: 8,
            }}
          >
            <Hb.Button
              variant="ghost"
              size="small"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              style={{
                textTransform: "none",
                color: "var(--hb-color-text-secondary)",
                fontSize: "0.75rem",
              }}
            >
              {isFetchingNextPage ? <Hb.Progress.Circular size={14} sx={{ mr: 0.5 }} /> : null}
              더보기 ({pages.length}/{totalCount})
            </Hb.Button>
          </Hb.Box>
        )}
      </Hb.List.Root>
      <Hb.Dialog.Root
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
        size="xs"
      >
        <Hb.Dialog.Title>영구 삭제</Hb.Dialog.Title>
        <Hb.Dialog.Content>
          <Hb.Dialog.ContentText>
            이 페이지를 영구 삭제할까요?
            <br />이 작업은 되돌릴 수 없어요.
          </Hb.Dialog.ContentText>
        </Hb.Dialog.Content>
        <Hb.Dialog.Actions>
          <Hb.Button onClick={() => setConfirmDeleteId(null)} disabled={isDeleting}>
            취소
          </Hb.Button>
          <Hb.Button
            variant="danger"
            loading={isDeleting}
            onClick={() => {
              if (confirmDeleteId) {
                handlePermanentDelete(confirmDeleteId, () => setConfirmDeleteId(null));
              }
            }}
          >
            영구 삭제
          </Hb.Button>
        </Hb.Dialog.Actions>
      </Hb.Dialog.Root>
    </Hb.Box>
  );
};
