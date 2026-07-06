import { DeleteForeverOutlined, InfoOutlined } from "hobom-design-system/icons";
import { useEmptyTrash } from "@/entities/note";
import { Hb } from "@/shared/ui";

export const NoteTrashActions = () => {
  const emptyTrash = useEmptyTrash();

  return (
    <Hb.Box
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
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <InfoOutlined sx={{ fontSize: 18, color: "#b06000" }} />
        <Hb.Text
          variant="body2"
          style={{
            color: "#5f3700",
            fontSize: "0.8125rem",
          }}
        >
          휴지통의 메모는 7일 후 자동으로 삭제돼요.
        </Hb.Text>
      </Hb.Box>
      <Hb.Button
        size="small"
        variant="ghost"
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
      </Hb.Button>
    </Hb.Box>
  );
};
