import { useState } from "react";
import { SendOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSend, disabled }: Props) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();

    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Hb.Stack
      direction="row"
      spacing={1}
      style={{
        alignItems: "flex-end",
      }}
    >
      <Hb.TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="개인정보보호법에 대해 질문하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        size="small"
      />
      <Hb.Button.Icon
        sx={{ color: "primary.main" }}
        onClick={handleSend}
        disabled={disabled || !value.trim()}
      >
        <SendOutlined />
      </Hb.Button.Icon>
    </Hb.Stack>
  );
};
