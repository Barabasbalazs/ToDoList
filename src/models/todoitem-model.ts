export enum Priority {
  high = 'High',
  medium = 'Medium',
  low = 'Low',
}

export interface ToDoItem {
  id?: string;
  _id: string;
  title: string;
  text: string;
  priority: Priority | number;
  createdAt: string;
  isResolved: boolean;
}