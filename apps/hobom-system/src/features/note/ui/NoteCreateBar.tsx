import { CheckBoxOutlined, BrushOutlined } from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";

interface NoteCreateBarProps {
  onClick: () => void;
}

const styles = stylex.create({
  bar: {
    display: "flex",
    alignItems: "center",
    paddingInline: 16,
    paddingBlock: 10,
    maxWidth: 600,
    marginInline: "auto",
    marginBottom: 32,
    cursor: "text",
    borderRadius: 16,
    backgroundColor: "var(--hb-color-surface)",
    border: "1px solid #e0e0e0",
    transition: "box-shadow 0.08s linear",
    boxShadow: {
      default: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
      ":hover": "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)",
    },
  },
});

export const NoteCreateBar = ({ onClick }: NoteCreateBarProps) => {
  return (
    <div {...stylex.props(styles.bar)} onClick={onClick}>
      <Hb.Text
        sx={{
          flex: 1,
          color: "text.secondary",
          fontSize: "0.875rem",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        메모 작성...
      </Hb.Text>
      <Hb.Box sx={{ display: "flex", gap: 0.25, ml: 2 }} onClick={(e) => e.stopPropagation()}>
        <Hb.Tooltip title="체크리스트" arrow>
          <Hb.Button.Icon
            size="small"
            aria-label="체크리스트"
            sx={{ color: "text.secondary" }}
            onClick={onClick}
          >
            <CheckBoxOutlined sx={{ fontSize: 20 }} />
          </Hb.Button.Icon>
        </Hb.Tooltip>
        <Hb.Tooltip title="그리기" arrow>
          <Hb.Button.Icon
            size="small"
            aria-label="그리기"
            sx={{ color: "text.secondary" }}
            onClick={onClick}
          >
            <BrushOutlined sx={{ fontSize: 20 }} />
          </Hb.Button.Icon>
        </Hb.Tooltip>
      </Hb.Box>
    </div>
  );
};
