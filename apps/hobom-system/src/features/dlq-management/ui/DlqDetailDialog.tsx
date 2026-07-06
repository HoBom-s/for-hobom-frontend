import { useQuery } from "hobom-data";
import { CloseOutlined, Replay } from "hobom-design-system/icons";
import { dlqQueries } from "@/entities/dlq";
import { Hb } from "@/shared/ui";

interface DlqDetailDialogProps {
  dlqKey: string | null;
  open: boolean;
  onClose: () => void;
  onRetry: (key: string) => void;
  isRetrying: boolean;
}

export const DlqDetailDialog = ({
  dlqKey,
  open,
  onClose,
  onRetry,
  isRetrying,
}: DlqDetailDialogProps) => {
  const { data, isLoading } = useQuery({
    ...dlqQueries.detail(dlqKey ?? ""),
    enabled: open && dlqKey !== null,
  });

  const detail = data?.items;

  const renderContent = () => {
    if (isLoading) {
      return (
        <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Hb.Progress.Circular size={28} />
        </Hb.Box>
      );
    }

    if (!detail) return null;

    return (
      <>
        <Hb.Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Hb.Text variant="body2" sx={{ fontWeight: 600, minWidth: 40, color: "text.secondary" }}>
            Key
          </Hb.Text>
          <Hb.Text
            variant="body2"
            sx={{
              wordBreak: "break-all",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
            }}
          >
            {detail.key}
          </Hb.Text>
        </Hb.Box>

        <Hb.Text variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mb: 1 }}>
          Payload
        </Hb.Text>
        <Hb.Box
          component="pre"
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: "action.hover",
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            overflow: "auto",
            maxHeight: 400,
            whiteSpace: "pre",
            m: 0,
          }}
        >
          {JSON.stringify(detail.payload, null, 2)}
        </Hb.Box>
      </>
    );
  };

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="md">
      <Hb.Dialog.Title
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Hb.Text variant="h6" sx={{ fontWeight: 700 }}>
          DLQ 상세
        </Hb.Text>
        <Hb.Button.Icon onClick={onClose} size="small">
          <CloseOutlined fontSize="small" />
        </Hb.Button.Icon>
      </Hb.Dialog.Title>

      <Hb.Dialog.Content dividers>{renderContent()}</Hb.Dialog.Content>

      <Hb.Dialog.Actions>
        <Hb.Button variant="secondary" onClick={onClose}>
          닫기
        </Hb.Button>
        <Hb.Button
          startIcon={<Replay sx={{ fontSize: 16 }} />}
          onClick={() => dlqKey && onRetry(dlqKey)}
          disabled={isRetrying || !dlqKey}
        >
          재시도
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
