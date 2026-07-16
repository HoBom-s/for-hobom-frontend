import { createElement, useCallback, useContext } from "react";
import type { ReactNode } from "react";
import { OverlayContext } from "hobom-design-system";

let overlayCount = 0;

export interface OverlayControl {
  /** Remove the overlay from the tree. */
  close: () => void;
}

interface OverlayHostProps {
  render: (control: OverlayControl) => ReactNode;
  remove: () => void;
}

// A real component instance (not a static snapshot) so the overlay has its own
// hooks/lifecycle and re-renders normally while it's open.
const OverlayHost = ({ render, remove }: OverlayHostProps): ReactNode => render({ close: remove });

/** Imperatively mount an overlay (dialog/confirm/sheet) at the app root, so a
 *  component can open one without owning its render/mount state. The rendered
 *  content is mounted while open and unmounted on `close`. */
export const useOverlay = () => {
  const context = useContext(OverlayContext);

  if (!context) throw new Error("useOverlay must be used within an OverlayProvider");

  const { created, unmount } = context;

  const open = useCallback(
    (render: (control: OverlayControl) => ReactNode) => {
      overlayCount += 1;
      const id = `overlay-${overlayCount}`;

      created(id, createElement(OverlayHost, { render, remove: () => unmount(id) }));
    },
    [created, unmount],
  );

  return { open };
};
