import { useState } from "react";

export const usePopoverState = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return {
    anchor,
    open: (e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget),
    close: () => setAnchor(null),
    isOpen: Boolean(anchor),
  };
};
