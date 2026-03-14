import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateSpace,
  useUpdateSpace,
  useDeleteSpace,
  type SpaceType,
} from "@/entities/wiki-space";

export const useSpaceListWorkspace = () => {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [editSpace, setEditSpace] = useState<SpaceType | null>(null);
  const createMutation = useCreateSpace();
  const updateMutation = useUpdateSpace();
  const deleteMutation = useDeleteSpace();

  const handleNavigateToSpace = (key: string) => {
    navigate(`/wiki/${key}`);
  };

  const handleCreateSpace = (data: { key: string; name: string; description: string }) => {
    createMutation.mutate(data, {
      onSuccess: () => setCreateOpen(false),
    });
  };

  const handleUpdateSpace = (data: { key: string; name: string; description: string }) => {
    updateMutation.mutate(data, {
      onSuccess: () => setEditSpace(null),
    });
  };

  const handleDeleteSpace = (key: string, onClose: () => void) => {
    deleteMutation.mutate({ key }, { onSuccess: onClose });
  };

  return {
    handleNavigateToSpace,
    createOpen,
    setCreateOpen,
    editSpace,
    setEditSpace,
    handleCreateSpace,
    handleUpdateSpace,
    handleDeleteSpace,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
