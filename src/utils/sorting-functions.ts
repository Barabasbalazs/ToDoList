import { ToDoItem, Priority } from '../models/todoitem-model';

export function sortByTitle(items: ToDoItem[], order: number): ToDoItem[] {
    const orderedItems = items;
    if (order === 1) {
        orderedItems.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();

            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });
    } else {
        orderedItems.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();

            if (titleA > titleB) {
                return -1;
            }
            if (titleA < titleB) {
                return 1;
            }
            return 0;
        });
    }
    return orderedItems;
}

export function sortByText(items: ToDoItem[], order: number): ToDoItem[] {
    const orderedItems = items;
    if (order === 1) {
        orderedItems.sort((a, b) => {
            const textA = a.text.toLowerCase();
            const textB = b.text.toLowerCase();

            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }
            return 0;
        });
    } else {
        orderedItems.sort((a, b) => {
            const textA = a.text.toLowerCase();
            const textB = b.text.toLowerCase();

            if (textA > textB) {
                return -1;
            }
            if (textA < textB) {
                return 1;
            }
            return 0;
        });
    }
    return orderedItems;
}

function isHigherPriority(a: Priority, b: Priority): boolean {
    if (a === b) {
        return true;
    }
    // a is High and b is not equal to it, so it must be lower
    if (a === Priority.high) {
        return true;
    }
    // a is Medium, either b is higher or lower
    if (a === Priority.medium) {
        if (b === Priority.low) {
            return true;
        }
        return false;
    }
    // a is lower, and b is not equal to it, so it must be higher
    return false;
}

export function sortByPriority(items: ToDoItem[], order: number): ToDoItem[] {
    const orderedItems = items;
    if (order === 1) {
        orderedItems.sort((a, b) => {
            const priorityA = a.priority;
            const priorityB = b.priority;

            if (isHigherPriority(priorityA, priorityB)) {
                return 1;
            }
            return -1;
        });
    } else {
        orderedItems.sort((a, b) => {
            const priorityA = a.priority;
            const priorityB = b.priority;

            if (!isHigherPriority(priorityA, priorityB)) {
                return 1;
            }
            return -1;
        });
    }
    return orderedItems;
}

export function sortByDate(items: ToDoItem[], order: number): ToDoItem[] {
    const orderedItems = items;
    orderedItems.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
    });
    if (order === -1) {
        return orderedItems.reverse();
    }
    return orderedItems;
}