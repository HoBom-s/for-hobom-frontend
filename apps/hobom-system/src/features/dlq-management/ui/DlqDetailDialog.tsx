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
        <Hb.Box
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <Hb.Progress.Circular size={28} />
        </Hb.Box>
      );
    }

    if (!detail) return null;

    return (
      <>
        <Hb.Box
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <Hb.Text
            variant="body2"
            style={{
              fontWeight: 600,
              minWidth: 40,
              color: "var(--hb-color-text-secondary)",
            }}
          >
            Key
          </Hb.Text>
          <Hb.Text
            variant="body2"
            style={{
              wordBreak: "break-all",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
            }}
          >
            {detail.key}
          </Hb.Text>
        </Hb.Box>
        <Hb.Text
          variant="body2"
          style={{
            fontWeight: 600,
            color: "var(--hb-color-text-secondary)",
            marginBottom: 8,
          }}
        >
          Payload
        </Hb.Text>
        <Hb.Box
          component="pre"
          style={{
            padding: 16,
            borderRadius: 8,
            backgroundColor: "var(--hb-color-border)",
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            overflow: "auto",
            maxHeight: 400,
            whiteSpace: "pre",
            margin: 0,
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Hb.Text
          variant="h6"
          style={{
            fontWeight: 700,
          }}
        >
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
