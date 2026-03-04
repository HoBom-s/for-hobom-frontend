export interface SpaceType {
  id: string;
  key: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpaceRequest {
  key: string;
  name: string;
  description?: string | null;
}

export interface UpdateSpaceRequest {
  name: string;
  description?: string | null;
}
