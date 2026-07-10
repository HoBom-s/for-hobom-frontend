import { useCallback, useState } from "react";

/**
 * A set of "open" string keys with a toggle — backs the collapsible nav
 * sections and item groups in the sidebar.
 */
export const useToggleSet = (
  init: () => Set<string>,
): [Set<string>, (key: string) => void] => {
  const [open, setOpen] = useState(init);

  const toggle = useCallback((key: string) => {
    setOpen((prev) => {
      const next = new Set(prev);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }, []);

  return [open, toggle];
};
