import { EditOutlined, DeleteOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import type { NotificationTemplateType } from "@/entities/notification-template";

interface NotificationTemplateTableProps {
  templates: NotificationTemplateType[];
  isDeleting: boolean;
  onEdit: (template: NotificationTemplateType) => void;
  onDelete: (id: string) => void;
}

const CHANNEL_LABEL: Record<string, string> = {
  Push: "Push",
  InApp: "In-App",
  Both: "Push + In-App",
};

export const NotificationTemplateTable = ({
  templates,
  isDeleting,
  onEdit,
  onDelete,
}: NotificationTemplateTableProps) => {
  if (templates.length === 0) {
    return (
      <Hb.Box sx={{ py: 6, textAlign: "center" }}>
        <Hb.Text variant="body2" sx={{ color: "text.secondary" }}>
          등록된 알림 템플릿이 없어요.
        </Hb.Text>
      </Hb.Box>
    );
  }

  return (
    <Hb.Table.Container>
      <Hb.Table.Root size="small">
        <Hb.Table.Head>
          <Hb.Table.Row>
            <Hb.Table.Cell>Template Key</Hb.Table.Cell>
            <Hb.Table.Cell>Title Template</Hb.Table.Cell>
            <Hb.Table.Cell>Channel</Hb.Table.Cell>
            <Hb.Table.Cell>Updated</Hb.Table.Cell>
            <Hb.Table.Cell align="right">Actions</Hb.Table.Cell>
          </Hb.Table.Row>
        </Hb.Table.Head>
        <Hb.Table.Body>
          {templates.map((template) => (
            <Hb.Table.Row key={template.id}>
              <Hb.Table.Cell>
                <Hb.Text variant="body2" sx={{ fontWeight: 600, fontFamily: "monospace" }}>
                  {template.templateKey}
                </Hb.Text>
              </Hb.Table.Cell>
              <Hb.Table.Cell>
                <Hb.Text variant="body2" sx={{ maxWidth: 300 }} noWrap>
                  {template.titleTemplate}
                </Hb.Text>
              </Hb.Table.Cell>
              <Hb.Table.Cell>
                <Hb.Chip label={CHANNEL_LABEL[template.channel] ?? template.channel} size="small" />
              </Hb.Table.Cell>
              <Hb.Table.Cell>
                <Hb.Text variant="body2" sx={{ color: "text.secondary" }}>
                  {new Date(template.updatedAt).toLocaleDateString("ko-KR")}
                </Hb.Text>
              </Hb.Table.Cell>
              <Hb.Table.Cell align="right">
                <Hb.Stack direction="row" spacing={0.5} justifyContent="flex-end">
                  <Hb.Button.Icon size="small" onClick={() => onEdit(template)}>
                    <EditOutlined fontSize="small" />
                  </Hb.Button.Icon>
                  <Hb.Button.Icon
                    size="small"
                    disabled={isDeleting}
                    onClick={() => onDelete(template.id)}
                  >
                    <DeleteOutlined fontSize="small" />
                  </Hb.Button.Icon>
                </Hb.Stack>
              </Hb.Table.Cell>
            </Hb.Table.Row>
          ))}
        </Hb.Table.Body>
      </Hb.Table.Root>
    </Hb.Table.Container>
  );
};
