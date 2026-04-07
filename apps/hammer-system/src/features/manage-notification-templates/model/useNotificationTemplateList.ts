import { useState } from "react";
import { useSuspenseQuery, useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import {
  notificationTemplateQueries,
  notificationTemplateMutations,
} from "@/entities/notification-template";
import type { NotificationTemplateType } from "@/entities/notification-template";

export const useNotificationTemplateList = () => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const { data: templates } = useSuspenseQuery(notificationTemplateQueries.list());

  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplateType | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  const deleteMutation = useMutation(notificationTemplateMutations.delete());

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        dataLot.invalidateQueries({ queryKey: notificationTemplateQueries.all() });
        openSuccessToast({ message: "템플릿이 삭제되었어요." });
      },
      onError: () => {
        openErrorToast({ message: "삭제에 실패했어요." });
      },
    });
  };

  const openCreateDialog = () => {
    setEditingTemplate(null);
    setFormDialogOpen(true);
  };

  const openEditDialog = (template: NotificationTemplateType) => {
    setEditingTemplate(template);
    setFormDialogOpen(true);
  };

  const closeFormDialog = () => {
    setFormDialogOpen(false);
    setEditingTemplate(null);
  };

  return {
    templates,
    editingTemplate,
    formDialogOpen,
    isDeleting: deleteMutation.isPending,
    handleDelete,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  };
};
