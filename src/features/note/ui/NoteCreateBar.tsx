import { Paper, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { CheckBoxOutlined, BrushOutlined } from "@mui/icons-material";

interface NoteCreateBarProps {
  onClick: () => void;
}

export const NoteCreateBar = ({ onClick }: NoteCreateBarProps) => {
  return (
    <Paper
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
        boxShadow:
          "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
        transition: "box-shadow 0.08s linear",
        "&:hover": {
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)",
        },
      }}
      onClick={onClick}
      elevation={0}
    >
      <Typography
        sx={{
          flex: 1,
          color: "text.secondary",
          fontSize: "0.875rem",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        메모 작성...
      </Typography>
      <Box
        sx={{ display: "flex", gap: 0.25, ml: 2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip title="체크리스트" arrow>
          <IconButton
            size="small"
            sx={{ color: "text.secondary" }}
            onClick={onClick}
          >
            <CheckBoxOutlined sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="그리기" arrow>
          <IconButton
            size="small"
            sx={{ color: "text.secondary" }}
            onClick={onClick}
          >
            <BrushOutlined sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};
