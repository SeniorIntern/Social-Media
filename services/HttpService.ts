import { PaginationQuery } from '@/app/types';

import apiClient from './apiClient';

class HttpService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getMe = () => {
    return apiClient.get<T>(this.endpoint + '/me').then((res) => res.data);
  };

  getAll = () => {
    return apiClient.get<T[]>(this.endpoint).then((res) => res.data);
  };

  getAllWithId = (id: string) => {
    return apiClient.get<T[]>(this.endpoint + '/' + id).then((res) => res.data);
  };

  getByIdAndQuery = (id: string, query: PaginationQuery) => {
    return apiClient
      .get<T[]>(this.endpoint + '/' + id, {
        params: {
          limit: query.limit
        }
      })
      .then((res) => res.data);
  };

  getById = (id: string) => {
    return apiClient.get<T>(this.endpoint + '/' + id).then((res) => res.data);
  };

  post = (data: T) => {
    return apiClient.post<T>(this.endpoint, data).then((res) => res.data);
  };

  patch = (data: FormData) => {
    apiClient.patch(this.endpoint, data).then((res) => res.data);
  };

  delete = (id: string) => {
    apiClient.delete(this.endpoint + '/' + id).then((res) => res.data);
  };
}

export default HttpService;
