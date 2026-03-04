export interface ProjectMemberType {
  userId: string;
  role: string;
  joinedAt: string;
}

export interface ProjectType {
  id: string;
  key: string;
  name: string;
  description?: string;
  owner: string;
  members: ProjectMemberType[];
  issueSequence: number;
}

export interface CreateProjectRequest {
  key: string;
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name: string;
  description?: string;
}
