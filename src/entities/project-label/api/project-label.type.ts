export interface ProjectLabelType {
  id: string;
  name: string;
  color: string;
}

export interface CreateProjectLabelRequest {
  name: string;
  color: string;
}

export interface UpdateProjectLabelRequest {
  name: string;
  color: string;
}
