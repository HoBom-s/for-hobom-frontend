import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useDataLot } from "hobom-data";
import { useToast } from "@/shared/model";
import {
  notificationTemplateQueries,
  notificationTemplateMutations,
} from "@/entities/notification-template";
import type {
  NotificationTemplateType,
  CreateNotificationTemplateRequest,
} from "@/entities/notification-template";

interface UseNotificationTemplateFormParams {
  editingTemplate: NotificationTemplateType | null;
  onSuccess: () => void;
}

const DEFAULT_VALUES: CreateNotificationTemplateRequest = {
  templateKey: "",
  titleTemplate: "",
  bodyTemplate: "",
  channel: "Both",
};

export const useNotificationTemplateForm = ({
  editingTemplate,
  onSuccess,
}: UseNotificationTemplateFormParams) => {
  const dataLot = useDataLot();
  const { openSuccessToast, openErrorToast } = useToast();

  const formMethods = useForm<CreateNotificationTemplateRequest>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (editingTemplate) {
      formMethods.reset({
        templateKey: editingTemplate.templateKey,
        titleTemplate: editingTemplate.titleTemplate,
        bodyTemplate: editingTemplate.bodyTemplate,
        channel: editingTemplate.channel,
      });
    } else {
      formMethods.reset(DEFAULT_VALUES);
    }
  }, [editingTemplate, formMethods]);

  const createMutation = useMutation(notificationTemplateMutations.create());
  const updateMutation = useMutation(notificationTemplateMutations.update());

  const isEditing = editingTemplate !== null;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = formMethods.handleSubmit((data) => {
    if (isEditing) {
      updateMutation.mutate(
        { id: editingTemplate.id, ...data },
        {
          onSuccess: () => {
            dataLot.invalidateQueries({ queryKey: notificationTemplateQueries.all() });
            openSuccessToast({ message: "템플릿이 수정되었어요." });
            onSuccess();
          },
          onError: () => openErrorToast({ message: "수정에 실패했어요." }),
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          dataLot.invalidateQueries({ queryKey: notificationTemplateQueries.all() });
          openSuccessToast({ message: "템플릿이 생성되었어요." });
          onSuccess();
        },
        onError: () => openErrorToast({ message: "생성에 실패했어요." }),
      });
    }
  });

  return { formMethods, handleSubmit, isEditing, isPending };
};
