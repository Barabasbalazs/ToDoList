import { ToDoItem } from '../models/todoitem-model';
import { RequestParameters } from '../types/request-parameter-type';

export const fetchReq = (
  url: string,
  method: string,
  authToken: string,
  params?: RequestParameters|Partial<ToDoItem>
) => {
  if (method === 'GET') {
    if (params) {
      let queryString = '?';
      Object.keys(params).forEach((key) => {
        queryString = `${queryString}${key}=${params[key as keyof Object]}&`;
      });
      url = `${url}${queryString}`;
    }
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      mode: 'cors',
    });
  } else if (method === 'POST') {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: params ? JSON.stringify(params) : '{}',
      mode: 'cors',
    });
  } else if (method === 'DELETE') {
    const deleteUrl = `${url}/${params?.id}`;
    return fetch(deleteUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      mode: 'cors',
    });
  } else {
    // PUT
    const reqpars = params as RequestParameters;
    const putUrl = `${url}/${params?.id}`;
    return fetch(putUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      mode: 'cors',
      body: JSON.stringify(reqpars?.todo),
    });
  }
};
