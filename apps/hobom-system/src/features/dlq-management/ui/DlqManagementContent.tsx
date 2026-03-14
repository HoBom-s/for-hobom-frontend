import { useState } from "react";
import { Replay } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import { useDlqList } from "../model/useDlqSearch";
import { useRetryDlq } from "../model/useRetryDlq";
import { DlqDetailDialog } from "./DlqDetailDialog";

export const DlqManagementContent = () => {
  const { items, isLoading } = useDlqList();
  const retryMutation = useRetryDlq();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleRetry = (key: string) => {
    retryMutation.mutate(key, {
      onSuccess: () => setSelectedKey(null),
    });
  };

  return (
    <Hb.Box sx={{ p: 3 }}>
      {/* Header */}
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Hb.Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "error.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Replay sx={{ color: "#fff", fontSize: 22 }} />
          </Hb.Box>
          <Hb.Box>
            <Hb.Text variant="h5" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
              DLQ 관리
            </Hb.Text>
            <Hb.Text variant="body2" sx={{ color: "text.secondary", mt: 0.25 }}>
              처리 실패한 메시지를 조회하고 재시도할 수 있어요.
            </Hb.Text>
          </Hb.Box>
        </Hb.Box>

        {items.length > 0 && (
          <Hb.Text variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            총 {items.length.toLocaleString()}건
          </Hb.Text>
        )}
      </Hb.Box>

      {/* Table */}
      {isLoading ? (
        <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <Hb.Progress.Circular size={28} />
        </Hb.Box>
      ) : items.length === 0 ? (
        <Hb.Text
          variant="body2"
          color="text.secondary"
          sx={{ py: 4, textAlign: "center" }}
        >
          DLQ 항목이 없습니다
        </Hb.Text>
      ) : (
        <Hb.Table.Container
          sx={{ maxHeight: "calc(100vh - 280px)", overflow: "auto" }}
        >
          <Hb.Table.Root stickyHeader size="small">
            <Hb.Table.Head>
              <Hb.Table.Row>
                <Hb.Table.Cell
                  sx={{
                    fontWeight: 600,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Key
                </Hb.Table.Cell>
                <Hb.Table.Cell sx={{ width: 100 }} align="center">
                  액션
                </Hb.Table.Cell>
              </Hb.Table.Row>
            </Hb.Table.Head>
            <Hb.Table.Body>
              {items.map((key) => (
                <Hb.Table.Row
                  key={key}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => setSelectedKey(key)}
                >
                  <Hb.Table.Cell
                    sx={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      wordBreak: "break-all",
                    }}
                  >
                    {key}
                  </Hb.Table.Cell>
                  <Hb.Table.Cell align="center">
                    <Hb.Tooltip title="재시도 처리">
                      <Hb.Button.Icon
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRetry(key);
                        }}
                        disabled={retryMutation.isPending}
                      >
                        <Replay sx={{ fontSize: 16 }} />
                      </Hb.Button.Icon>
                    </Hb.Tooltip>
                  </Hb.Table.Cell>
                </Hb.Table.Row>
              ))}
            </Hb.Table.Body>
          </Hb.Table.Root>
        </Hb.Table.Container>
      )}

      {/* Detail Dialog */}
      <DlqDetailDialog
        dlqKey={selectedKey}
        open={selectedKey !== null}
        onClose={() => setSelectedKey(null)}
        onRetry={handleRetry}
        isRetrying={retryMutation.isPending}
      />
    </Hb.Box>
  );
};
