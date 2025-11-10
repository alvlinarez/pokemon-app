import axios, { type AxiosInstance } from 'axios';
import { API_URL } from '../constants';

export function buildHttpClient(): AxiosInstance {
  const httpClient = axios.create();
  httpClient.defaults.baseURL = API_URL;
  httpClient.defaults.headers.common['Accept'] = 'application/json';
  httpClient.defaults.withCredentials = true;

  return httpClient;
}
