import { DeleteForeverOutlined, InfoOutlined } from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { useEmptyTrash } from "@/entities/note";
import { Hb } from "@/shared/ui";

const styles = stylex.create({
  emptyButton: {
    textTransform: "none",
    flexShrink: 0,
    color: "#b06000",
    fontWeight: 500,
    fontSize: "0.8125rem",
    ":hover": { backgroundColor: "rgba(176,96,0,0.08)" },
  },
});

export const NoteTrashActions = () => {
  const emptyTrash = useEmptyTrash();

  return (
    <Hb.Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 16,
        backgroundColor: "#fef7e0",
        border: "1px solid #fde293",
      }}
    >
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
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
        {...stylex.props(styles.emptyButton)}
      >
        휴지통 비우기
      </Hb.Button>
    </Hb.Box>
  );
};
