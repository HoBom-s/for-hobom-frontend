import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { KanbanBoard } from "@/features/kanban-board";
import { CreateIssueDialog } from "@/features/create-issue";

export const KanbanBoardWorkspace = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!projectId) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddOutlined />}
          onClick={() => setDialogOpen(true)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { boxShadow: "0 2px 8px rgba(70,128,255,0.3)" },
          }}
        >
          이슈 만들기
        </Button>
      </Box>

      <KanbanBoard projectId={projectId} />

      <CreateIssueDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={(data) => {
          // TODO: API 연동 후 실제 이슈 생성
          console.log("Create issue:", data);
        }}
      />
    </Box>
  );
};
