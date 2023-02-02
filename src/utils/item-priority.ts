import { Priority } from "../models/todoitem-model";

export function getItemPriority (priorityOfThisItem : Priority) {
    const priorityMap = {
      [Priority.low] : 'bg-blue',
      [Priority.medium] : 'bg-yellow',
      [Priority.high] : 'bg-red',
    } as const;

    return priorityMap[priorityOfThisItem];
}