import { useState } from "react";
import { AddOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

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
      <Hb.ButtonBase
        onClick={() => setIsOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          mt: 1,
          py: 0.75,
          px: 1,
          borderRadius: 1.5,
          color: "text.disabled",
          fontSize: 13,
          fontWeight: 500,
          width: "100%",
          justifyContent: "flex-start",
          "&:hover": { bgcolor: "action.hover", color: "text.secondary" },
          transition: "all 0.15s",
        }}
      >
        <AddOutlined sx={{ fontSize: 18 }} />
        이슈 만들기
      </Hb.ButtonBase>
    );
  }

  return (
    <Hb.Box sx={{ mt: 1 }}>
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
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            fontSize: 13,
          },
        }}
      />
    </Hb.Box>
  );
};
