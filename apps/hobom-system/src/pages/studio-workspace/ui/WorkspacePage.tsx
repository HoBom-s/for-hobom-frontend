import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddOutlined,
  DeleteOutline,
  EditOutlined,
  FolderOutlined,
  PushPin,
  PushPinOutlined,
} from "hobom-design-system/icons";
import { Hb, EditableLabel } from "@/shared/ui";
import { useWorkspace } from "@/features/workspace";
import type { FolderId, ItemId } from "@/entities/workspace";

/** 워크스페이스 브라우저 — 좌측 즐겨찾기·폴더 / 우측 아이템 그리드. */
export default function WorkspacePage() {
  const navigate = useNavigate();
  const {
    folders,
    favorites,
    itemsInFolder,
    createFolder,
    createDesign,
    renameFolder,
    deleteFolder,
    deleteDesign,
    addFavorite,
    removeFavorite,
    renameFavorite,
  } = useWorkspace();
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

  const handleDeleteFolder = (event: MouseEvent, id: FolderId) => {
    event.stopPropagation();
    deleteFolder(id);

    if (id === activeFolderId) {
      setActiveFolderId(folders.find((folder) => folder.id !== id)?.id);
    }
  };

  const handleDeleteDesign = (event: MouseEvent, id: ItemId) => {
    event.stopPropagation();
    deleteDesign(id);
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
        {favorites.length > 0 && (
          <>
            <Hb.Text
              variant="caption"
              color="text.secondary"
              style={{
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              즐겨찾기
            </Hb.Text>
            {favorites.map((favorite) => (
              <FavoriteRow
                key={favorite.id}
                label={favorite.label}
                onOpen={() => openItem(favorite.designId)}
                onRename={(label) => renameFavorite(favorite.id, label)}
                onRemove={() => removeFavorite(favorite.id)}
              />
            ))}
            <Hb.Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
              }}
            />
          </>
        )}

        <Hb.Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Hb.Text
            variant="caption"
            color="text.secondary"
            style={{
              fontWeight: 600,
            }}
          >
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
              "&:hover .row-action": { opacity: 1 },
            }}
          >
            <FolderOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
            <EditableLabel
              value={folder.name}
              onCommit={(name) => renameFolder(folder.id, name)}
              textSx={{ fontSize: 14 }}
            />
            <Hb.Box sx={{ flex: 1 }} />
            <Hb.Button.Icon
              size="small"
              className="row-action"
              aria-label="폴더 삭제"
              onClick={(event) => handleDeleteFolder(event, folder.id)}
              sx={{ p: 0.25, opacity: 0, transition: "opacity 0.12s" }}
            >
              <DeleteOutline sx={{ fontSize: 16 }} />
            </Hb.Button.Icon>
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
            {items.map((item) => {
              const favorite = favorites.find((entry) => entry.designId === item.id);

              return (
                <Hb.Card.Root
                  key={item.id}
                  onClick={() => openItem(item.id)}
                  sx={{
                    width: 200,
                    p: 1.5,
                    position: "relative",
                    cursor: "pointer",
                    "&:hover": { borderColor: "primary.main" },
                    "&:hover .card-action": { opacity: 1 },
                  }}
                >
                  <Hb.Button.Icon
                    size="small"
                    className="card-action"
                    aria-label={favorite ? "즐겨찾기 해제" : "즐겨찾기"}
                    onClick={(event) => {
                      event.stopPropagation();

                      if (favorite) {
                        removeFavorite(favorite.id);
                      } else {
                        addFavorite(item.id, item.name);
                      }
                    }}
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 38,
                      bgcolor: "background.paper",
                      color: favorite ? "primary.main" : "inherit",
                      opacity: favorite ? 1 : 0,
                      transition: "opacity 0.12s",
                      "&:hover": { bgcolor: "background.paper" },
                    }}
                  >
                    {favorite ? (
                      <PushPin sx={{ fontSize: 16 }} />
                    ) : (
                      <PushPinOutlined sx={{ fontSize: 16 }} />
                    )}
                  </Hb.Button.Icon>
                  <Hb.Button.Icon
                    size="small"
                    className="card-action"
                    aria-label="디자인 삭제"
                    onClick={(event) => handleDeleteDesign(event, item.id)}
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      bgcolor: "background.paper",
                      opacity: 0,
                      transition: "opacity 0.12s",
                      "&:hover": { bgcolor: "background.paper" },
                    }}
                  >
                    <DeleteOutline sx={{ fontSize: 16 }} />
                  </Hb.Button.Icon>
                  <Hb.Box
                    sx={{ height: 120, bgcolor: "background.default", borderRadius: 1, mb: 1 }}
                  />
                  <Hb.Text
                    variant="body2"
                    style={{
                      fontWeight: 600,
                      paddingLeft: 2,
                      paddingRight: 2,
                    }}
                  >
                    {item.name}
                  </Hb.Text>
                </Hb.Card.Root>
              );
            })}
          </Hb.Box>
        )}
      </Hb.Box>
    </Hb.Stack>
  );
}

interface FavoriteRowProps {
  label: string;
  onOpen: () => void;
  onRename: (label: string) => void;
  onRemove: () => void;
}

/** 즐겨찾기 행 — 클릭 시 열기, 연필로 이름변경(클릭-열기와 충돌 방지). */
function FavoriteRow({ label, onOpen, onRename, onRemove }: FavoriteRowProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(label);

  const commit = () => {
    setEditing(false);
    const next = draft.trim();

    if (next && next !== label) {
      onRename(next);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      commit();
    } else if (event.key === "Escape") {
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <Hb.InputBase
        autoFocus
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        sx={{
          fontSize: 14,
          px: 1,
          py: 0.5,
          borderRadius: 1,
          border: 1,
          borderColor: "primary.main",
        }}
      />
    );
  }

  return (
    <Hb.Stack
      direction="row"
      alignItems="center"
      gap={1}
      onClick={onOpen}
      sx={{
        px: 1,
        py: 0.75,
        borderRadius: 1,
        cursor: "pointer",
        "&:hover": { bgcolor: "action.hover" },
        "&:hover .fav-action": { opacity: 1 },
      }}
    >
      <PushPin sx={{ fontSize: 16, color: "primary.main" }} />
      <Hb.Text
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 14,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Hb.Text>
      <Hb.Button.Icon
        size="small"
        className="fav-action"
        aria-label="즐겨찾기 이름변경"
        onClick={(event) => {
          event.stopPropagation();
          setDraft(label);
          setEditing(true);
        }}
        sx={{ p: 0.25, opacity: 0, transition: "opacity 0.12s" }}
      >
        <EditOutlined sx={{ fontSize: 15 }} />
      </Hb.Button.Icon>
      <Hb.Button.Icon
        size="small"
        className="fav-action"
        aria-label="즐겨찾기 해제"
        onClick={(event) => {
          event.stopPropagation();
          onRemove();
        }}
        sx={{ p: 0.25, opacity: 0, transition: "opacity 0.12s" }}
      >
        <DeleteOutline sx={{ fontSize: 15 }} />
      </Hb.Button.Icon>
    </Hb.Stack>
  );
}
