import { useState } from "react";

export const useProjectDialogs = () => {
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [sprintDialogOpen, setSprintDialogOpen] = useState(false);
  const [defaultParentId, setDefaultParentId] = useState<string>();
  const [detailIssueId, setDetailIssueId] = useState<string | null>(null);

  const handleCreateChildIssue = (parentId: string) => {
    setDefaultParentId(parentId);
    setIssueDialogOpen(true);
  };

  const handleOpenIssueDetail = (issueId: string) => {
    setDetailIssueId(issueId);
  };

  const closeIssueDialog = () => {
    setIssueDialogOpen(false);
    setDefaultParentId(undefined);
  };

  return {
    issueDialog: {
      open: issueDialogOpen,
      close: closeIssueDialog,
      defaultParentId,
      setOpen: setIssueDialogOpen,
    },
    sprintDialog: {
      open: sprintDialogOpen,
      close: () => setSprintDialogOpen(false),
      setOpen: setSprintDialogOpen,
    },
    detailIssueId,
    setDetailIssueId,
    handleCreateChildIssue,
    handleOpenIssueDetail,
  };
};
