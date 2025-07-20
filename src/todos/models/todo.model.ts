export type Priority = 'low' | 'medium' | 'high';

export class Todo {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  tags?: string[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}
