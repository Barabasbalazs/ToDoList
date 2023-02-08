export enum Priority {
  high = 'High',
  medium = 'Medium',
  low = 'Low',
}

export interface ToDoItem {
  id: number;
  title: string;
  text: string;
  priority: Priority;
  createdAt: Date;
  isResolved: boolean;
}
