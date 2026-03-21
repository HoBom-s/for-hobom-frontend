export interface LabelType {
  id: string;
  spaceId: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface CreateLabelRequest {
  name: string;
  color: string;
}

export interface UpdateLabelRequest {
  name: string;
  color: string;
}

export interface AddPageLabelRequest {
  labelId: string;
}

export interface LabelPageType {
  id: string;
  spaceId: string;
  title: string;
  updatedAt: string;
}
