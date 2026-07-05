import { useCallback, useState } from "react";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  HorizontalRule,
  Link as LinkIcon,
  LinkOff,
} from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import type { Editor } from "@tiptap/react";

interface PageEditorToolbarProps {
  editor: Editor | null;
}

export const PageEditorToolbar = ({ editor }: PageEditorToolbarProps) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const handleLinkSubmit = useCallback(() => {
    if (!editor || !linkUrl) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
    setLinkUrl("");
    setLinkDialogOpen(false);
  }, [editor, linkUrl]);

  if (!editor) return null;

  const toolbarItems = [
    {
      icon: <FormatBold fontSize="small" />,
      label: "굵게",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: <FormatItalic fontSize="small" />,
      label: "기울임",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: <FormatUnderlined fontSize="small" />,
      label: "밑줄",
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      icon: <FormatStrikethrough fontSize="small" />,
      label: "취소선",
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
    },
  ];

  const headingItems = [
    {
      label: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
    },
    {
      label: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "H3",
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
    },
  ];

  const blockItems = [
    {
      icon: <FormatListBulleted fontSize="small" />,
      label: "순서 없는 목록",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: <FormatListNumbered fontSize="small" />,
      label: "순서 있는 목록",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      icon: <FormatQuote fontSize="small" />,
      label: "인용",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
    },
    {
      icon: <Code fontSize="small" />,
      label: "코드 블록",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
    },
    {
      icon: <HorizontalRule fontSize="small" />,
      label: "구분선",
      action: () => editor.chain().focus().setHorizontalRule().run(),
      active: false,
    },
  ];

  return (
    <>
      <Hb.Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.25,
          px: 1,
          py: 0.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          flexWrap: "wrap",
        }}
      >
        {toolbarItems.map((item) => (
          <Hb.Tooltip key={item.label} title={item.label}>
            <Hb.Button.Icon
              size="small"
              aria-label={item.label}
              onClick={item.action}
              sx={{ color: item.active ? "primary.main" : "action.active" }}
            >
              {item.icon}
            </Hb.Button.Icon>
          </Hb.Tooltip>
        ))}

        <Hb.Divider
          orientation="vertical"
          flexItem
          style={{
            marginLeft: 4,
            marginRight: 4,
          }}
        />

        {headingItems.map((item) => (
          <Hb.Tooltip key={item.label} title={`제목 ${item.label}`}>
            <Hb.Button.Icon
              size="small"
              aria-label={`제목 ${item.label}`}
              onClick={item.action}
              sx={{
                color: item.active ? "primary.main" : "action.active",
                fontSize: "0.75rem",
                fontWeight: 700,
                width: 28,
                height: 28,
              }}
            >
              {item.label}
            </Hb.Button.Icon>
          </Hb.Tooltip>
        ))}

        <Hb.Divider
          orientation="vertical"
          flexItem
          style={{
            marginLeft: 4,
            marginRight: 4,
          }}
        />

        {blockItems.map((item) => (
          <Hb.Tooltip key={item.label} title={item.label}>
            <Hb.Button.Icon
              size="small"
              aria-label={item.label}
              onClick={item.action}
              sx={{ color: item.active ? "primary.main" : "action.active" }}
            >
              {item.icon}
            </Hb.Button.Icon>
          </Hb.Tooltip>
        ))}

        <Hb.Divider
          orientation="vertical"
          flexItem
          style={{
            marginLeft: 4,
            marginRight: 4,
          }}
        />

        <Hb.Tooltip title="링크 추가">
          <Hb.Button.Icon
            size="small"
            aria-label="링크 추가"
            onClick={() => setLinkDialogOpen(true)}
            sx={{
              color: editor.isActive("link") ? "primary.main" : "action.active",
            }}
          >
            <LinkIcon fontSize="small" />
          </Hb.Button.Icon>
        </Hb.Tooltip>
        {editor.isActive("link") && (
          <Hb.Tooltip title="링크 제거">
            <Hb.Button.Icon
              size="small"
              aria-label="링크 제거"
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              <LinkOff fontSize="small" />
            </Hb.Button.Icon>
          </Hb.Tooltip>
        )}
      </Hb.Box>
      <Hb.Dialog.Root open={linkDialogOpen} onClose={() => setLinkDialogOpen(false)} size="xs">
        <Hb.Dialog.Title>링크 추가</Hb.Dialog.Title>
        <Hb.Dialog.Content>
          <Hb.TextField
            autoFocus
            fullWidth
            label="URL"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLinkSubmit();
            }}
            sx={{ mt: 1 }}
          />
        </Hb.Dialog.Content>
        <Hb.Dialog.Actions>
          <Hb.Button onClick={() => setLinkDialogOpen(false)}>취소</Hb.Button>
          <Hb.Button onClick={handleLinkSubmit} variant="primary" disabled={!linkUrl}>
            확인
          </Hb.Button>
        </Hb.Dialog.Actions>
      </Hb.Dialog.Root>
    </>
  );
};
