export interface WorkflowStatus {
  id: string;
  name: string;
  isDone: boolean;
  order: number;
}

export interface WorkflowTransition {
  from: string;
  to: string;
  name: string;
}

export interface UpdateWorkflowRequest {
  statuses: WorkflowStatus[];
  transitions: WorkflowTransition[];
}
