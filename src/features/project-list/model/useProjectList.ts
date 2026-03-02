import { useState } from "react";
import type { ProjectSummaryType } from "@/entities/project";

const MOCK_PROJECTS: ProjectSummaryType[] = [
  {
    id: { value: "proj-1" },
    key: "HOBOM",
    name: "HoBom 백오피스",
    issueCount: 12,
    sprintCount: 2,
    lead: { id: "user-1", name: "김호범" },
  },
  {
    id: { value: "proj-2" },
    key: "MOBILE",
    name: "HoBom 모바일",
    issueCount: 8,
    sprintCount: 1,
    lead: { id: "user-2", name: "이범호" },
  },
  {
    id: { value: "proj-3" },
    key: "INFRA",
    name: "인프라 관리",
    issueCount: 5,
    sprintCount: 0,
    lead: { id: "user-1", name: "김호범" },
  },
];

export const useProjectList = () => {
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  const addProject = (data: {
    key: string;
    name: string;
    description?: string;
  }) => {
    const newProject: ProjectSummaryType = {
      id: { value: `proj-${Date.now()}` },
      key: data.key,
      name: data.name,
      issueCount: 0,
      sprintCount: 0,
      lead: { id: "user-1", name: "김호범" },
    };
    setProjects((prev) => [...prev, newProject]);
  };

  return { projects, addProject };
};
