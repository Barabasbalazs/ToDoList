import { ToDoItem } from '../models/todoitem-model';

export type FilterType = keyof Omit<ToDoItem, 'isResolved' | 'id'>;
