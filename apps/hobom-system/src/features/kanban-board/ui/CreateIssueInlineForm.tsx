import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { AddOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    paddingBlock: 6,
    paddingInline: 8,
    borderRadius: 12,
    color: {
      default: "var(--hb-color-text-disabled)",
      ":hover": "var(--hb-color-text-secondary)",
    },
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(0,0,0,0.04)",
    },
    fontSize: 13,
    fontWeight: 500,
    width: "100%",
    justifyContent: "flex-start",
    transition: "all 0.15s",
  },
});

interface CreateIssueInlineFormProps {
  onSubmit: (title: string) => void;
}

export const CreateIssueInlineForm = ({ onSubmit }: CreateIssueInlineFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit(title.trim());
    setTitle("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Hb.ButtonBase onClick={() => setIsOpen(true)} {...stylex.props(styles.root)}>
        <AddOutlined sx={{ fontSize: 18 }} />
        이슈 만들기
      </Hb.ButtonBase>
    );
  }

  return (
    <Hb.Box
      style={{
        marginTop: 8,
      }}
    >
      <Hb.TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") {
            setIsOpen(false);
            setTitle("");
          }
        }}
        onBlur={() => {
          if (!title.trim()) setIsOpen(false);
        }}
        autoFocus
        size="small"
        fullWidth
        placeholder="이슈 제목을 입력하세요"
        data-no-dnd
        slotProps={{
          input: { style: { borderRadius: 16 } },
          htmlInput: { style: { fontSize: 13 } },
        }}
      />
    </Hb.Box>
  );
};
