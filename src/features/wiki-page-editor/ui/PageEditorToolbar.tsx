import { useCallback, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
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
} from "@mui/icons-material";
import type { Editor } from "@tiptap/react";

interface PageEditorToolbarProps {
  editor: Editor | null;
}

export const PageEditorToolbar = ({ editor }: PageEditorToolbarProps) => {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const handleLinkSubmit = useCallback(() => {
    if (!editor || !linkUrl) return;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
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
      <Box
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
          <Tooltip key={item.label} title={item.label}>
            <IconButton
              size="small"
              onClick={item.action}
              color={item.active ? "primary" : "default"}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {headingItems.map((item) => (
          <Tooltip key={item.label} title={`제목 ${item.label}`}>
            <IconButton
              size="small"
              onClick={item.action}
              color={item.active ? "primary" : "default"}
              sx={{
                fontSize: "0.75rem",
                fontWeight: 700,
                width: 28,
                height: 28,
              }}
            >
              {item.label}
            </IconButton>
          </Tooltip>
        ))}

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {blockItems.map((item) => (
          <Tooltip key={item.label} title={item.label}>
            <IconButton
              size="small"
              onClick={item.action}
              color={item.active ? "primary" : "default"}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        <Tooltip title="링크 추가">
          <IconButton
            size="small"
            onClick={() => setLinkDialogOpen(true)}
            color={editor.isActive("link") ? "primary" : "default"}
          >
            <LinkIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {editor.isActive("link") && (
          <Tooltip title="링크 제거">
            <IconButton
              size="small"
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
              <LinkOff fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Dialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>링크 추가</DialogTitle>
        <DialogContent>
          <TextField
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLinkDialogOpen(false)}>취소</Button>
          <Button
            onClick={handleLinkSubmit}
            variant="contained"
            disabled={!linkUrl}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
