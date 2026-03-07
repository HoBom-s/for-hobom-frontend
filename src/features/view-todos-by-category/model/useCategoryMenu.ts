import { useState } from "react";
import { Bom } from "@/packages/bom";
import { useUpdateCategory, useDeleteCategory } from "@/entities/daily-todo";

export const useCategoryMenu = ({
  categoryId,
  categoryTitle,
}: {
  categoryId: string;
  categoryTitle: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(categoryTitle);
  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useUpdateCategory();
  const { mutate: mutateDelete } = useDeleteCategory();

  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  const openEdit = () => {
    setEditTitle(categoryTitle);
    setEditOpen(true);
    setAnchorEl(null);
  };

  const handleEdit = () => {
    const trimmed = editTitle.trim();
    if (Bom.isEmpty(trimmed)) return;
    mutateUpdate(
      { id: categoryId, title: trimmed },
      { onSuccess: () => setEditOpen(false) },
    );
  };

  const handleDelete = () => {
    mutateDelete({ id: categoryId });
    setAnchorEl(null);
  };

  return {
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
  };
};
