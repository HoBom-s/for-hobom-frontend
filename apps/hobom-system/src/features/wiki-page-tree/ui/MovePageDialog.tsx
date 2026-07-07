import { Suspense, useEffect, useState } from "react";
import { Hb } from "@/shared/ui";
import { SpaceSelect } from "./SpaceSelect";
import { PageSelect } from "./PageSelect";

interface MovePageDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (targetSpaceKey: string, parentPageId: string | null) => void;
  loading?: boolean;
  currentSpaceKey: string;
  currentPageId: string;
}

export const MovePageDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  currentSpaceKey,
  currentPageId,
}: MovePageDialogProps) => {
  const [targetSpaceKey, setTargetSpaceKey] = useState(currentSpaceKey);
  const [parentPageId, setParentPageId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTargetSpaceKey(currentSpaceKey);
      setParentPageId(null);
    }
  }, [open, currentSpaceKey]);

  const handleSubmit = () => {
    if (loading) return;
    onSubmit(targetSpaceKey, parentPageId);
  };

  const suspenseFallback = (
    <Hb.Box
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <Hb.Progress.Circular size={20} />
    </Hb.Box>
  );

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="sm">
      <Hb.Dialog.Title>페이지 이동</Hb.Dialog.Title>
      <Hb.Dialog.Content>
        <Hb.Box
          style={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <Suspense fallback={suspenseFallback}>
            <SpaceSelect selectedSpaceKey={targetSpaceKey} onSelect={setTargetSpaceKey} />
          </Suspense>
          <Suspense fallback={suspenseFallback}>
            <PageSelect
              spaceKey={targetSpaceKey}
              selectedPageId={parentPageId}
              onSelect={setParentPageId}
              excludePageId={currentPageId}
            />
          </Suspense>
        </Hb.Box>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button onClick={onClose} disabled={loading}>
          취소
        </Hb.Button>
        <Hb.Button onClick={handleSubmit} variant="primary" loading={loading}>
          이동
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
