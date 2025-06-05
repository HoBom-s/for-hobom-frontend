import { useContext, useEffect, useMemo, useCallback } from "react";
import { OverlayContext } from "../ui/OverlayProvider";
import type { OverlayElem } from "./overlay.model";

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
