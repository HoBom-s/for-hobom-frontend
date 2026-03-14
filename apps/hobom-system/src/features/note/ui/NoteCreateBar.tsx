import { CheckBoxOutlined, BrushOutlined } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

interface NoteCreateBarProps {
  onClick: () => void;
}

export const NoteCreateBar = ({ onClick }: NoteCreateBarProps) => {
  return (
    <Hb.Paper
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 1.25,
        maxWidth: 600,
        mx: "auto",
        mb: 4,
        cursor: "text",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
        transition: "box-shadow 0.08s linear",
        "&:hover": {
          boxShadow: "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)",
        },
      }}
      onClick={onClick}
      elevation={0}
    >
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
    </Hb.Paper>
  );
};
