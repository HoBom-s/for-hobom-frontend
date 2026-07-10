import { useEffect, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";

const styles = stylex.create({
  swatch: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    cursor: "pointer",
    transition: "border-color 0.15s",
    ":hover": { opacity: 0.8 },
    ":focus-visible": {
      outline: "2px solid",
      outlineColor: "var(--hb-color-accent)",
      outlineOffset: 2,
    },
  },
});

const LABEL_COLORS: { hex: string; name: string }[] = [
  { hex: "#4680ff", name: "파랑" },
  { hex: "#28a745", name: "초록" },
  { hex: "#fd7e14", name: "주황" },
  { hex: "#dc3545", name: "빨강" },
  { hex: "#6f42c1", name: "보라" },
  { hex: "#20c997", name: "민트" },
  { hex: "#e83e8c", name: "분홍" },
  { hex: "#6c757d", name: "회색" },
];

interface CreateLabelDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, color: string) => void;
  loading?: boolean;
  initialName?: string;
  initialColor?: string;
  title?: string;
}

export const CreateLabelDialog = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  initialName = "",
  initialColor = LABEL_COLORS[0]?.hex ?? "#4680ff",
  title = "라벨 생성",
}: CreateLabelDialogProps) => {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setColor(initialColor);
    }
  }, [open, initialName, initialColor]);

  const handleSubmit = () => {
    if (loading) return;
    const trimmed = name.trim();

    if (!trimmed) return;
    onSubmit(trimmed, color);
  };

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="xs">
      <Hb.Dialog.Title>{title}</Hb.Dialog.Title>
      <Hb.Dialog.Content>
        <Hb.TextField
          autoFocus
          fullWidth
          label="라벨 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          disabled={loading}
          style={{
            marginTop: 8,
            marginBottom: 16
          }}
        />
        <Hb.Text
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          style={{
            marginBottom: 8,
          }}
          id="color-picker-label"
        >
          색상
        </Hb.Text>
        <Hb.Box
          role="radiogroup"
          aria-labelledby="color-picker-label"
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 4,
          }}
        >
          {LABEL_COLORS.map((c) => (
            <Hb.Box
              key={c.hex}
              role="radio"
              tabIndex={0}
              aria-checked={color === c.hex}
              aria-label={c.name}
              onClick={() => setColor(c.hex)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setColor(c.hex);
                }
              }}
              {...stylex.props(styles.swatch)}
              style={{
                backgroundColor: c.hex,
                border: color === c.hex ? "2px solid" : "2px solid transparent",
                borderColor: color === c.hex ? "var(--hb-color-text-primary)" : "transparent",
              }}
            />
          ))}
        </Hb.Box>
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button onClick={onClose} disabled={loading}>
          취소
        </Hb.Button>
        <Hb.Button
          onClick={handleSubmit}
          variant="primary"
          loading={loading}
          disabled={!name.trim()}
        >
          저장
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
