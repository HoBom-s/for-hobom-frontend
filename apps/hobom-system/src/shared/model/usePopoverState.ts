import { useState } from "react";

/** MUI Popover 앵커 상태 관리 훅. `anchor`를 Popover의 `anchorEl`에 전달한다. */
export const usePopoverState = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return {
    anchor,
    open: (e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget),
    close: () => setAnchor(null),
    isOpen: Boolean(anchor),
  };
};
