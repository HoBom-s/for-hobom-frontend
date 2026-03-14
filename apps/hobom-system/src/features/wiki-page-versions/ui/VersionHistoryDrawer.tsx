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
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
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
            <Hb.Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
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
