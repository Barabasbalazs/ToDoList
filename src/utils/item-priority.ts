import { Priority } from '../models/todoitem-model';
import { PriorityNumberType } from '../types/priority-number-type';

export function getItemPriority<T extends Priority>(priorityOfThisItem: T) {
  const priorityMap = {
    [Priority.low]: 'bg-blue',
    [Priority.medium]: 'bg-yellow',
    [Priority.high]: 'bg-red',
  } as const;

  return priorityMap[priorityOfThisItem];
}

export function getItemPriorityInNumbers<T extends Priority>(priorityOfThisItem: T) {
  const priorityMap = {
    [Priority.low]: 0,
    [Priority.medium]: 1,
    [Priority.high]: 2,
  } as const;

  return priorityMap[priorityOfThisItem];
}

export function reversePriority<T extends Priority>(priorityOfThisItem: PriorityNumberType) {
  const priorityMap = {
    [0]: Priority.low,
    [1]: Priority.medium,
    [2]: Priority.high,
  } as const;

  return priorityMap[priorityOfThisItem];
}