import { useState } from "react";
import { useSuspenseQuery } from "hobom-data";
import {
  wikiLabelQueries,
  useCreateLabel,
  useUpdateLabel,
  useDeleteLabel,
  type LabelType,
} from "@/entities/wiki-label";

export const useLabelManager = ({ spaceKey }: { spaceKey: string }) => {
  const { data } = useSuspenseQuery(wikiLabelQueries.list(spaceKey));
  const labels = data.items;

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState<LabelType | null>(null);

  const createLabel = useCreateLabel();
  const updateLabel = useUpdateLabel();
  const deleteLabel = useDeleteLabel();

  const handleCreate = (name: string, color: string) => {
    createLabel.mutate({ spaceKey, name, color }, { onSuccess: () => setCreateDialogOpen(false) });
  };

  const handleUpdate = (labelId: string, name: string, color: string) => {
    updateLabel.mutate(
      { spaceKey, labelId, name, color },
      { onSuccess: () => setEditingLabel(null) },
    );
  };

  const handleDelete = (labelId: string) => {
    deleteLabel.mutate({ spaceKey, labelId });
  };

  return {
    labels,
    createDialogOpen,
    setCreateDialogOpen,
    editingLabel,
    setEditingLabel,
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating: createLabel.isPending,
    isUpdating: updateLabel.isPending,
    isDeleting: deleteLabel.isPending,
  };
};
