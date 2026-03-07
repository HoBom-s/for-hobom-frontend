import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PARENT_ISSUE_KINDS,
  issueQueries,
  useCreateIssue,
  type IssueKind,
  type IssuePriority,
  type IssueType,
} from "@/entities/issue";
import { sprintQueries, type SprintType } from "@/entities/sprint";
import { projectLabelQueries } from "@/entities/project-label";

interface UseCreateIssueFormParams {
  projectId: string;
  defaultParentId?: string;
  enabled: boolean;
  onSuccess: () => void;
}

export const useCreateIssueForm = ({
  projectId,
  defaultParentId,
  enabled,
  onSuccess,
}: UseCreateIssueFormParams) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<IssueKind>("TASK");
  const [priority, setPriority] = useState<IssuePriority>("MEDIUM");
  const [parentIssue, setParentIssue] = useState<IssueType | null>(null);
  const [sprint, setSprint] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [labelAnchor, setLabelAnchor] = useState<HTMLElement | null>(null);

  const { mutate, isPending } = useCreateIssue();

  const { data: issueData } = useQuery({
    ...issueQueries.listByProject(projectId),
    enabled,
  });
  const { data: sprintData } = useQuery({
    ...sprintQueries.listByProject(projectId),
    enabled,
  });
  const { data: labelData } = useQuery({
    ...projectLabelQueries.listByProject(projectId),
    enabled,
  });

  const activeSprints = (sprintData?.items ?? []).filter(
    (s: SprintType) => s.status !== "CLOSED",
  );
  const allLabels = labelData?.items ?? [];
  const labelMap = new Map(allLabels.map((l) => [l.id, l]));
  const parentCandidates = (issueData?.items ?? []).filter((i) =>
    PARENT_ISSUE_KINDS.has(i.type),
  );

  useEffect(() => {
    if (!enabled || !defaultParentId || !issueData) return;
    const found = issueData.items.find(
      (i) => i.id === defaultParentId && PARENT_ISSUE_KINDS.has(i.type),
    );
    if (found) setParentIssue(found);
  }, [enabled, defaultParentId, issueData]);

  const reset = () => {
    setTitle("");
    setDescription("");
    setKind("TASK");
    setPriority("MEDIUM");
    setParentIssue(null);
    setSprint("");
    setSelectedLabels([]);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    mutate(
      {
        projectId,
        title: title.trim(),
        description: description || undefined,
        type: kind,
        priority,
        parent: parentIssue?.id,
        sprint: sprint || undefined,
        labels: selectedLabels.length > 0 ? selectedLabels : undefined,
      },
      {
        onSuccess: () => {
          onSuccess();
          reset();
        },
      },
    );
  };

  return {
    fields: {
      title,
      setTitle,
      description,
      setDescription,
      kind,
      setKind,
      priority,
      setPriority,
      parentIssue,
      setParentIssue,
      sprint,
      setSprint,
      selectedLabels,
      setSelectedLabels,
    },
    labelAnchor,
    setLabelAnchor,
    handleSubmit,
    isPending,
    parentCandidates,
    activeSprints,
    labelMap,
  };
};
