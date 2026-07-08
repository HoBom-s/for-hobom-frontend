import { MoreHoriz } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { useCategoryMenu } from "../model/useCategoryMenu";

interface Props {
  categoryId: string;
  categoryTitle: string;
}

export const CategoryMenu = ({ categoryId, categoryTitle }: Props) => {
  const {
    anchorEl,
    editOpen,
    editTitle,
    setEditTitle,
    setEditOpen,
    isUpdatePending,
    openMenu,
    closeMenu,
    openEdit,
    handleEdit,
    handleDelete,
  } = useCategoryMenu({ categoryId, categoryTitle });

  return (
    <>
      <Hb.Button.Icon
        size="small"
        onClick={openMenu}
        style={{
          padding: 2,
        }}
      >
        <MoreHoriz sx={{ fontSize: 16 }} />
      </Hb.Button.Icon>
      <Hb.Menu.Root
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        style={{ minWidth: 100 }}
      >
        <Hb.Menu.Item onClick={openEdit}>수정</Hb.Menu.Item>
        <Hb.Menu.Item style={{ color: "var(--hb-color-danger)" }} onClick={handleDelete}>
          삭제
        </Hb.Menu.Item>
      </Hb.Menu.Root>
      <Hb.Dialog.Root open={editOpen} onClose={() => setEditOpen(false)} size="xs">
        <Hb.Dialog.Title style={{
          paddingBottom: 8
        }}>카테고리 수정</Hb.Dialog.Title>
        <Hb.Dialog.Content style={{ paddingTop: 12 }}>
          <Hb.TextField
            fullWidth
            autoFocus
            label="카테고리 이름"
            size="small"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleEdit();
              }
            }}
          />
        </Hb.Dialog.Content>
        <Hb.Dialog.Actions style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 16,
          gap: 8
        }}>
          <Hb.Button fullWidth variant="secondary" onClick={() => setEditOpen(false)}>
            취소
          </Hb.Button>
          <Hb.Button fullWidth variant="primary" loading={isUpdatePending} onClick={handleEdit}>
            저장
          </Hb.Button>
        </Hb.Dialog.Actions>
      </Hb.Dialog.Root>
    </>
  );
};
