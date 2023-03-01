import envVariables from '../config/env-variables';

const todoUrl = envVariables.todoUrl();

export const todoService = {
  getAll: async (sort: string, order: string, searchString: string) => {
    const resp = await fetch(`${todoUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
