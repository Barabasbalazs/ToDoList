export const fetchReq = (
  url: string,
  method: string,
  authToken: string,
  params?: Object
) => {
  if (method === 'GET') {
    if (params) {
      let queryString = '?';
      Object.keys(params).forEach((key) => {
        queryString = `${queryString}${key}=${params[key as keyof Object]}`;
      });
      url = `${url}${queryString}`;
    }
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
  } else {
    //POST
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: params ? JSON.stringify(params) : '{}',
    });
  }
};
