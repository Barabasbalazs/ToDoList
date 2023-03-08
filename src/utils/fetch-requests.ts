import { ToDoItem } from '../models/todoitem-model';
import { User } from '../models/user-model';
import { RequestParameters } from '../types/request-parameter-type';

export const handleRequest = (
  url: string,
  method: string,
  authToken: string,
  params?: RequestParameters | Partial<ToDoItem> | User
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`,
  };
  switch (method) {
    case 'GET': {
      if (params) {
        let queryString = '?';
        Object.keys(params).forEach((key) => {
          queryString = `${queryString}${key}=${params[key as keyof Object]}&`;
        });
        url = `${url}${queryString}`;
      }
      return fetch(url, {
        method,
        headers,
        mode: 'cors',
      });
    }
    case 'POST': {
      return fetch(url, {
        method,
        headers,
        body: params ? JSON.stringify(params) : '{}',
        mode: 'cors',
      });
    }
    case 'DELETE': {
      const deleteUrl = `${url}/${params?.id}`;
      return fetch(deleteUrl, {
        method,
        headers,
        mode: 'cors',
      });
    }
    default: {
      // PUT
      const reqpars = params as RequestParameters;
      const putUrl = `${url}/${params!.id}`;
      return fetch(putUrl, {
        method,
        headers,
        mode: 'cors',
        body: JSON.stringify(reqpars?.todo),
      });
    }
  }
};


export const handleResponse = async (resp: Response) => {
  if (resp.status === 200 || resp.status < 300) {
    const response = await resp.json();
    return response;
  }
  return false;
}