import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddOutlined, FolderOutlined } from "hobom-design-system/icons";
import { Hb, EditableLabel } from "@/shared/ui";
import { useWorkspace } from "@/features/workspace";
import type { FolderId, ItemId } from "@/entities/workspace";

/** 워크스페이스 브라우저 — 좌측 폴더 / 우측 아이템 그리드. 아이템 클릭 시 에디터로 이동. */
export default function WorkspacePage() {
  const navigate = useNavigate();
  const { folders, itemsInFolder, createFolder, createDesign, renameFolder } = useWorkspace();
  const [activeFolderId, setActiveFolderId] = useState<FolderId | undefined>(folders[0]?.id);

  const activeFolder = folders.find((folder) => folder.id === activeFolderId) ?? folders[0];
  const items = activeFolder ? itemsInFolder(activeFolder.id) : [];

  const openItem = (id: ItemId) => navigate(`/studio/${id}`);

  const handleNewFolder = () => setActiveFolderId(createFolder(`폴더 ${folders.length + 1}`));

  const handleNewDesign = () => {
    if (!activeFolder) {
      return;
    }

    openItem(createDesign(activeFolder.id, `디자인 ${items.length + 1}`));
  };

  return (
    <Hb.Stack direction="row" sx={{ height: "100%", minHeight: 0 }}>
      <Hb.Stack
        sx={{
          width: 240,
          flexShrink: 0,
          borderRight: 1,
          borderColor: "divider",
          p: 1.5,
          gap: 0.25,
          overflow: "auto",
        }}
      >
        <Hb.Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Hb.Text variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            폴더
          </Hb.Text>
          <Hb.Button.Icon size="small" aria-label="새 폴더" onClick={handleNewFolder}>
            <AddOutlined fontSize="small" />
          </Hb.Button.Icon>
        </Hb.Stack>

        {folders.map((folder) => (
          <Hb.Stack
            key={folder.id}
            direction="row"
            alignItems="center"
            gap={1}
            onClick={() => setActiveFolderId(folder.id)}
            sx={{
              px: 1,
              py: 0.75,
              borderRadius: 1,
              cursor: "pointer",
              bgcolor: folder.id === activeFolder?.id ? "action.selected" : "transparent",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <FolderOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
            <EditableLabel
              value={folder.name}
              onCommit={(name) => renameFolder(folder.id, name)}
              textSx={{ fontSize: 14 }}
            />
            <Hb.Box sx={{ flex: 1 }} />
          </Hb.Stack>
        ))}
      </Hb.Stack>

      <Hb.Box sx={{ flex: 1, minWidth: 0, p: 3, overflow: "auto" }}>
        <Hb.Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Hb.Text variant="h6">{activeFolder?.name ?? "워크스페이스"}</Hb.Text>
          <Hb.Button variant="primary" startIcon={<AddOutlined />} onClick={handleNewDesign}>
            새 디자인
          </Hb.Button>
        </Hb.Stack>

        {items.length === 0 ? (
          <Hb.Text variant="body2" color="text.secondary">
            아직 디자인이 없어요. "새 디자인"으로 시작하세요.
          </Hb.Text>
        ) : (
          <Hb.Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {items.map((item) => (
              <Hb.Card.Root
                key={item.id}
                onClick={() => openItem(item.id)}
                sx={{
                  width: 200,
                  p: 1.5,
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main" },
                }}
              >
                <Hb.Box sx={{ height: 120, bgcolor: "background.default", borderRadius: 1, mb: 1 }} />
                <Hb.Text variant="body2" sx={{ fontWeight: 600, px: 0.25 }}>
                  {item.name}
                </Hb.Text>
              </Hb.Card.Root>
            ))}
          </Hb.Box>
        )}
      </Hb.Box>
    </Hb.Stack>
  );
}
