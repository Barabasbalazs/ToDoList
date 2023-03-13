import { ToDoItem } from "../models/todoitem-model";

export interface RequestParameters {
    search?: string;
    order?: string;
    sort?: string;
    id?: string;
    todo?: Partial<ToDoItem>;
}