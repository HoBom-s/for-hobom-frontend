import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { sanitizeHtml } from "../lib/sanitize-html.lib";

interface UsePageEditorOptions {
  initialContent?: string;
  editable?: boolean;
}

export const usePageEditor = ({
  initialContent = "",
  editable = true,
}: UsePageEditorOptions = {}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: { class: "code-block" },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
        },
      }),
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
    ],
    content: sanitizeHtml(initialContent),
    editable,
  });

  const getHtml = (): string => {
    if (!editor) return "";

    return sanitizeHtml(editor.getHTML());
  };

  const isEmpty = editor?.isEmpty ?? true;

  return { editor, getHtml, isEmpty };
};
