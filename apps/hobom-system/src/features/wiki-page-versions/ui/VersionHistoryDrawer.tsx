import { Suspense } from "react";
import { CloseOutlined } from "hobom-design-system/icons";
import { Hb, ErrorBoundary } from "@/shared/ui";
import { VersionList } from "./VersionList";

const DRAWER_WIDTH = 520;

interface VersionHistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  spaceKey: string;
  pageId: string;
}

export const VersionHistoryDrawer = ({
  open,
  onClose,
  spaceKey,
  pageId,
}: VersionHistoryDrawerProps) => {
  return (
    <Hb.Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: "background.paper",
            color: "text.primary",
          },
        },
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottom: "1px solid",
          borderColor: "var(--hb-color-border)",
        }}
      >
        <Hb.Text variant="h6" fontWeight={700}>
          버전 히스토리
        </Hb.Text>
        <Hb.Button.Icon onClick={onClose} size="small" aria-label="닫기">
          <CloseOutlined fontSize="small" />
        </Hb.Button.Icon>
      </Hb.Box>
      <ErrorBoundary inline resetKey={`${spaceKey}/${pageId}`}>
        <Suspense
          fallback={
            <Hb.Box
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: 48,
                paddingBottom: 48,
              }}
            >
              <Hb.Progress.Circular size={28} />
            </Hb.Box>
          }
        >
          <VersionList spaceKey={spaceKey} pageId={pageId} onClose={onClose} />
        </Suspense>
      </ErrorBoundary>
    </Hb.Drawer>
  );
};
