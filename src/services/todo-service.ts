import envVariables from '../config/env-variables';
import { ToDoItem } from '../models/todoitem-model';
import { RequestParameters } from '../types/request-parameter-type';
import { handleRequest, handleResponse } from '../utils/fetch-requests';

const todoUrl = envVariables.todoUrl();

export const todoService = {
  getAll: async (authToken: string, params: RequestParameters) => {
    const resp = await handleRequest(`${todoUrl}`, 'GET', authToken, params);
    return await handleResponse(resp);
  },
  addToDo: async (authToken: string, todo: Partial<ToDoItem>) => {
    const resp = await handleRequest(`${todoUrl}`, 'POST', authToken, todo);
    return await handleResponse(resp);
  },
  removeToDo: async (authToken: string, id: string) => {
    const resp = await handleRequest(`${todoUrl}`, 'DELETE', authToken, {id});
    return await handleResponse(resp);
  },
  updateToDo: async (authToken: string ,todo: Partial<ToDoItem>) => {
    const resp = await handleRequest(`${todoUrl}`, 'PUT', authToken, {id: todo._id, todo});
    return await handleResponse(resp);
  }
};
