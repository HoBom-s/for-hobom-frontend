export interface LabelItemType {
  id: string;
  title: string;
  ownerId: string;
}

export interface CreateLabelRequest {
  title: string;
}

export interface UpdateLabelRequest {
  title: string;
}
