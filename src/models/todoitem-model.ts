export enum Status {
    done = 'done',
    notresolved = 'notresolved'
}

export enum Priority {
    high = 'High',
    medium = 'Medium',
    low = 'Low'
}

export interface ToDoItem {
    title: string;
    text: string;
    priority: Priority;
    createdAt: Date;
    status: Status;
}