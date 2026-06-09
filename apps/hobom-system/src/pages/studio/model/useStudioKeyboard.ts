import { useEffect } from "react";

interface StudioKeyboardHandlers {
  onDelete: () => void;
  onDeselect: () => void;
}

/**
 * Studio 전역 키보드 단축키.
 * - Escape: 선택 해제
 * - Delete/Backspace: 선택 노드 삭제
 * 입력 요소(input/textarea/contenteditable)에 포커스된 동안은 무시한다.
 */
export function useStudioKeyboard({ onDelete, onDeselect }: StudioKeyboardHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;

      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, [contenteditable='true']")
      ) {
        return;
      }

      if (event.key === "Escape") {
        onDeselect();

        return;
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        onDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDelete, onDeselect]);
}
