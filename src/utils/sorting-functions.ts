import { ToDoItem, Priority } from '../models/todoitem-model';
import { FilterType } from '../types/filter-type';

const priorityMap = {
  [Priority.low]: 0,
  [Priority.medium]: 1,
  [Priority.high]: 2,
} as const;

export function sortBySpecificKey(key: FilterType, order: number) {
  return function (a: ToDoItem, b: ToDoItem) {
    let stringOfA: string | number = a[key].toLowerCase();
    let stringOfB: string | number = b[key].toLowerCase();
    if (key === 'priority') {
      stringOfA = priorityMap[a[key]];
      stringOfB = priorityMap[b[key]];
    }
    if (key === 'createdAt') {
      stringOfA = new Date(a[key]).getTime();
      stringOfB = new Date(b[key]).getTime();
    }

    return stringOfA > stringOfB ? order : stringOfA < stringOfB ? -order : 0;
  };
}
