import type { ProjectType } from "@/entities/project";

export const makeProject = (overrides: Partial<ProjectType> = {}): ProjectType => ({
  id: "proj-1",
  key: "PROJ",
  name: "Test Project",
  owner: "user-1",
  members: [
    { userId: "user-1", role: "ADMIN", joinedAt: "2026-01-01" },
    { userId: "user-2", role: "MEMBER", joinedAt: "2026-01-02" },
  ],
  issueSequence: 10,
  workflow: null,
  ...overrides,
});
