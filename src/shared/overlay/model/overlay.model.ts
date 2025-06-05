import type { JSX } from "react";

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
}

export type OverlayElem = (props: OverlayProps) => JSX.Element;
