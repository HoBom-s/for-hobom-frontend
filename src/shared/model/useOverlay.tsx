import { useContext, useEffect, useMemo, useCallback } from "react";
import { OverlayContext } from "@/shared/ui";
import type { OverlayElem } from "./overlay.model";

/**
 * 명령형 오버레이(다이얼로그, 바텀시트 등) 관리 훅.
 *
 * `OverlayProvider` 컨텍스트 내에서만 사용 가능하며,
 * 각 인스턴스에 UUID가 부여되어 다중 오버레이를 독립 추적한다.
 * 컴포넌트 unmount 시 오버레이가 자동 정리된다.
 */
export const useOverlay = () => {
  const overlayContext = useContext(OverlayContext);
  if (overlayContext == null) {
    throw new Error("overlay hook must be exist but got null !");
  }

  const { created, unmount } = overlayContext;
  const overlayUid = useMemo(() => crypto.randomUUID(), []);

  const handleClose = useCallback(() => {
    unmount(overlayUid);
  }, [overlayUid, unmount]);

  const handleExit = useCallback(() => {
    unmount(overlayUid);
  }, [overlayUid, unmount]);

  const onOpen = useCallback(
    (Overlay: OverlayElem) => {
      created(
        overlayUid,
        <Overlay isOpen={true} onClose={handleClose} onExit={handleExit} />,
      );
    },
    [created, overlayUid, handleClose, handleExit],
  );

  const onClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const onExit = useCallback(() => {
    handleExit();
  }, [handleExit]);

  useEffect(() => {
    return () => {
      unmount(overlayUid);
    };
  }, [overlayUid, unmount]);

  return {
    onOpen,
    onClose,
    onExit,
  };
};
