import { Box, Button, Typography } from "@mui/material";
import { DeleteForeverOutlined, InfoOutlined } from "@mui/icons-material";
import { useEmptyTrash } from "@/entities/note";

export const NoteTrashActions = () => {
  const emptyTrash = useEmptyTrash();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        bgcolor: "#fef7e0",
        border: "1px solid #fde293",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <InfoOutlined sx={{ fontSize: 18, color: "#b06000" }} />
        <Typography
          variant="body2"
          sx={{ color: "#5f3700", fontSize: "0.8125rem" }}
        >
          휴지통의 메모는 7일 후 자동으로 삭제돼요.
        </Typography>
      </Box>
      <Button
        size="small"
        startIcon={<DeleteForeverOutlined sx={{ fontSize: 16 }} />}
        onClick={() => emptyTrash.mutate()}
        disabled={emptyTrash.isPending}
        sx={{
          textTransform: "none",
          flexShrink: 0,
          color: "#b06000",
          fontWeight: 500,
          fontSize: "0.8125rem",
          "&:hover": { bgcolor: "rgba(176,96,0,0.08)" },
        }}
      >
        휴지통 비우기
      </Button>
    </Box>
  );
};
