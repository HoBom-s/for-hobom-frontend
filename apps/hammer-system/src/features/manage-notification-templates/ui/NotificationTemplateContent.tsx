import { AddOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { DashboardPaper } from "@/entities/analytics";
import { useNotificationTemplateList } from "../model/useNotificationTemplateList";
import { NotificationTemplateTable } from "./NotificationTemplateTable";
import { NotificationTemplateFormDialog } from "./NotificationTemplateFormDialog";

export const NotificationTemplateContent = () => {
  const {
    templates,
    editingTemplate,
    formDialogOpen,
    isDeleting,
    handleDelete,
    openCreateDialog,
    openEditDialog,
    closeFormDialog,
  } = useNotificationTemplateList();

  return (
    <>
      <DashboardPaper>
        <Hb.Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Hb.Button variant="primary" startIcon={<AddOutlined />} onClick={openCreateDialog}>
            템플릿 추가
          </Hb.Button>
        </Hb.Box>

        <NotificationTemplateTable
          templates={templates}
          isDeleting={isDeleting}
          onEdit={openEditDialog}
          onDelete={handleDelete}
        />
      </DashboardPaper>

      <NotificationTemplateFormDialog
        open={formDialogOpen}
        editingTemplate={editingTemplate}
        onClose={closeFormDialog}
      />
    </>
  );
};
