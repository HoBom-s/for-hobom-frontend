export interface ProjectSummaryType {
  id: { value: string };
  key: string;
  name: string;
  issueCount: number;
  sprintCount: number;
  lead: { id: string; name: string };
}
