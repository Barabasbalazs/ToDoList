import envVariables from '../config/env-variables';
import { Priority, ToDoItem } from '../models/todoitem-model';
import { RequestParameters } from '../types/request-parameter-type';
import { fetchReq } from '../utils/fetch-requests';
import { getItemPriorityInNumbers } from '../utils/item-priority';

const todoUrl = envVariables.todoUrl();

export const todoService = {
  getAll: async (authToken: string, params: RequestParameters) => {
    const resp = await fetchReq(`${todoUrl}`, 'GET', authToken, params);
    if (resp.status === 200 || resp.status < 300) {
      const response = await resp.json();
      return response;
    }
    return false;
  },
  addToDo: async (authToken: string, todo: Partial<ToDoItem>) => {
    const resp = await fetchReq(`${todoUrl}`, 'POST', authToken, todo);
    if (resp.status === 200 || resp.status < 300) {
      const response = await resp.json();
      return response;
    }
    return false;
  },
  removeToDo: async (authToken: string, id: string) => {
    const resp = await fetchReq(`${todoUrl}`, 'DELETE', authToken, {id});
    if (resp.status === 200 || resp.status < 300) {
      const response = await resp.json();
      return response;
    }
    return false;
  },
  updateToDo: async (authToken: string ,todo: Partial<ToDoItem>) => {
    const resp = await fetchReq(`${todoUrl}`, 'PUT', authToken, {id: todo._id, todo});
    if (resp.status === 200 || resp.status < 300) {
      const response = await resp.json();
      return response;
    }
    return false;
  }
};
